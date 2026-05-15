<?php
declare(strict_types=1);

// PostaliApiRest SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PostaliApiRestMakeContext
{
    public static function call(array $ctxmap, ?PostaliApiRestContext $basectx): PostaliApiRestContext
    {
        return new PostaliApiRestContext($ctxmap, $basectx);
    }
}
