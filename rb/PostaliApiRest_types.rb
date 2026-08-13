# frozen_string_literal: true

# Typed models for the PostaliApiRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Municipality entity data model.
#
# @!attribute [rw] estado
#   @return [String, nil]
#
# @!attribute [rw] municipios
#   @return [Array, nil]
Municipality = Struct.new(
  :estado,
  :municipios,
  keyword_init: true
)

# Request payload for Municipality#load.
#
# @!attribute [rw] state
#   @return [String]
MunicipalityLoadMatch = Struct.new(
  :state,
  keyword_init: true
)

# PostalCode entity data model.
#
# @!attribute [rw] ciudad
#   @return [String, nil]
#
# @!attribute [rw] codigo_postal
#   @return [String, nil]
#
# @!attribute [rw] colonias
#   @return [Array, nil]
#
# @!attribute [rw] estado
#   @return [String, nil]
#
# @!attribute [rw] municipio
#   @return [String, nil]
PostalCode = Struct.new(
  :ciudad,
  :codigo_postal,
  :colonias,
  :estado,
  :municipio,
  keyword_init: true
)

# Request payload for PostalCode#load.
#
# @!attribute [rw] postal_code
#   @return [String]
PostalCodeLoadMatch = Struct.new(
  :postal_code,
  keyword_init: true
)

# State entity data model.
#
# @!attribute [rw] estados
#   @return [Array, nil]
State = Struct.new(
  :estados,
  keyword_init: true
)

# Request payload for State#list.
#
# @!attribute [rw] estados
#   @return [Array, nil]
StateListMatch = Struct.new(
  :estados,
  keyword_init: true
)

