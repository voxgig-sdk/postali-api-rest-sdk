<?php
declare(strict_types=1);

// PostaliApiRest SDK utility: feature_add

class PostaliApiRestFeatureAdd
{
    public static function call(PostaliApiRestContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
