package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewMunicipalityEntityFunc func(client *PostaliApiRestSDK, entopts map[string]any) PostaliApiRestEntity

var NewPostalCodeEntityFunc func(client *PostaliApiRestSDK, entopts map[string]any) PostaliApiRestEntity

var NewStateEntityFunc func(client *PostaliApiRestSDK, entopts map[string]any) PostaliApiRestEntity

