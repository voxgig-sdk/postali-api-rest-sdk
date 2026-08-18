package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PostaliApiRest",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://postali.app/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"municipality": map[string]any{},
				"postal_code": map[string]any{},
				"state": map[string]any{},
			},
		},
		"entity": map[string]any{
			"municipality": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "estado",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "municipios",
						"type": "`$ARRAY`",
					},
				},
				"name": "municipality",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "Ciudad de México",
											"kind": "param",
											"name": "state",
											"orig": "state",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/municipios/{state}",
								"parts": []any{
									"municipios",
									"{state}",
								},
								"select": map[string]any{
									"exist": []any{
										"state",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"municipio",
						},
					},
				},
			},
			"postal_code": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ciudad",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "codigo_postal",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "colonias",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "estado",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "municipio",
						"type": "`$STRING`",
					},
				},
				"name": "postal_code",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "01000",
											"kind": "param",
											"name": "postal_code",
											"orig": "postal_code",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/codigo_postal/{postalCode}",
								"parts": []any{
									"codigo_postal",
									"{postal_code}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"postalCode": "postal_code",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"postal_code",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"codigo_postal",
						},
					},
				},
			},
			"state": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "estados",
						"type": "`$ARRAY`",
					},
				},
				"name": "state",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/estados",
								"parts": []any{
									"estados",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.estados`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
