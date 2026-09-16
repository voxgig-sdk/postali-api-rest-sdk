# PostaliApiRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PostaliApiRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      PostaliApiRestBaseFeature.new
    when "ratelimit"
      PostaliApiRestRatelimitFeature.new
    when "retry"
      PostaliApiRestRetryFeature.new
    when "test"
      PostaliApiRestTestFeature.new
    when "timeout"
      PostaliApiRestTimeoutFeature.new
    else
      PostaliApiRestBaseFeature.new
    end
  end
end
