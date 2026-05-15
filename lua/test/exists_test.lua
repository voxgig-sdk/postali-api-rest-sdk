-- ProjectName SDK exists test

local sdk = require("postali-api-rest_sdk")

describe("PostaliApiRestSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
