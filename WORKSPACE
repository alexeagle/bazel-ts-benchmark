load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "aspect_rules_ts",
    sha256 = "1f4854ac104881b62d341c19d6150d32ba582351b24a1f0b761c218456057017",
    strip_prefix = "rules_ts-0.5.0",
    url = "https://github.com/aspect-build/rules_ts/archive/refs/tags/v0.5.0.tar.gz",
)

##################
# rules_ts setup #
##################
# Fetches the rules_ts dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_ts//ts:repositories.bzl", "LATEST_VERSION", "rules_ts_dependencies")

rules_ts_dependencies(ts_version = LATEST_VERSION)

# Fetch and register node, if you haven't already
load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "node",
    node_version = DEFAULT_NODE_VERSION,
)
