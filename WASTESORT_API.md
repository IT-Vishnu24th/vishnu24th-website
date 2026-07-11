# wasteSort — backend reference

Waste-sorting mini-game backend: player records, daily play limits, and score rollup into the
existing `groups` collection. This doc covers everything on the backend side — data model,
service, API, auth, and what's intentionally left out.

## Data model

### `wasteSortPlayer` collection (new)

```ts
export type wasteSortPlayer = {
  name: string
  playCount: number // lifetime total rounds played — never resets
  vesselName: MultiLang // denormalized copy of the group's name at signup
  group: string // id of a doc in the existing `groups` collection, e.g. "F"
  sustainScore: number // lifetime total score
  playsToday: number // rounds played on `lastPlayDate` — see daily reset below
  lastPlayDate: string // YYYY-MM-DD, Asia/Bangkok — used to detect a new day
}
```

Doc id = the player's Firebase Auth `uid`.

### `groups` collection (already existed — not created by this feature)

This service only ever touches one nested field on this shared collection:

```
groups/{groupId}.scoreSources.sustainScore
```

Every other field on a `groups` doc (`vesselName`, `waterScore`, `igMissionScore`,
`scanRankBonus`, etc.) belongs to other mini-games and is never read or written by this
service — writes always use a dot-path update (`"scoreSources.sustainScore"`) so nothing else
on the document is touched.

## Daily play limit

- `MAX_PLAYS_PER_DAY = 3` (exported constant in `services/wasteSortPlayerService.ts`)
- **Not** based on `playCount` (that's the lifetime total). Tracked separately via
  `playsToday` + `lastPlayDate`.
- **Reset is lazy, not scheduled.** Every read compares `lastPlayDate` to today's date
  (Asia/Bangkok). If they don't match, the effective count is treated as `0` — but the stored
  Firestore value only actually gets overwritten the next time that player submits a round.
  Don't be surprised to see a stale non-zero `playsToday` in the Firestore console the morning
  after — check `lastPlayDate` alongside it.

## Service (`services/wasteSortPlayerService.ts`)

| Method                                  | What it does                                                                                                          |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `getById(uid)`                          | Fetch one player                                                                                                      |
| `create(uid, player)`                   | Raw create — you supply every field                                                                                   |
| `createNewPlayer(uid, { name, group })` | Looks up the group's real `vesselName`, zeroes out counters, idempotent (returns existing player instead of erroring) |
| `update(uid, partial)`                  | Raw partial update — **the API layer restricts which fields can reach this**                                          |
| `delete(uid)`                           | Delete the player doc                                                                                                 |
| `list()`                                | All players                                                                                                           |
| `getGroup(uid)`                         | Fetch the player's `groups/{group}` doc                                                                               |
| `getPlaysToday(uid)`                    | Read-only — today's effective play count                                                                              |
| `canPlayToday(uid)`                     | `getPlaysToday(uid) < MAX_PLAYS_PER_DAY`                                                                              |
| `recordRound(uid, score)`               | The one that matters — see below                                                                                      |

`recordRound` runs everything in a single Firestore transaction:

1. Reads the player, computes today's effective `playsToday`
2. Throws `"DAILY_LIMIT_REACHED"` if already at the max
3. Increments `playCount` (+1), `sustainScore` (+score), sets `playsToday`/`lastPlayDate`
4. Increments `groups/{group}.scoreSources.sustainScore` by the same score

Score is floored at 0 before being applied (never subtracts).

## API (`app/api/wasteSortPlayer/...`)

Full endpoint list, request/response shapes, and status codes: see `API.md` if you kept it, or
ask me to regenerate it — the short version:

- `POST /api/wasteSortPlayer` — create (idempotent)
- `GET /api/wasteSortPlayer` — list all
- `GET|PATCH|DELETE /api/wasteSortPlayer/[uid]` — single player; PATCH blocks scoring fields
- `GET /api/wasteSortPlayer/[uid]/round` — check remaining plays today
- `POST /api/wasteSortPlayer/[uid]/round` — submit a round (`{ score }`)

All routes run on `export const runtime = "nodejs"` (required — `firebase-admin` doesn't work
on the Edge runtime).

## Frontend integration

Use `lib/wasteSortApiClient.ts` (`wasteSortApi`) rather than calling these routes with raw
`fetch` — it attaches the auth header and gives typed responses/errors automatically.

## What's intentionally NOT here

- **Bin/item/scoring-per-drop game logic** — that's 100% a frontend concern (falling items,
  bins, drag targets, per-drop scoring). The backend only ever sees the round's final total
  via `{ score }`.
- **Server-side score validation** — nothing currently stops an authenticated player from
  submitting an inflated `score` for their _own_ round (auth stops spoofing _other_ players,
  not self-inflation). Cheap fix if this ever matters: clamp `score` in `recordRound` to a
  `MAX_SCORE_PER_ROUND` constant based on the max achievable in 30 seconds.
- **Public/unauthenticated leaderboard reads** — `GET /api/wasteSortPlayer` currently requires
  sign-in like everything else. Loosen that route specifically if you want an anonymous
  leaderboard view.

## Deployment checklist

- [ ] `@/firebase/admin` has real service-account credentials in the deploy environment (not
      just local `.env.local`) — separate from the client-side Firebase config
- [ ] `@/firebase/admin` exports `adminAuth` alongside `adminDb` (this feature assumes both exist)
- [ ] Confirm `npm run build` passes with these files added
- [ ] Frontend Firebase client app is initialized before any `wasteSortApi` call (it calls
      `getAuth()` with no explicit app argument, assuming the default app is already set up)
