<?php
declare(strict_types=1);

// PostaliApiRest SDK exists test

require_once __DIR__ . '/../postaliapirest_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PostaliApiRestSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
