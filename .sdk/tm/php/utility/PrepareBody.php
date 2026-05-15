<?php
declare(strict_types=1);

// PostaliApiRest SDK utility: prepare_body

class PostaliApiRestPrepareBody
{
    public static function call(PostaliApiRestContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
