# PostaliApiRest SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PostaliApiRestFeatures
  def self.make_feature(name)
    case name
    when "base"
      PostaliApiRestBaseFeature.new
    when "test"
      PostaliApiRestTestFeature.new
    else
      PostaliApiRestBaseFeature.new
    end
  end
end
