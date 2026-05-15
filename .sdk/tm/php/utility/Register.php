<?php
declare(strict_types=1);

// PostaliApiRest SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

PostaliApiRestUtility::setRegistrar(function (PostaliApiRestUtility $u): void {
    $u->clean = [PostaliApiRestClean::class, 'call'];
    $u->done = [PostaliApiRestDone::class, 'call'];
    $u->make_error = [PostaliApiRestMakeError::class, 'call'];
    $u->feature_add = [PostaliApiRestFeatureAdd::class, 'call'];
    $u->feature_hook = [PostaliApiRestFeatureHook::class, 'call'];
    $u->feature_init = [PostaliApiRestFeatureInit::class, 'call'];
    $u->fetcher = [PostaliApiRestFetcher::class, 'call'];
    $u->make_fetch_def = [PostaliApiRestMakeFetchDef::class, 'call'];
    $u->make_context = [PostaliApiRestMakeContext::class, 'call'];
    $u->make_options = [PostaliApiRestMakeOptions::class, 'call'];
    $u->make_request = [PostaliApiRestMakeRequest::class, 'call'];
    $u->make_response = [PostaliApiRestMakeResponse::class, 'call'];
    $u->make_result = [PostaliApiRestMakeResult::class, 'call'];
    $u->make_point = [PostaliApiRestMakePoint::class, 'call'];
    $u->make_spec = [PostaliApiRestMakeSpec::class, 'call'];
    $u->make_url = [PostaliApiRestMakeUrl::class, 'call'];
    $u->param = [PostaliApiRestParam::class, 'call'];
    $u->prepare_auth = [PostaliApiRestPrepareAuth::class, 'call'];
    $u->prepare_body = [PostaliApiRestPrepareBody::class, 'call'];
    $u->prepare_headers = [PostaliApiRestPrepareHeaders::class, 'call'];
    $u->prepare_method = [PostaliApiRestPrepareMethod::class, 'call'];
    $u->prepare_params = [PostaliApiRestPrepareParams::class, 'call'];
    $u->prepare_path = [PostaliApiRestPreparePath::class, 'call'];
    $u->prepare_query = [PostaliApiRestPrepareQuery::class, 'call'];
    $u->result_basic = [PostaliApiRestResultBasic::class, 'call'];
    $u->result_body = [PostaliApiRestResultBody::class, 'call'];
    $u->result_headers = [PostaliApiRestResultHeaders::class, 'call'];
    $u->transform_request = [PostaliApiRestTransformRequest::class, 'call'];
    $u->transform_response = [PostaliApiRestTransformResponse::class, 'call'];
});
