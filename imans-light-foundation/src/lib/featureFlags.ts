// The gala's 4 ticket tiers, the ticket_orders table, the real Zeffy
// ticketing campaign, the webhook auto-matching, and the whole
// /admin/tickets tool are all fully built and working -- this flag only
// controls whether the PUBLIC site treats tickets as purchasable (tier
// cards on /gala, "Reserve Tickets" vs "Sponsor / Attend" on /events).
// 2026-08-20: confirmed the DB's 4 tiers ($125/$600/$1,100/$2,500) match
// the live Zeffy campaign (zeffy.com/.../3rd-annual-gala-6) exactly, and
// Nicolas asked for the ticket buttons live -- flipped to true.
export const TICKETS_LIVE = true;
