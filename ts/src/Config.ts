
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'PostaliApiRest',
        slug: "postali-api-rest",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://postali.app/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      municipality: {
      },

      postal_code: {
      },

      state: {
      },

    }
  }


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
              "parts": [
                "municipios",
                "{state}"
              ],
              "select": {
                "exist": [
                  "state"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "codigo_postal",
                "{postal_code}"
              ],
              "rename": {
                "param": {
                  "postalCode": "postal_code"
                }
              },
              "select": {
                "exist": [
                  "postal_code"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "estados"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.estados`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

