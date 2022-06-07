## 1. aspect_rules_ts without worker mode, typecheck+emit

```
$ bazel clean; time bazel build ... ; echo 'console.log()' >> src/billing/lib0/cmp0/cmp0.component.ts ; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 101 targets (94 packages loaded, 550 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 11.273s, Critical Path: 8.44s
INFO: 318 processes: 55 internal, 50 linux-sandbox, 213 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 318 total actions

real	0m11.284s
user	0m0.000s
sys	0m0.011s
INFO: Analyzed 101 targets (0 packages loaded, 0 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 1.799s, Critical Path: 1.72s
INFO: 3 processes: 1 internal, 1 linux-sandbox, 1 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 3 total actions

real	0m1.810s
user	0m0.000s
sys	0m0.009s

```

Profile: 1.profile.gz


## 2. aspect_rules_ts + persistent worker, typecheck + emit
```
$ bazel clean; time bazel build ... ; echo 'console.log()' >> src/billing/lib0/cmp0/cmp0.component.ts ; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 101 targets (94 packages loaded, 550 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 17.135s, Critical Path: 15.44s
INFO: 326 processes: 58 internal, 1 linux-sandbox, 217 local, 50 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 326 total actions

real	0m17.156s
user	0m0.014s
sys	0m0.000s
INFO: Analyzed 101 targets (0 packages loaded, 0 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 1.586s, Critical Path: 1.51s
INFO: 3 processes: 1 internal, 1 local, 1 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 3 total actions

real	0m1.608s
user	0m0.008s
sys	0m0.000s
```

Profile: 2.profile.gz

## 3. aspect_rules_ts + persistent worker + swc transpiler
```
$ bazel clean; time bazel build ... ; echo 'console.log()' >> src/billing/lib0/cmp0/cmp0.component.ts ; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 351 targets (134 packages loaded, 1646 targets configured).
INFO: Found 351 targets...
INFO: Elapsed time: 16.009s, Critical Path: 13.20s
INFO: 786 processes: 234 internal, 261 linux-sandbox, 241 local, 50 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 786 total actions

real	0m16.035s
user	0m0.005s
sys	0m0.008s
INFO: Analyzed 351 targets (0 packages loaded, 0 targets configured).
INFO: Found 351 targets...
INFO: Elapsed time: 1.383s, Critical Path: 1.29s
INFO: 4 processes: 1 internal, 1 linux-sandbox, 1 local, 1 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 4 total actions

real	0m1.405s
user	0m0.008s
sys	0m0.000s

```

## 4. rules_nodejs ts_project, no worker, typecheck+emit

```
$ bazel clean; time bazel build ... && echo 'console.log()' >> src/billing/lib0/cmp0/cmp0.component.ts && time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
DEBUG: /shared/cache/bazel/user_base/86a05c19ad2571976ca81979ac7e3b79/external/build_bazel_rules_nodejs/index.bzl:73:14: yarn_install#yarn attribute not set and no repository named 'yarn' exists; installing default yarn
INFO: Analyzed 104 targets (107 packages loaded, 596 targets configured).
INFO: Found 104 targets...
INFO: Elapsed time: 13.025s, Critical Path: 9.21s
INFO: 238 processes: 113 internal, 100 linux-sandbox, 25 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 238 total actions

real	0m13.036s
user	0m0.009s
sys	0m0.003s
DEBUG: /shared/cache/bazel/user_base/86a05c19ad2571976ca81979ac7e3b79/external/build_bazel_rules_nodejs/index.bzl:73:14: yarn_install#yarn attribute not set and no repository named 'yarn' exists; installing default yarn
INFO: Analyzed 104 targets (0 packages loaded, 0 targets configured).
INFO: Found 104 targets...
INFO: Elapsed time: 1.834s, Critical Path: 1.76s
INFO: 2 processes: 1 internal, 1 linux-sandbox.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 2 total actions

real	0m1.843s
user	0m0.005s
sys	0m0.003s
```

## 5. rules_nodejs ts_project, no worker, swc transpiler

```
$ bazel clean; time bazel build ... && echo 'console.log()' >> src/billing/lib0/cmp0/cmp0.component.ts && time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
DEBUG: /shared/cache/bazel/user_base/86a05c19ad2571976ca81979ac7e3b79/external/build_bazel_rules_nodejs/index.bzl:73:14: yarn_install#yarn attribute not set and no repository named 'yarn' exists; installing default yarn
INFO: Analyzed 354 targets (149 packages loaded, 1698 targets configured).
INFO: Found 354 targets...
INFO: Elapsed time: 14.008s, Critical Path: 8.10s
INFO: 908 processes: 289 internal, 360 linux-sandbox, 259 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 908 total actions

real	0m14.022s
user	0m0.006s
sys	0m0.010s
DEBUG: /shared/cache/bazel/user_base/86a05c19ad2571976ca81979ac7e3b79/external/build_bazel_rules_nodejs/index.bzl:73:14: yarn_install#yarn attribute not set and no repository named 'yarn' exists; installing default yarn
INFO: Analyzed 354 targets (0 packages loaded, 0 targets configured).
INFO: Found 354 targets...
INFO: Elapsed time: 1.636s, Critical Path: 1.53s
INFO: 4 processes: 1 internal, 2 linux-sandbox, 1 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 4 total actions

real	0m1.647s
user	0m0.006s
sys	0m0.002s
```

rules_nodejs `ts_library`
TODO

rules_nodejs `ts_project`
TODO

bare tsc w --watch
TODO


## Methodology

Run on Ubuntu 20.04 on a AMD® Ryzen 9 5900x 12-core processor × 24
