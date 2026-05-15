package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/postali-api-rest-sdk"
	"github.com/voxgig-sdk/postali-api-rest-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestPostalCodeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.PostalCode(nil)
		if ent == nil {
			t.Fatal("expected non-nil PostalCodeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := postal_codeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "postal_code." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set POSTALIAPIREST_TEST_POSTAL_CODE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		postalCodeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.postal_code", setup.data)))
		var postalCodeRef01Data map[string]any
		if len(postalCodeRef01DataRaw) > 0 {
			postalCodeRef01Data = core.ToMapAny(postalCodeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = postalCodeRef01Data

		// LOAD
		postalCodeRef01Ent := client.PostalCode(nil)
		postalCodeRef01MatchDt0 := map[string]any{}
		postalCodeRef01DataDt0Loaded, err := postalCodeRef01Ent.Load(postalCodeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if postalCodeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func postal_codeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "postal_code", "PostalCodeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read postal_code test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse postal_code test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"postal_code01", "postal_code02", "postal_code03", "codigo_postal01", "codigo_postal02", "codigo_postal03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("POSTALIAPIREST_TEST_POSTAL_CODE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"POSTALIAPIREST_TEST_POSTAL_CODE_ENTID": idmap,
		"POSTALIAPIREST_TEST_LIVE":      "FALSE",
		"POSTALIAPIREST_TEST_EXPLAIN":   "FALSE",
		"POSTALIAPIREST_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["POSTALIAPIREST_TEST_POSTAL_CODE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["POSTALIAPIREST_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["POSTALIAPIREST_APIKEY"],
			},
			extra,
		})
		client = sdk.NewPostaliApiRestSDK(core.ToMapAny(mergedOpts))
	}

	live := env["POSTALIAPIREST_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["POSTALIAPIREST_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
