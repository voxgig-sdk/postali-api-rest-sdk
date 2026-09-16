# PostaliApiRest SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PostaliApiRest",
            "slug": "postali-api-rest",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://postali.app/api",
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
            "short": "State name",
            "type": "`$STRING`",
          },
          {
            "name": "municipios",
            "short": "List of municipalities",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/municipios/{state}",
                "segments": [
                  {
                    "lit": "municipios",
                  },
                  {
                    "var": "state",
                  },
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
                "parts": [
                  "municipios",
                  "{state}",
                ],
              },
            ],
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
            "short": "City name",
            "type": "`$STRING`",
          },
          {
            "name": "codigo_postal",
            "short": "Postal code",
            "type": "`$STRING`",
          },
          {
            "name": "colonias",
            "short": "List of settlements/neighborhoods",
            "type": "`$ARRAY`",
          },
          {
            "name": "estado",
            "short": "State name",
            "type": "`$STRING`",
          },
          {
            "name": "municipio",
            "short": "Municipality name",
            "type": "`$STRING`",
          },
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
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/codigo_postal/{postalCode}",
                "rename": {
                  "param": {
                    "postalCode": "postal_code",
                  },
                },
                "segments": [
                  {
                    "lit": "codigo_postal",
                  },
                  {
                    "var": "postal_code",
                  },
                ],
                "select": {
                  "exist": [
                    "postal_code",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "codigo_postal",
                  "{postal_code}",
                ],
              },
            ],
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
            "name": "estados",
            "short": "List of Mexican states",
            "type": "`$ARRAY`",
          },
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
                    "lit": "estados",
                  },
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.estados`",
                },
                "parts": [
                  "estados",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
