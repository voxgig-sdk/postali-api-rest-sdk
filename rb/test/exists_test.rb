# PostaliApiRest SDK exists test

require "minitest/autorun"
require_relative "../PostaliApiRest_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PostaliApiRestSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
