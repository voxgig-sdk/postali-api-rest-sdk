# PostaliApiRest SDK configuration

module PostaliApiRestConfig
  def self.make_config
    {
      "main" => {
        "name" => "PostaliApiRest",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://postali.app/api",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "municipality" => {},
          "postal_code" => {},
          "state" => {},
        },
      },
      "entity" => {
        "municipality" => {
          "fields" => [
            {
              "name" => "estado",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "municipio",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 1,
            },
          ],
          "name" => "municipality",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "Ciudad de México",
                        "kind" => "param",
                        "name" => "state",
                        "orig" => "state",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/municipios/{state}",
                  "parts" => [
                    "municipios",
                    "{state}",
                  ],
                  "select" => {
                    "exist" => [
                      "state",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "municipio",
              ],
            ],
          },
        },
        "postal_code" => {
          "fields" => [
            {
              "name" => "ciudad",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 0,
            },
            {
              "name" => "codigo_postal",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 1,
            },
            {
              "name" => "colonia",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 2,
            },
            {
              "name" => "estado",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 3,
            },
            {
              "name" => "municipio",
              "req" => false,
              "type" => "`$STRING`",
              "active" => true,
              "index$" => 4,
            },
          ],
          "name" => "postal_code",
          "op" => {
            "load" => {
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "example" => "01000",
                        "kind" => "param",
                        "name" => "postal_code",
                        "orig" => "postal_code",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "active" => true,
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/codigo_postal/{postalCode}",
                  "parts" => [
                    "codigo_postal",
                    "{postal_code}",
                  ],
                  "rename" => {
                    "param" => {
                      "postalCode" => "postal_code",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "postal_code",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "codigo_postal",
              ],
            ],
          },
        },
        "state" => {
          "fields" => [
            {
              "name" => "estado",
              "req" => false,
              "type" => "`$ARRAY`",
              "active" => true,
              "index$" => 0,
            },
          ],
          "name" => "state",
          "op" => {
            "list" => {
              "name" => "list",
              "points" => [
                {
                  "method" => "GET",
                  "orig" => "/estados",
                  "parts" => [
                    "estados",
                  ],
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "active" => true,
                  "args" => {},
                  "select" => {},
                  "index$" => 0,
                },
              ],
              "input" => "data",
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PostaliApiRestFeatures.make_feature(name)
  end
end
