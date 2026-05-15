# PostaliApiRest PHP SDK Reference

Complete API reference for the PostaliApiRest PHP SDK.


## PostaliApiRestSDK

### Constructor

```php
require_once __DIR__ . '/postali-api-rest_sdk.php';

$client = new PostaliApiRestSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `PostaliApiRestSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = PostaliApiRestSDK::test();
```


### Instance Methods

#### `Municipality($data = null)`

Create a new `MunicipalityEntity` instance. Pass `null` for no initial data.

#### `PostalCode($data = null)`

Create a new `PostalCodeEntity` instance. Pass `null` for no initial data.

#### `State($data = null)`

Create a new `StateEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. Returns `[$result, $err]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array [$result, $err]`

#### `prepare(array $fetchargs = []): array`

Prepare a fetch definition without sending the request. Returns `[$fetchdef, $err]`.


---

## MunicipalityEntity

```php
$municipality = $client->Municipality();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estado` | ``$STRING`` | No |  |
| `municipio` | ``$ARRAY`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->Municipality()->load(["id" => "municipality_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): MunicipalityEntity`

Create a new `MunicipalityEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PostalCodeEntity

```php
$postal_code = $client->PostalCode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ciudad` | ``$STRING`` | No |  |
| `codigo_postal` | ``$STRING`` | No |  |
| `colonia` | ``$ARRAY`` | No |  |
| `estado` | ``$STRING`` | No |  |
| `municipio` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): array`

Load a single entity matching the given criteria.

```php
[$result, $err] = $client->PostalCode()->load(["id" => "postal_code_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PostalCodeEntity`

Create a new `PostalCodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## StateEntity

```php
$state = $client->State();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `estado` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): array`

List entities matching the given criteria. Returns an array.

```php
[$results, $err] = $client->State()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): StateEntity`

Create a new `StateEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new PostaliApiRestSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

