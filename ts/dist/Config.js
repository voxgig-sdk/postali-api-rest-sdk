"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const TestFeature_1 = require("./feature/test/TestFeature");
const FEATURE_CLASS = {
    test: TestFeature_1.TestFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'PostaliApiRest',
        slug: "postali-api-rest",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        test: {
            "options": {
                "active": false
            },
            "transport": "base"
        },
    };
    options = {
        base: "https://postali.app/api",
        headers: {
            "content-type": "application/json"
        },
        entity: {
            municipality: {},
            postal_code: {},
            state: {},
        }
    };
    entity = {
        "municipality": {
            "fields": [
                {
                    "name": "estado",
                    "short": "State name",
                    "type": "`$STRING`"
                },
                {
                    "name": "municipios",
                    "short": "List of municipalities",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "municipality",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "Ciudad de México",
                                        "kind": "param",
                                        "name": "state",
                                        "orig": "state",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/municipios/{state}",
                            "segments": [
                                {
                                    "lit": "municipios"
                                },
                                {
                                    "var": "state"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "state"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "municipios",
                                "{state}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "municipio"
                    ]
                ]
            }
        },
        "postal_code": {
            "fields": [
                {
                    "name": "ciudad",
                    "short": "City name",
                    "type": "`$STRING`"
                },
                {
                    "name": "codigo_postal",
                    "short": "Postal code",
                    "type": "`$STRING`"
                },
                {
                    "name": "colonias",
                    "short": "List of settlements/neighborhoods",
                    "type": "`$ARRAY`"
                },
                {
                    "name": "estado",
                    "short": "State name",
                    "type": "`$STRING`"
                },
                {
                    "name": "municipio",
                    "short": "Municipality name",
                    "type": "`$STRING`"
                }
            ],
            "name": "postal_code",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "params": [
                                    {
                                        "example": "01000",
                                        "kind": "param",
                                        "name": "postal_code",
                                        "orig": "postal_code",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/codigo_postal/{postalCode}",
                            "rename": {
                                "param": {
                                    "postalCode": "postal_code"
                                }
                            },
                            "segments": [
                                {
                                    "lit": "codigo_postal"
                                },
                                {
                                    "var": "postal_code"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "postal_code"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "codigo_postal",
                                "{postal_code}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "codigo_postal"
                    ]
                ]
            }
        },
        "state": {
            "fields": [
                {
                    "name": "estados",
                    "short": "List of Mexican states",
                    "type": "`$ARRAY`"
                }
            ],
            "name": "state",
            "op": {
                "list": {
                    "input": "data",
                    "name": "list",
                    "points": [
                        {
                            "args": {},
                            "kind": "http",
                            "method": "GET",
                            "orig": "/estados",
                            "segments": [
                                {
                                    "lit": "estados"
                                }
                            ],
                            "select": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body.estados`"
                            },
                            "parts": [
                                "estados"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map