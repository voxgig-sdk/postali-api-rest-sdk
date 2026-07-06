<?php
declare(strict_types=1);

// Typed models for the PostaliApiRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Municipality entity data model. */
class Municipality
{
    public ?string $estado = null;
    public ?array $municipio = null;
}

/** Request payload for Municipality#load. */
class MunicipalityLoadMatch
{
    public string $state;
}

/** PostalCode entity data model. */
class PostalCode
{
    public ?string $ciudad = null;
    public ?string $codigo_postal = null;
    public ?array $colonia = null;
    public ?string $estado = null;
    public ?string $municipio = null;
}

/** Request payload for PostalCode#load. */
class PostalCodeLoadMatch
{
    public string $postal_code;
}

/** State entity data model. */
class State
{
    public ?array $estado = null;
}

/** Request payload for State#list. */
class StateListMatch
{
    public ?array $estado = null;
}

