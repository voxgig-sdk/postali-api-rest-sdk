package = "voxgig-sdk-postali-api-rest"
version = "0.0.1-1"
source = {
  -- git+https (GitHub dropped git:// in 2022); pin the install to the release
  -- tag pushed by `make publish`, and point at the lua/ subdir of the monorepo.
  url = "git+https://github.com/voxgig-sdk/postali-api-rest-sdk.git",
  tag = "lua/v0.0.1",
  dir = "postali-api-rest-sdk/lua"
}
description = {
  summary = "Unofficial generated Lua SDK for the postali API REST public API. Not affiliated with or endorsed by the upstream API provider.",
  homepage = "https://github.com/voxgig-sdk/postali-api-rest-sdk",
  issues_url = "https://github.com/voxgig-sdk/postali-api-rest-sdk/issues",
  license = "MIT",
  labels = { "voxgig", "sdk", "generated-sdk", "openapi", "api-client", "postali-api-rest" }
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["postali-api-rest_sdk"] = "postali-api-rest_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
