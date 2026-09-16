# PostaliApiRest SDK feature factory

from postaliapirest_sdk.feature.base_feature import PostaliApiRestBaseFeature
from postaliapirest_sdk.feature.ratelimit_feature import PostaliApiRestRatelimitFeature
from postaliapirest_sdk.feature.retry_feature import PostaliApiRestRetryFeature
from postaliapirest_sdk.feature.test_feature import PostaliApiRestTestFeature
from postaliapirest_sdk.feature.timeout_feature import PostaliApiRestTimeoutFeature


_FEATURES = {
    "base": lambda: PostaliApiRestBaseFeature(),
    "ratelimit": lambda: PostaliApiRestRatelimitFeature(),
    "retry": lambda: PostaliApiRestRetryFeature(),
    "test": lambda: PostaliApiRestTestFeature(),
    "timeout": lambda: PostaliApiRestTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
