# PostaliApiRest SDK

Look up Mexican postal codes and resolve them to states, municipalities, and settlement names

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About postali API REST

[postali](https://postali.app/api) is a REST API for retrieving Mexican postal code (codigo postal) information. Given a five-digit code, it returns the associated state, municipality, and settlement (colonia / neighborhood) records used in Mexican addresses.

What you get from the API:

- Postal-code lookups, e.g. `/codigo-postal/{cp}.json`, returning the matching state, municipality, and one or more settlement entries.
- A search endpoint, `/api/search?q={query}`, for finding postal codes by settlement or place name.

Operational notes: the API does not require authentication. CORS is not enabled on the public endpoints, so calls generally need to be made server-side. Availability has been reported as unreliable on community trackers, so callers should plan for retries and graceful degradation.

## Try it

**TypeScript**
```bash
npm install postali-api-rest
```

**Python**
```bash
pip install postali-api-rest-sdk
```

**PHP**
```bash
composer require voxgig/postali-api-rest-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/postali-api-rest-sdk/go
```

**Ruby**
```bash
gem install postali-api-rest-sdk
```

**Lua**
```bash
luarocks install postali-api-rest-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { PostaliApiRestSDK } from 'postali-api-rest'

const client = new PostaliApiRestSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o postali-api-rest-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "postali-api-rest": {
      "command": "/abs/path/to/postali-api-rest-mcp"
    }
  }
}
```

## Entities

The API exposes 3 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Municipality** | A Mexican municipality (municipio) within a state, returned as part of postal-code lookup responses alongside the settlement and state. | `/municipios/{state}` |
| **PostalCode** | A Mexican five-digit postal code (codigo postal) record, retrievable at `/codigo-postal/{cp}.json` and searchable via `/api/search?q={query}`. | `/codigo_postal/{postalCode}` |
| **State** | A Mexican state (estado) associated with one or more postal codes, returned as part of postal-code lookup responses. | `/estados` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from postaliapirest_sdk import PostaliApiRestSDK

client = PostaliApiRestSDK({})


# Load a specific municipality
municipality, err = client.Municipality(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'postaliapirest_sdk.php';

$client = new PostaliApiRestSDK([]);


// Load a specific municipality
[$municipality, $err] = $client->Municipality(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/postali-api-rest-sdk/go"

client := sdk.NewPostaliApiRestSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "PostaliApiRest_sdk"

client = PostaliApiRestSDK.new({})


# Load a specific municipality
municipality, err = client.Municipality(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("postali-api-rest_sdk")

local client = sdk.new({})


-- Load a specific municipality
local municipality, err = client:Municipality(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = PostaliApiRestSDK.test()
const result = await client.Municipality().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = PostaliApiRestSDK.test(None, None)
result, err = client.Municipality(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = PostaliApiRestSDK::test(null, null);
[$result, $err] = $client->Municipality(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Municipality(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = PostaliApiRestSDK.test(nil, nil)
result, err = client.Municipality(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Municipality(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the postali API REST

- Upstream: [https://postali.app/api](https://postali.app/api)

---

Generated from the postali API REST OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
