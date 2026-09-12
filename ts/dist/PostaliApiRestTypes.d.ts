export interface Municipality {
    estado?: string;
    municipios?: any[];
}
export interface MunicipalityLoadMatch {
    state: string;
}
export interface PostalCode {
    ciudad?: string;
    codigo_postal?: string;
    colonias?: any[];
    estado?: string;
    municipio?: string;
}
export interface PostalCodeLoadMatch {
    postal_code: string;
}
export interface State {
    estados?: any[];
}
export interface StateListMatch {
    estados?: any[];
}
