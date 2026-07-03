package voxgigpostaliapirestsdk

import (
	"github.com/voxgig-sdk/postali-api-rest-sdk/go/core"
	"github.com/voxgig-sdk/postali-api-rest-sdk/go/entity"
	"github.com/voxgig-sdk/postali-api-rest-sdk/go/feature"
	_ "github.com/voxgig-sdk/postali-api-rest-sdk/go/utility"
)

// Type aliases preserve external API.
type PostaliApiRestSDK = core.PostaliApiRestSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PostaliApiRestEntity = core.PostaliApiRestEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PostaliApiRestError = core.PostaliApiRestError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewMunicipalityEntityFunc = func(client *core.PostaliApiRestSDK, entopts map[string]any) core.PostaliApiRestEntity {
		return entity.NewMunicipalityEntity(client, entopts)
	}
	core.NewPostalCodeEntityFunc = func(client *core.PostaliApiRestSDK, entopts map[string]any) core.PostaliApiRestEntity {
		return entity.NewPostalCodeEntity(client, entopts)
	}
	core.NewStateEntityFunc = func(client *core.PostaliApiRestSDK, entopts map[string]any) core.PostaliApiRestEntity {
		return entity.NewStateEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPostaliApiRestSDK = core.NewPostaliApiRestSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig

// No-arg convenience constructors. Go has no default-argument syntax,
// so these aliases let callers write `sdk.New()` / `sdk.Test()`
// instead of `sdk.NewPostaliApiRestSDK(nil)` / `sdk.TestSDK(nil, nil)`
// for the common no-options case.
func New() *PostaliApiRestSDK  { return NewPostaliApiRestSDK(nil) }
func Test() *PostaliApiRestSDK { return TestSDK(nil, nil) }
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
