# Templates

Copy each into `plans/` and replace the examples.

## plans/README.md

```markdown
# Plans

What we can't do yet, what we plan to build, and what it will cost.

| File | What's in it |
| --- | --- |
| [next-session.md](next-session.md) | **Start here:** where we paused, what's waiting on the owner, what to do next |
| [limitations.md](limitations.md) | Every known limit, with an ID and status |
| [roadmap.md](roadmap.md) | The work planned to remove those limits, in order |
| [costs.md](costs.md) | What it costs now and as it grows |

## Keeping it current

Whoever fixes a limitation or ships a roadmap item updates this folder in the same commit:

1. In `limitations.md`, move the row to Solved with the date and commit.
2. In `roadmap.md`, tick the item and add the commit.
3. If a price or free-tier limit changes, update `costs.md` and its "Last checked" date.
4. When a new limit is found, add it with the next ID.

Last reviewed: YYYY-MM-DD.
```

## plans/next-session.md

```markdown
# Next session

Last updated: YYYY-MM-DD.

## Where we paused
- One line per piece of work in progress, with the branch or pull request.

## Waiting on the owner
1. Every action only the owner can take (accounts, payments, legal details, decisions), one per line.

## Suggested next picks
1. **R4 Short name**: why now (what it unblocks).
2. **L9 Short name**: why now.
3. **R7 Short name**: why now.

## Done last session
- One line each.
```

## plans/limitations.md

```markdown
# Current limitations

Last reviewed: YYYY-MM-DD.

**Severity:** **High** blocks selling or can lose data. **Medium** hurts at scale. **Low** is an annoyance.

## Open

| ID | Area | Limitation | Why it matters | Severity | Fix |
| --- | --- | --- | --- | --- | --- |
| L1 | Data | Example: no automated backups beyond the host's built-in history | A bad save is noticed late | Medium | R3 |

## Solved

| ID | Limitation | Solved | How |
| --- | --- | --- | --- |
```

## plans/roadmap.md

```markdown
# Roadmap

Last reviewed: YYYY-MM-DD. Ordered by what to do first. "Fixes" lists limitation IDs.

## Now: owner's actions, no code
- [ ] **R1 Short name**: fixes L2. What the owner does, step by step.

## Next: needed before selling
- [ ] **R2 Short name**: fixes L1. One line on what it is. Cost.

## Later
- [ ] **R3 Short name**: fixes L5.

## Backlog: ideas from conversation
- [ ] **R4 Short name** (raised YYYY-MM-DD): the idea in one line, and any open question.
```

## plans/costs.md

```markdown
# Costs and scaling

Last checked: YYYY-MM-DD. Prices in the provider's billing currency. Any conversion rate used is stated and dated.

**Summary:** what it costs now, and roughly at 100, 1,000 and 5,000 users. Name the one thing most likely to make it expensive.

## Price list

| Service | Free | Paid | Our cap in the app | Source |
| --- | --- | --- | --- | --- |
| Hosting | e.g. 100,000 requests a day | e.g. $5 a month, then per million | — | [pricing page](https://example.com/pricing) (checked YYYY-MM-DD) |
| Email sending | e.g. 100 a day | … | e.g. stop at 90 a day | … |

## Monthly cost by size

State the usage assumptions per user (requests, storage, emails), then:

| | Now | 100 users | 1,000 users | 5,000 users |
| --- | --- | --- | --- | --- |
| Hosting | | | | |
| **Total** | | | | |
```
