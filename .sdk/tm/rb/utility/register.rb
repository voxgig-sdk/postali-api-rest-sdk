# PostaliApiRest SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PostaliApiRestUtility.registrar = ->(u) {
  u.clean = PostaliApiRestUtilities::Clean
  u.done = PostaliApiRestUtilities::Done
  u.make_error = PostaliApiRestUtilities::MakeError
  u.feature_add = PostaliApiRestUtilities::FeatureAdd
  u.feature_hook = PostaliApiRestUtilities::FeatureHook
  u.feature_init = PostaliApiRestUtilities::FeatureInit
  u.fetcher = PostaliApiRestUtilities::Fetcher
  u.make_fetch_def = PostaliApiRestUtilities::MakeFetchDef
  u.make_context = PostaliApiRestUtilities::MakeContext
  u.make_options = PostaliApiRestUtilities::MakeOptions
  u.make_request = PostaliApiRestUtilities::MakeRequest
  u.make_response = PostaliApiRestUtilities::MakeResponse
  u.make_result = PostaliApiRestUtilities::MakeResult
  u.make_point = PostaliApiRestUtilities::MakePoint
  u.make_spec = PostaliApiRestUtilities::MakeSpec
  u.make_url = PostaliApiRestUtilities::MakeUrl
  u.param = PostaliApiRestUtilities::Param
  u.prepare_auth = PostaliApiRestUtilities::PrepareAuth
  u.prepare_body = PostaliApiRestUtilities::PrepareBody
  u.prepare_headers = PostaliApiRestUtilities::PrepareHeaders
  u.prepare_method = PostaliApiRestUtilities::PrepareMethod
  u.prepare_params = PostaliApiRestUtilities::PrepareParams
  u.prepare_path = PostaliApiRestUtilities::PreparePath
  u.prepare_query = PostaliApiRestUtilities::PrepareQuery
  u.result_basic = PostaliApiRestUtilities::ResultBasic
  u.result_body = PostaliApiRestUtilities::ResultBody
  u.result_headers = PostaliApiRestUtilities::ResultHeaders
  u.transform_request = PostaliApiRestUtilities::TransformRequest
  u.transform_response = PostaliApiRestUtilities::TransformResponse
}
