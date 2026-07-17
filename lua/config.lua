-- PostaliApiRest SDK configuration

local function make_config()
  return {
    main = {
      name = "PostaliApiRest",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "https://postali.app/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["municipality"] = {},
        ["postal_code"] = {},
        ["state"] = {},
      },
    },
    entity = {
      ["municipality"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "estado",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "municipio",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 1,
          },
        },
        ["name"] = "municipality",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "Ciudad de México",
                      ["kind"] = "param",
                      ["name"] = "state",
                      ["orig"] = "state",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/municipios/{state}",
                ["parts"] = {
                  "municipios",
                  "{state}",
                },
                ["select"] = {
                  ["exist"] = {
                    "state",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "municipio",
            },
          },
        },
      },
      ["postal_code"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "ciudad",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 0,
          },
          {
            ["active"] = true,
            ["name"] = "codigo_postal",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 1,
          },
          {
            ["active"] = true,
            ["name"] = "colonia",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 2,
          },
          {
            ["active"] = true,
            ["name"] = "estado",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 3,
          },
          {
            ["active"] = true,
            ["name"] = "municipio",
            ["req"] = false,
            ["type"] = "`$STRING`",
            ["index$"] = 4,
          },
        },
        ["name"] = "postal_code",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {
                  ["params"] = {
                    {
                      ["active"] = true,
                      ["example"] = "01000",
                      ["kind"] = "param",
                      ["name"] = "postal_code",
                      ["orig"] = "postal_code",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                      ["index$"] = 0,
                    },
                  },
                },
                ["method"] = "GET",
                ["orig"] = "/codigo_postal/{postalCode}",
                ["parts"] = {
                  "codigo_postal",
                  "{postal_code}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["postalCode"] = "postal_code",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "postal_code",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "load",
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "codigo_postal",
            },
          },
        },
      },
      ["state"] = {
        ["fields"] = {
          {
            ["active"] = true,
            ["name"] = "estado",
            ["req"] = false,
            ["type"] = "`$ARRAY`",
            ["index$"] = 0,
          },
        },
        ["name"] = "state",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["active"] = true,
                ["args"] = {},
                ["method"] = "GET",
                ["orig"] = "/estados",
                ["parts"] = {
                  "estados",
                },
                ["select"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["index$"] = 0,
              },
            },
            ["key$"] = "list",
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
