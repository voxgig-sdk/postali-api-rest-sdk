# ProjectName SDK exists test

import pytest
from postaliapirest_sdk import PostaliApiRestSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PostaliApiRestSDK.test(None, None)
        assert testsdk is not None
