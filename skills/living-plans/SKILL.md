---
name: living-plans
description: Set up and maintain a plans/ folder (known limitations, roadmap, costs and free-tier limits, and a next-session resume point) that stays true because every change updates it in the same commit, and every idea from chat lands in it. Use when starting a project, when asked "what's left", "what should I work on today", "what will this cost at scale", or "remember this for later", and at the start and end of every working session.
---

# Living plans

Small teams and solo founders lose ideas in chat, forget why something was deferred, and get surprised by a bill. A `plans/` folder fixes that if, and only if, it stays true. This skill sets one up and keeps it current, so the owner can open one place each morning and pick the day's focus.

## The folder

| File | What's in it |
| --- | --- |
| `plans/README.md` | What each file is for and the rules for keeping them current |
| `plans/next-session.md` | **Start here:** where work paused, what's waiting on the owner, and the suggested next picks |
| `plans/limitations.md` | Every known limit, with an ID (L1, L2, …), severity, why it matters and the roadmap item that fixes it |
| `plans/roadmap.md` | Planned work (R1, R2, …) in order, each naming the limitations it fixes |
| `plans/costs.md` | Every paid or free-tier service: free limits, paid prices, source link and the date checked; cost now and at a few user counts |

Add more files only for big topics (pricing, a feature's design). Templates are in [references/templates.md](references/templates.md).

## Setting it up

1. Read the code, README, issues and any notes to find what the product can't do yet, what is planned, and every outside service it uses.
2. Write the five files from the templates. Give every limitation and roadmap item an ID. IDs are never reused, even after an item is solved.
3. For each outside service, look up the current free tier and paid price on the provider's own pricing page. Record the link and today's date. Never quote a price from memory.
4. Where a free tier could be exceeded by normal use, say so in `limitations.md`, and suggest a cap in the app a little below the free limit (for example stop at 90% and warn at 80%) so the bill can't grow by surprise.
5. Add the rule below to the project's AI assistant instructions file (`CLAUDE.md`, `AGENTS.md` or similar) so every future session follows it.

## The rule

> **Whenever a change fixes a limitation, ships a roadmap item, or changes a price or free-tier limit, update `plans/` in the same commit.** Every idea, deferred item or "later" mentioned in conversation goes into `plans/` too.

In practice:

- **Fixed a limitation:** move its row to the Solved table with the date and the commit or a one-line description of the fix.
- **Shipped a roadmap item, or part of one:** tick it, or note what part is done, with the date and commit.
- **Found a new limit:** add it with the next ID, a severity and the roadmap item that would fix it (add one if none exists).
- **Changed what you depend on or how much you use it:** update `costs.md` and its "Last checked" date.
- **Someone said "later", "maybe", "one day" or "we should":** add it to the roadmap backlog with the date, so nothing lives only in chat.

## Every session

**At the start:** read `plans/next-session.md`, then the open rows of `limitations.md` and the next items in `roadmap.md`. Tell the owner, in a few lines, what's waiting on them and suggest two or three things to work on today, with the reason for each (what it unblocks, what it costs to leave).

**At the end:** rewrite `plans/next-session.md`: what was done, where work paused, what's waiting on the owner (every action they must take, in one list), and the suggested next picks. Bump "Last reviewed" on any file you changed.

## Keeping it honest

- Write for the owner, not for developers: plain words, why each item matters.
- Severity has fixed meanings: **High** blocks selling or can lose data, **Medium** hurts at scale, **Low** is an annoyance.
- Prices go stale. Anything older than three months is re-checked before anyone relies on it.
- If a file and the code disagree, the code wins. Fix the file in the same change.
