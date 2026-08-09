// The gala's 4 ticket tiers, the ticket_orders table, the real Zeffy
// ticketing campaign, the webhook auto-matching, and the whole
// /admin/tickets tool are all fully built and working -- this flag only
// controls whether the PUBLIC site treats tickets as purchasable (tier
// cards on /gala, "Reserve Tickets" vs "Sponsor / Attend" on /events).
// The CEO hasn't given final pricing/descriptions yet, so showing draft
// placeholder numbers as if they were final would be wrong. Flip this to
// true once the real numbers are in and Zeffy's campaign is updated to
// match -- nothing else needs to change.
export const TICKETS_LIVE = false;
