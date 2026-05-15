<?php
declare(strict_types=1);

// PostaliApiRest SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PostaliApiRestFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PostaliApiRestBaseFeature();
            case "test":
                return new PostaliApiRestTestFeature();
            default:
                return new PostaliApiRestBaseFeature();
        }
    }
}
