# Syrozen agent skills

Four practical skills for AI coding agents, taken from building and running real multi-tenant SaaS products: a CRM and webmail, with subscriptions, role-based access and legal pages for South Africa, the US, Australia, the EU and the UK.

Created by [syrozen.com](https://syrozen.com). Author: Tayen. *Synergy at its zenith.*

| Skill | What it does | Who it helps |
| --- | --- | --- |
| [full-site-check](skills/full-site-check/SKILL.md) | Security, legal, privacy, pricing, accessibility and site-quality audit. Fixes what is safe and hands the owner one list of actions and questions | Any business with a website or app, before launch or before taking payments |
| [route-access-audit](skills/route-access-audit/SKILL.md) | Builds a role-by-action access matrix and checks every server route enforces it: IDOR, cross-tenant leaks, privilege escalation, UI-only limits | Anyone building a multi-user or multi-company app |
| [payment-webhook-safety](skills/payment-webhook-safety/SKILL.md) | Signed webhooks, amount and currency checks, replay protection, renewals, failures, refunds, disputes and a terms-first checkout | Anyone selling subscriptions with Stripe, Paystack, Paddle, Lemon Squeezy, PayPal, Razorpay or Flutterwave |
| [living-plans](skills/living-plans/SKILL.md) | A `plans/` folder of limitations, roadmap, costs and free-tier limits that stays true because every change updates it | Solo founders and small teams |

## Install

**Claude Code**

```
/plugin marketplace add SyroVT/syrozen-agent-skills
/plugin install syrozen@syrozen-agent-skills
```

Or copy any folder under `skills/` into your project's `.claude/skills/` (or `~/.claude/skills/` for all projects).

**Other agents that read `SKILL.md`** (Codex, Cursor, Gemini CLI, OpenCode and others): copy the skill folder wherever your tool loads skills from, or use `npx skills add SyroVT/syrozen-agent-skills`.

**Any AI chat:** paste the skill's `SKILL.md`, then the files in its `references/` folder, and ask it to start.

## Good to know

- The legal and compliance parts are checklists, not legal advice. Have a lawyer review anything the skills mark for one.
- Laws, prices and provider APIs change. The skills tell the agent to confirm each against official sources and record the date; please do.
- Issues and pull requests are welcome.

## Licence

[MIT](LICENSE)
