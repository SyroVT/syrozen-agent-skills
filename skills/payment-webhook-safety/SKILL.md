---
name: payment-webhook-safety
description: Build or review subscription billing so money and access always match - signed payment webhooks, amount and currency checks, replay protection, failed renewals, cancellations, refunds and disputes, test vs live keys, and a checkout page that shows the terms and records acceptance before payment. Works with Stripe, Paystack, Paddle, Lemon Squeezy, PayPal, Razorpay, Flutterwave and others. Use when adding payments or subscriptions, writing a webhook handler, or auditing billing code.
---

# Payment webhook safety

A payment webhook is a public URL that, when called, gives someone paid access. Anyone on the internet can call it. This skill makes sure only the payment provider can, that what was paid matches what was bought, and that every later event (renewal, failure, refund, dispute, cancellation) moves the account to the right state.

Never make live payments while building or testing. Use the provider's test mode.

## Step 1: Map the money flow

Write down, citing `file:line`:

- Where prices live. They must come from the server (a price table, the provider's price ids), never from the browser.
- How a checkout starts: which server route creates the provider's checkout session, payment link or transaction, and what it attaches to find the account later (customer id, subscription id, metadata, reference).
- Which webhook events the provider sends and which ones the code handles.
- What account state changes on each event (plan, seats, status, renewal date) and where it is stored.
- Which keys exist (test and live, secret and webhook signing) and where they are read from. They must live only in server-side secrets, never in code, the browser, a URL or a log.

## Step 2: Check the webhook handler

Work through each item. Every one is a real way money and access drift apart.

1. **Verify the signature first**, on the **raw request body**, before parsing JSON or touching the database. Use the provider's method from [references/providers.md](references/providers.md), compare in constant time, and return 401 on failure. A handler that parses first and verifies later, or verifies a re-serialised body, is broken.
2. **Reject stale events** where the provider signs a timestamp (Stripe, Paddle): refuse anything outside the tolerance window.
3. **Process each event once.** Store a unique key per event (the provider's event id, or event type plus reference) with an insert that fails on duplicates, and stop if it already exists. Providers retry, and attackers replay.
4. **Check amount and currency** against what the server expected for that account and plan. A payment for less, or in another currency, must not grant the plan. Record it for the owner instead.
5. **Find the account from data you stored**, not from free text in the event. Match on the subscription, customer or checkout id saved when the checkout was created. Treat metadata as a hint, and confirm it against your records.
6. **Handle events arriving out of order.** A renewal can arrive before the subscription-created event. When the state matters, fetch the current subscription from the provider's API rather than trusting the order of webhooks.
7. **Handle the whole lifecycle,** not just the first payment:
   - first payment: activate the plan, store the subscription and customer ids, set the renewal date;
   - renewal: extend the renewal date;
   - renewal failed: mark the account overdue, tell the owner, and decide on a grace period;
   - cancelled or ended: move to the free plan or read-only at the end of the paid period;
   - refunded: record it and decide whether access ends;
   - disputed or charged back: record it, alert the owner, and say where to respond;
   - plan or seat change: apply the new limits only once paid.
8. **Keep test and live apart.** Record which mode each subscription was made in. A test-mode event must never activate a live account, and switching keys must not leave live accounts pointing at test plans.
9. **Respond fast.** Return 2xx once the event is safely recorded; do slow work after. Return non-2xx only when you want the provider to retry.
10. **Log safely.** Record what happened to each account in a history the owner can read (paid, failed, refunded, disputed). Never log card data, full request bodies with personal data, or secrets.
11. **Reconcile.** Have a way (a scheduled job or an admin button) to compare your accounts with the provider's subscriptions, so a missed webhook is caught.

## Step 3: Check the checkout page

Before anyone pays, they must see, on your page or the provider's:

- what they are buying, the total price, currency and whether tax is included;
- the billing period, that it renews automatically, and when;
- how to cancel, and any minimum term, refund and cooling-off rights;
- a link to the terms, with an active "I agree" (an unticked box or clearly worded button).

Record the acceptance with the account, the terms version and the date, before sending them to the provider. If the order page is reached by a link without signing in, the link's token must be long, random and expiring, the page must be rate limited by IP, and it must not reveal anything about other accounts. Card details must only ever go into the provider's hosted checkout or embedded fields.

Cancelling must be at least as easy as signing up. Check the consumer laws of each country the business sells to.

## Step 4: Test

In test mode, prove each of these with a request and its result:

- a correctly signed event activates the plan;
- the same event sent twice changes nothing the second time;
- a tampered body or wrong signature gets 401 and changes nothing;
- a payment for less, or in another currency, does not activate the plan;
- an event for an unknown customer is ignored safely;
- renewal failed, cancelled, refunded and disputed each move the account to the right state;
- a renewal that arrives before the subscription-created event still ends in the right state.

## Deliver

1. A findings table: item, result (**Pass**, **Fixed**, **Needs the owner**), evidence, fix.
2. The fixes in one reviewable change, with the tests above added where the project has a test suite.
3. A note to the owner listing what they must do in the provider's dashboard (add the webhook URL, copy the signing secret into the server's secrets, switch to live keys, turn on 2FA), all in one list.
