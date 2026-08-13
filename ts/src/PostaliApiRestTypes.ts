// Typed models for the PostaliApiRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Municipality {
  estado?: string
  municipios?: any[]
}

export interface MunicipalityLoadMatch {
  state: string
}

export interface PostalCode {
  ciudad?: string
  codigo_postal?: string
  colonias?: any[]
  estado?: string
  municipio?: string
}

export interface PostalCodeLoadMatch {
  postal_code: string
}

export interface State {
  estados?: any[]
}

export interface StateListMatch {
  estados?: any[]
}

