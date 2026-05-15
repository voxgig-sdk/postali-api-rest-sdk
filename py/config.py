# PostaliApiRest SDK configuration


def make_config():
    return {
        "main": {
            "name": "PostaliApiRest",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://postali.app/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "municipality": {},
                "postal_code": {},
                "state": {},
            },
        },
        "entity": {
      "municipality": {
        "fields": [
          {
            "name": "estado",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "municipio",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "municipality",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/municipios/{state}",
                "parts": [
                  "municipios",
                  "{state}",
                ],
                "select": {
                  "exist": [
                    "state",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "municipio",
            ],
          ],
        },
      },
      "postal_code": {
        "fields": [
          {
            "name": "ciudad",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "codigo_postal",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "colonia",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "estado",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "municipio",
            "req": False,
            "type": "`$STRING`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "postal_code",
        "op": {
          "load": {
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
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/codigo_postal/{postalCode}",
                "parts": [
                  "codigo_postal",
                  "{postal_code}",
                ],
                "rename": {
                  "param": {
                    "postalCode": "postal_code",
                  },
                },
                "select": {
                  "exist": [
                    "postal_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "codigo_postal",
            ],
          ],
        },
      },
      "state": {
        "fields": [
          {
            "name": "estado",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
        ],
        "name": "state",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/estados",
                "parts": [
                  "estados",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
