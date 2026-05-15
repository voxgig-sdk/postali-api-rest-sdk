<?php
declare(strict_types=1);

// PostaliApiRest SDK utility: result_headers

class PostaliApiRestResultHeaders
{
    public static function call(PostaliApiRestContext $ctx): ?PostaliApiRestResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
