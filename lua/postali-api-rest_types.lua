-- Typed models for the PostaliApiRest SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Municipality
---@field estado? string
---@field municipio? table

---@class MunicipalityLoadMatch
---@field state string

---@class PostalCode
---@field ciudad? string
---@field codigo_postal? string
---@field colonia? table
---@field estado? string
---@field municipio? string

---@class PostalCodeLoadMatch
---@field postal_code string

---@class State
---@field estado? table

---@class StateListMatch
---@field estado? table

local M = {}

return M
