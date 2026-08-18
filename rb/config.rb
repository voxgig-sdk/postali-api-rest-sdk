# PostaliApiRest SDK configuration

module PostaliApiRestConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "type" => "`$STRING`",
            },
            {
              "name" => "municipios",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "municipality",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "type" => "`$STRING`",
            },
            {
              "name" => "codigo_postal",
              "type" => "`$STRING`",
            },
            {
              "name" => "colonias",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "estado",
              "type" => "`$STRING`",
            },
            {
              "name" => "municipio",
              "type" => "`$STRING`",
            },
          ],
          "name" => "postal_code",
          "op" => {
            "load" => {
              "input" => "data",
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
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
              "name" => "estados",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "state",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {},
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/estados",
                  "parts" => [
                    "estados",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.estados`",
                  },
                },
              ],
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
