# Popkaew API Documentation

Base URL

```
/api
```

All endpoints require the user to be authenticated as a **participant** unless otherwise stated.

---

# 1. Click

Increase the current player's score by **1**.

## Endpoint

```
POST /api/popkaewClick
```

## Authentication

Required (participant)

## Request Body

None

## Example

```http
POST /api/popkaewClick
```

## Success Response

```json
{
  "success": true,
  "data": {
    "popkaewscore": 124,
    "vesselScore": 5821
  }
}
```

> The exact response depends on `click()` service implementation.

## Error Responses

### Player not found

```json
{
  "success": false,
  "message": "Player not found"
}
```

Status Code

```
404
```

### Internal server error

```json
{
  "success": false,
  "message": "Internal server error"
}
```

Status Code

```
500
```

---

# 2. Leaderboard

Returns every vessel sorted by score.

## Endpoint

```
GET /api/popkaewLeaderboard
```

## Authentication

Required (participant)

## Request

None

## Success Response

```json
{
  "success": true,
  "data": [
    {
      "vesselName": {
        "en": "Yaan Ahan Tam Sang",
        "th": "ยานอาหารตามสั่ง"
      },
      "popkaewscore": 8421,
      "group": "Group H"
    },
    {
      "vesselName": {
        "en": "Yaan Arigato",
        "th": "ยานอาริกาโตะ"
      },
      "popkaewscore": 8005,
      "group": "Group Q"
    }
  ]
}
```

---

# 3. Get Player

Returns a player's Popkaew information.

## Endpoint

```
GET /api/popkaewPlayer/{id}
```

## Path Parameter

| Name | Type   | Description |
| ---- | ------ | ----------- |
| id   | string | User ID     |

Example

```
GET /api/popkaewPlayer/65000001
```

## Success Response

```json
{
  "id": "6831309021",
  "name": "คณิน",
  "vesselName": "Yaan Ahan Tam Sang",
  "popkaewscore": 25,
  "lastClickAt": "2026-07-10T10:32:11.000Z"
}
```

## Error Response

```json
{
  "error": "Player not found"
}
```

Status

```
404
```

---

# 4. Create Player

Creates a Popkaew player from an existing User document.

## Endpoint

```
POST /api/popkaewPlayer/{id}
```

## Path Parameter

| Name | Type   |
| ---- | ------ |
| id   | string |

## Request Body

None

## Success Response

```json
{
  "Message": "Add user Successfully"
}
```

## Player already exists

```json
{
  "Message": "Document already exists"
}
```

## User not found

```json
{
  "error": "Player not found in User DataBase"
}
```

Status

```
404
```

---

# 5. Get All Vessels

Returns every Popkaew vessel.

## Endpoint

```
GET /api/popkaewVessel
```

## Request

None

## Success Response

```json
[
  {
    "vesselName": {
      "en": "Yaan Ahan Tam Sang",
      "th": "ยานอาหารตามสั่ง"
    },
    "group": "H",
    "popkaewscore": 1200
  },
  {
    "vesselName": {
      "en": "Yaan Apaca",
      "th": "ยานอาปาก้า"
    },
    "group": "M",
    "popkaewscore": 900
  }
]
```

---

# 6. Create Vessel

Creates a Popkaew vessel using a Group document.

## Endpoint

```
POST /api/popkaewVessel
```

## Request Body

```json
{
  "group": "Group A"
}
```

`group` must be the Firestore document ID of the group.

## Success Response

```json
{
  "Message": "Add popkaewVessel Successfully"
}
```

## Vessel already exists

```json
{
  "Message": "Document already exists"
}
```

## Invalid request

```json
{
  "error": "group are required"
}
```

Status

```
400
```

---

# 7. Get Vessel

Returns information about one vessel.

## Endpoint

```
GET /api/popkaewVessel/{vesselName}
```

## Path Parameter

| Name       | Type   |
| ---------- | ------ |
| vesselName | string |

Example

```
GET /api/popkaewVessel/Garuda
```

## Success Response

```json
{
  "vesselName": {
    "en": "Yaan Apaca",
    "th": "ยานอาปาก้า"
  },
  "popkaewscore": 3250,
  "group": "M"
}
```

## Error Response

```json
{
  "error": "popkaewVessel not found"
}
```

Status

```
404
```

---

# Data Models

## Popkaew Player

```ts
interface PopkaewPlayer {
  name: string
  vessel: string
  popkaewscore: number
  lastClickAt: Timestamp
}
```

---

## Popkaew Vessel

```ts
interface PopkaewVessel {
  vesselName: {
    en: string
    th: string
  }
  popkaewscore: number
  group: string
}
```

---

# Frontend Flow

## First Time Player

```
POST /popkaewPlayer/{userId}
```

↓

Player document is created.

↓

Player can start clicking.

---

## Every Click

```
POST /popkaewClick
```

↓

Player score +1

↓

Vessel score +1

↓

Return latest score

---

## Leaderboard Page

```
GET /popkaewLeaderboard
```

Display vessels sorted by score.

---

## Player Profile

```
GET /popkaewPlayer/{id}
```

Display:

- Player name
- Vessel
- Personal score
- Last click time

---

## Vessel Detail

```
GET /popkaewVessel/{vesselName}
```

Display:

- Vessel name
- Total score
- Group
