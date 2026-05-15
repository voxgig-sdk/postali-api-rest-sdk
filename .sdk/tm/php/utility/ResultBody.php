<?php
declare(strict_types=1);

// PostaliApiRest SDK utility: result_body

class PostaliApiRestResultBody
{
    public static function call(PostaliApiRestContext $ctx): ?PostaliApiRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
