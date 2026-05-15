# PostaliApiRest SDK feature factory

from feature.base_feature import PostaliApiRestBaseFeature
from feature.test_feature import PostaliApiRestTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PostaliApiRestBaseFeature(),
        "test": lambda: PostaliApiRestTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
