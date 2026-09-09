import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

// Run the actual handler with isolated database boundaries. No live credentials,
// database connection, payment or third-party request is used by these tests.
const routeUrl = new URL('../src/app/api/webhooks/zeffy/[token]/route.ts', import.meta.url);
const route = new vm.Script(ts.transpileModule(readFileSync(routeUrl, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText, { filename: routeUrl.pathname });

const schema = {
  donations: Symbol('donations'),
  ticketOrders: Symbol('ticketOrders'),
  unmatchedZeffySales: Symbol('unmatchedZeffySales'),
  ticketTiers: { isActive: Symbol('isActive') },
};

function handler(getDb) {
  const exports = {};
  const modules = {
    'drizzle-orm': { eq: () => null },
    '@/db': { getDb },
    '@/db/schema': schema,
  };
  route.runInNewContext({
    exports,
    require(name) {
      assert.ok(Object.hasOwn(modules, name), `Unexpected import: ${name}`);
      return modules[name];
    },
    process: { env: { ZEFFY_WEBHOOK_SECRET: 'test-only-secret' } },
    Response,
    console: { error() {} },
  });
  return exports.POST;
}

const tier = {
  id: 'test-tier', eventId: 'test-event', nameEn: 'Individual Seat',
  priceCents: 12500, seatsIncluded: 1,
};

function database({ tiers = [], failWrite = false, failRead = false } = {}) {
  const saved = [];
  return {
    saved,
    insert(table) {
      return {
        values(row) {
          return {
            async onConflictDoNothing() {
              if (failWrite) throw new Error('Simulated database outage');
              saved.push({ table, row });
            },
          };
        },
      };
    },
    select() {
      return {
        from() {
          return {
            async where() {
              if (failRead) throw new Error('Simulated database read failure');
              return tiers;
            },
          };
        },
      };
    },
  };
}

function deliver(post, campaignType = 'donation_form', token = 'test-only-secret', body) {
  const payload = {
    type: 'payment.completed',
    data: {
      id: 'test-payment', campaign_type: campaignType, amount: 12500,
      buyer: { first_name: 'Test', last_name: 'Donor', email: 'donor@example.test' },
    },
  };
  return post(new Request('https://example.test/webhook', {
    method: 'POST', body: body ?? JSON.stringify(payload),
  }), { params: Promise.resolve({ token }) });
}

for (const scenario of [
  { name: 'donation', campaign: 'donation_form', tiers: [], table: schema.donations },
  { name: 'matched ticket', campaign: 'ticketing', tiers: [tier], table: schema.ticketOrders },
  { name: 'unmatched ticket', campaign: 'ticketing', tiers: [], table: schema.unmatchedZeffySales },
]) {
  test(`${scenario.name}: acknowledge a successfully stored delivery`, async () => {
    const db = database({ tiers: scenario.tiers });
    const response = await deliver(handler(() => db), scenario.campaign);
    assert.equal(response.status, 200);
    assert.equal(db.saved.length, 1);
    assert.equal(db.saved[0].table, scenario.table);
    assert.equal(db.saved[0].row.zeffyPaymentId, 'test-payment');
  });

  test(`${scenario.name}: do not acknowledge a failed database write`, async () => {
    const db = database({ tiers: scenario.tiers, failWrite: true });
    const response = await deliver(handler(() => db), scenario.campaign);
    assert.equal(response.status, 503);
    assert.equal(db.saved.length, 0);
  });
}

test('database initialization failure remains an unsuccessful delivery', async () => {
  const response = await deliver(handler(() => { throw new Error('Database unavailable'); }));
  assert.equal(response.status, 503);
});

test('ticket lookup failure remains an unsuccessful delivery', async () => {
  const db = database({ failRead: true });
  const response = await deliver(handler(() => db), 'ticketing');
  assert.equal(response.status, 503);
  assert.equal(db.saved.length, 0);
});

test('unauthorized requests are rejected before accessing the database', async () => {
  const response = await deliver(handler(() => assert.fail('Unexpected database access')), 'donation_form', 'wrong-token');
  assert.equal(response.status, 401);
});

test('malformed JSON is rejected before accessing the database', async () => {
  const response = await deliver(handler(() => assert.fail('Unexpected database access')), 'donation_form', 'test-only-secret', '{');
  assert.equal(response.status, 400);
});
