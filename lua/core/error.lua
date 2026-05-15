-- PostaliApiRest SDK error

local PostaliApiRestError = {}
PostaliApiRestError.__index = PostaliApiRestError


function PostaliApiRestError.new(code, msg, ctx)
  local self = setmetatable({}, PostaliApiRestError)
  self.is_sdk_error = true
  self.sdk = "PostaliApiRest"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PostaliApiRestError:error()
  return self.msg
end


function PostaliApiRestError:__tostring()
  return self.msg
end


return PostaliApiRestError
