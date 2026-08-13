# PostaliApiRest SDK utility: make_context

from projectname_sdk.core.context import PostaliApiRestContext


def make_context_util(ctxmap, basectx):
    return PostaliApiRestContext(ctxmap, basectx)
