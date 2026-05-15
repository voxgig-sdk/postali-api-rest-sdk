# PostaliApiRest SDK utility: make_context
require_relative '../core/context'
module PostaliApiRestUtilities
  MakeContext = ->(ctxmap, basectx) {
    PostaliApiRestContext.new(ctxmap, basectx)
  }
end
