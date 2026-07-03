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
  summary = "PostaliApiRest SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
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
