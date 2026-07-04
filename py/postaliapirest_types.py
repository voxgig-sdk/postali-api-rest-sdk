# Typed models for the PostaliApiRest SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Municipality:
    estado: Optional[str] = None
    municipio: Optional[list] = None


@dataclass
class MunicipalityLoadMatch:
    state: str


@dataclass
class PostalCode:
    ciudad: Optional[str] = None
    codigo_postal: Optional[str] = None
    colonia: Optional[list] = None
    estado: Optional[str] = None
    municipio: Optional[str] = None


@dataclass
class PostalCodeLoadMatch:
    postal_code: str


@dataclass
class State:
    estado: Optional[list] = None


@dataclass
class StateListMatch:
    estado: Optional[list] = None

