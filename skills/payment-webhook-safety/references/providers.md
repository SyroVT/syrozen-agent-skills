# How each provider signs webhooks

Providers change these. Confirm against the provider's current docs before relying on a row, and prefer the provider's official SDK helper where one exists.

| Provider | Header | How to verify | Secret used |
| --- | --- | --- | --- |
| Stripe | `Stripe-Signature` (`t=…,v1=…`) | HMAC-SHA256 of `{t}.{raw body}`, hex, compare with each `v1`; reject if `t` is outside your tolerance (Stripe's helpers default to 5 minutes). SDK: `stripe.webhooks.constructEvent` | Endpoint signing secret (`whsec_…`) |
| Paystack | `x-paystack-signature` | HMAC-SHA512 of the raw body, hex | Your secret key (`sk_test_…` / `sk_live_…`) |
| Paddle Billing | `Paddle-Signature` (`ts=…;h1=…`) | HMAC-SHA256 of `{ts}:{raw body}`, hex, compare with `h1`; check `ts` age | Endpoint secret key from the notification destination |
| Lemon Squeezy | `X-Signature` | HMAC-SHA256 of the raw body, hex | The webhook's signing secret |
| Razorpay | `X-Razorpay-Signature` | HMAC-SHA256 of the raw body, hex | The webhook secret you set |
| PayPal | `PAYPAL-TRANSMISSION-*` headers | Call PayPal's verify webhook signature API with the headers, body and webhook id, or verify the certificate chain yourself | Webhook id plus API credentials |
| Flutterwave | `verif-hash` | Compare with the secret hash you set in the dashboard (constant time) | Your secret hash |

## Constant-time compare (Web Crypto, works in Workers, Deno, Bun and Node 20+)

```js
async function hmacHex(algo, secret, message) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: algo }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function sameText(a, b) {
  a = String(a || ''); b = String(b || '');
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// Example: Paystack
export async function paystackSigned(secret, rawBody, header) {
  return sameText(await hmacHex('SHA-512', secret, rawBody), String(header).toLowerCase());
}
```

Read the body once as text (`await request.text()`), verify, then `JSON.parse` the same string.

## Replay protection with one insert

```sql
CREATE TABLE IF NOT EXISTS webhook_seen (key TEXT PRIMARY KEY, at TEXT NOT NULL);
-- In the handler: if this changes 0 rows, the event was already handled.
INSERT INTO webhook_seen (key, at) VALUES (?, ?) ON CONFLICT DO NOTHING;
```
