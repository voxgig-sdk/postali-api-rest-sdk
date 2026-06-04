# PostalCode entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from postaliapirest_sdk import PostaliApiRestSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestPostalCodeEntity:

    def test_should_create_instance(self):
        testsdk = PostaliApiRestSDK.test(None, None)
        ent = testsdk.PostalCode(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _postal_code_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "postal_code." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set POSTALIAPIREST_TEST_POSTAL_CODE_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        postal_code_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.postal_code")))
        postal_code_ref01_data = None
        if len(postal_code_ref01_data_raw) > 0:
            postal_code_ref01_data = helpers.to_map(postal_code_ref01_data_raw[0][1])

        # LOAD
        postal_code_ref01_ent = client.PostalCode(None)
        postal_code_ref01_match_dt0 = {}
        postal_code_ref01_data_dt0_loaded, err = postal_code_ref01_ent.load(postal_code_ref01_match_dt0, None)
        assert err is None
        assert postal_code_ref01_data_dt0_loaded is not None



def _postal_code_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/postal_code/PostalCodeTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = PostaliApiRestSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["postal_code01", "postal_code02", "postal_code03", "codigo_postal01", "codigo_postal02", "codigo_postal03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "POSTALIAPIREST_TEST_POSTAL_CODE_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "POSTALIAPIREST_TEST_POSTAL_CODE_ENTID": idmap,
        "POSTALIAPIREST_TEST_LIVE": "FALSE",
        "POSTALIAPIREST_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("POSTALIAPIREST_TEST_POSTAL_CODE_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("POSTALIAPIREST_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = PostaliApiRestSDK(helpers.to_map(merged_opts))

    _live = env.get("POSTALIAPIREST_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("POSTALIAPIREST_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
