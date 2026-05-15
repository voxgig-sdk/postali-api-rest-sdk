# PostaliApiRest SDK utility: feature_add
module PostaliApiRestUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
