<?php
declare(strict_types=1);

// PostalCode entity test

require_once __DIR__ . '/../postaliapirest_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PostalCodeEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PostaliApiRestSDK::test(null, null);
        $ent = $testsdk->PostalCode(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = postal_code_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "postal_code." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set POSTALIAPIREST_TEST_POSTAL_CODE_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $postal_code_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.postal_code")));
        $postal_code_ref01_data = null;
        if (count($postal_code_ref01_data_raw) > 0) {
            $postal_code_ref01_data = Helpers::to_map($postal_code_ref01_data_raw[0][1]);
        }

        // LOAD
        $postal_code_ref01_ent = $client->PostalCode(null);
        $postal_code_ref01_match_dt0 = [];
        [$postal_code_ref01_data_dt0_loaded, $err] = $postal_code_ref01_ent->load($postal_code_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($postal_code_ref01_data_dt0_loaded);

    }
}

function postal_code_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/postal_code/PostalCodeTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PostaliApiRestSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["postal_code01", "postal_code02", "postal_code03", "codigo_postal01", "codigo_postal02", "codigo_postal03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("POSTALIAPIREST_TEST_POSTAL_CODE_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "POSTALIAPIREST_TEST_POSTAL_CODE_ENTID" => $idmap,
        "POSTALIAPIREST_TEST_LIVE" => "FALSE",
        "POSTALIAPIREST_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["POSTALIAPIREST_TEST_POSTAL_CODE_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["POSTALIAPIREST_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PostaliApiRestSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["POSTALIAPIREST_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["POSTALIAPIREST_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
