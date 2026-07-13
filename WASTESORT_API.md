# Waste Sort Player API Documentation

Base URL

```
/api/wasteSortPlayer
```

---

# Data Model

## WasteSortPlayer

```ts
interface WasteSortPlayer {
  name: string
  playCount: number
  vesselName: MultiLang
  group: Group
  sustainScore: number
  playsToday: number
  lastPlayDate: string
}
```

Example

```json
{
  "name": "kanin",
  "playCount": 2,
  "vesselName": {
    "en": "Yaan Ahan Tam Sang",
    "th": "ยานอาหารตามสั่ง"
  },
  "group": "H",
  "sustainScore": 150,
  "playsToday": 2,
  "lastPlayDate": "2026-07-11"
}
```

---

# Endpoints

---

# 1. Get All Players

### GET

```
/api/wasteSortPlayer
```

Returns every Waste Sort player.

## Response

Status: `200 OK`

```json
{
  "players": [
    {
      "name": "kanin",
      "playCount": 2,
      "vesselName": {
        "en": "Yaan Ahan Tam Sang",
        "th": "ยานอาหารตามสั่ง"
      },
      "group": "H",
      "sustainScore": 150,
      "playsToday": 2,
      "lastPlayDate": "2026-07-11"
    }
  ]
}
```

---

# 2. Create Player

### POST

```
/api/wasteSortPlayer/[uid]
```

Creates a Waste Sort player using an existing User document.

No request body is required.

## URL Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| uid       | string | User ID     |

Example

```
POST /api/wasteSortPlayer/65000001
```

## Success Response

Status: `200 OK`

```json
{
  "Message": "Add wasteSortPlayer Successfully"
}
```

## Error Responses

### User does not exist

Status: `404`

```json
{
  "error": "Player not found in User DataBase"
}
```

### Player already exists

Status: `200`

```json
{
  "Message": "Document already exists"
}
```

---

# 3. Get Player

### GET

```
/api/wasteSortPlayer/[uid]
```

Returns a player's information.

## URL Parameters

| Parameter | Type   |
| --------- | ------ |
| uid       | string |

Example

```
GET /api/wasteSortPlayer/65000001
```

## Success Response

Status: `200 OK`

```json
{
  "name": "kanin",
  "playCount": 2,
  "vesselName": {
    "en": "Yaan Ahan Tam Sang",
    "th": "ยานอาหารตามสั่ง"
  },
  "group": "H",
  "sustainScore": 150,
  "playsToday": 2,
  "lastPlayDate": "2026-07-11"
}
```

## Error

Status: `404`

```json
{
  "error": "Player not found"
}
```

---

# 4. Update Player

### PATCH

```
/api/wasteSortPlayer/[uid]
```

Updates one or more player fields.

## URL Parameters

| Parameter | Type   |
| --------- | ------ |
| uid       | string |

## Request Body

Only include the fields you want to update.

Example

```json
{
  "sustainScore": 200
}
```

or

```json
{
  "playsToday": 2,
  "playCount": 5
}
```

## Success Response

```json
{
  "player": {
    ...
  }
}
```

## Error

```json
{
  "error": "Player not found"
}
```

---

# 5. Delete Player

### DELETE

```
/api/wasteSortPlayer/[uid]
```

Deletes a player document.

## URL Parameters

| Parameter | Type   |
| --------- | ------ |
| uid       | string |

## Success Response

```json
{
  "ok": true
}
```

---

# 6. Check Remaining Plays

### GET

```
/api/wasteSortPlayer/[uid]/round
```

Returns how many rounds the player has left today.

This endpoint **does not consume a play**.

## URL Parameters

| Parameter | Type   |
| --------- | ------ |
| uid       | string |

## Success Response

```json
{
  "playsToday": 1,
  "maxPlaysPerDay": 3,
  "playsRemaining": 2,
  "canPlay": true
}
```

### Fields

| Field          | Description                       |
| -------------- | --------------------------------- |
| playsToday     | Number of rounds played today     |
| maxPlaysPerDay | Daily play limit                  |
| playsRemaining | Remaining plays today             |
| canPlay        | Whether the player can still play |

## Error

```json
{
  "error": "Player not found"
}
```

---

# 7. Record a Game Round

### POST

```
/api/wasteSortPlayer/[uid]/round
```

Records one completed game.

This endpoint will

- increase `playCount`
- increase `playsToday`
- add the submitted score to `sustainScore`
- update `lastPlayDate`
- reject the request if the player has already played the maximum number of rounds today

## URL Parameters

| Parameter | Type   |
| --------- | ------ |
| uid       | string |

## Request Body

```json
{
  "score": 85
}
```

## Success Response

```json
{
  "player": {
    "name": "John",
    "playCount": 2,
    "playsToday": 2,
    "sustainScore": 185,
    "lastPlayDate": "2026-07-11"
  }
}
```

---

## Daily Limit Reached

Status: `429`

```json
{
  "error": "DAILY_LIMIT_REACHED",
  "message": "Already played 3 times today"
}
```

---

## Invalid Score

Status: `400`

```json
{
  "error": "score must be a number"
}
```

---

## Player Not Found

Status: `404`

```json
{
  "error": "Player not found"
}
```

---

# Daily Play Rules

- Maximum plays per day: **3**
- Every successful `POST /round`
  - increments `playCount`
  - increments `playsToday`
  - adds the submitted score to `sustainScore`
- When a new day starts, `playsToday` is automatically reset to `0` by the backend before recording the next round.

---

# Endpoint Summary

| Method | Endpoint                          | Description                   |
| ------ | --------------------------------- | ----------------------------- |
| GET    | `/api/wasteSortPlayer`            | Get all players               |
| POST   | `/api/wasteSortPlayer/:uid`       | Create player from User       |
| GET    | `/api/wasteSortPlayer/:uid`       | Get player                    |
| PATCH  | `/api/wasteSortPlayer/:uid`       | Update player                 |
| DELETE | `/api/wasteSortPlayer/:uid`       | Delete player                 |
| GET    | `/api/wasteSortPlayer/:uid/round` | Check remaining plays         |
| POST   | `/api/wasteSortPlayer/:uid/round` | Submit a completed game round |
