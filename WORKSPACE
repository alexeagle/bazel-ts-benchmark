load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
http_archive(
    name = "aspect_rules_ts",
    #sha256 = "1f4854ac104881b62d341c19d6150d32ba582351b24a1f0b761c218456057017",
    strip_prefix = "rules_ts-4e277ee1495fb4079c27ba887702acc7cdc7adb3",
    url = "https://github.com/aspect-build/rules_ts/archive/4e277ee1495fb4079c27ba887702acc7cdc7adb3.tar.gz",
)

##################
# rules_ts setup #
##################

load("@aspect_rules_ts//ts:repositories.bzl", "LATEST_VERSION", "rules_ts_dependencies")

rules_ts_dependencies(ts_version = LATEST_VERSION)

# Fetch and register node, if you haven't already
load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "node",
    node_version = DEFAULT_NODE_VERSION,
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "83ba896bdefb4d2d537b674742bc38bf151ade353ae4a564f884bc6ee2c1dc65",
    strip_prefix = "rules_swc-0.10.0",
    url = "https://github.com/aspect-build/rules_swc/archive/refs/tags/v0.10.0.tar.gz",
)

###################
# rules_swc setup #
###################

load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

# Fetches a pre-built Rust-node binding from
# https://github.com/swc-project/swc/releases.
# If you'd rather compile it from source, you can use rules_rust, fetch the project,
# then register the toolchain yourself. (Note, this is not yet documented)
load("@aspect_rules_swc//swc:repositories.bzl", swc_version = "LATEST_VERSION", "swc_register_toolchains")

swc_register_toolchains(
    name = "swc",
    swc_version = swc_version,
)
