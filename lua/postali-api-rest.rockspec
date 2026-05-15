package = "voxgig-sdk-postali-api-rest"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/postali-api-rest-sdk.git"
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
