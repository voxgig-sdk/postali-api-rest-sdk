// Typed models for the PostaliApiRest SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Municipality is the typed data model for the municipality entity.
type Municipality struct {
	Estado *string `json:"estado,omitempty"`
	Municipio *[]any `json:"municipio,omitempty"`
}

// MunicipalityLoadMatch is the typed request payload for Municipality.LoadTyped.
type MunicipalityLoadMatch struct {
	State string `json:"state"`
}

// PostalCode is the typed data model for the postal_code entity.
type PostalCode struct {
	Ciudad *string `json:"ciudad,omitempty"`
	CodigoPostal *string `json:"codigo_postal,omitempty"`
	Colonia *[]any `json:"colonia,omitempty"`
	Estado *string `json:"estado,omitempty"`
	Municipio *string `json:"municipio,omitempty"`
}

// PostalCodeLoadMatch is the typed request payload for PostalCode.LoadTyped.
type PostalCodeLoadMatch struct {
	PostalCode string `json:"postal_code"`
}

// State is the typed data model for the state entity.
type State struct {
	Estado *[]any `json:"estado,omitempty"`
}

// StateListMatch mirrors the state fields as an all-optional match
// filter (Go analog of Partial<State>).
type StateListMatch struct {
	Estado *[]any `json:"estado,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
