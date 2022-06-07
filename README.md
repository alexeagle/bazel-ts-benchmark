## aspect_rules_ts

ts_project without worker mode, typecheck+emit

```
$ bazel clean; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 101 targets (90 packages loaded, 480 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 12.816s, Critical Path: 9.53s
INFO: 322 processes: 8 internal, 101 linux-sandbox, 213 local.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 322 total actions

real	0m12.833s
user	0m0.012s
sys	0m0.000s
```

ts_project with worker mode, typecheck + emit
```
$ bazel clean; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 101 targets (94 packages loaded, 550 targets configured).
INFO: Found 101 targets...
INFO: Elapsed time: 17.104s, Critical Path: 15.56s
INFO: 326 processes: 58 internal, 1 linux-sandbox, 217 local, 50 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 326 total actions

real	0m17.127s
user	0m0.009s
sys	0m0.003s
```

ts_project, worker mode, swc transpiler
```
$ bazel clean; time bazel build ...
INFO: Starting clean (this may take a while). Consider using --async if the clean takes more than several minutes.
INFO: Analyzed 351 targets (134 packages loaded, 1646 targets configured).
INFO: Found 351 targets...
INFO: Elapsed time: 16.190s, Critical Path: 12.72s
INFO: 786 processes: 234 internal, 261 linux-sandbox, 241 local, 50 worker.
INFO: Build Event Protocol files produced successfully.
INFO: Build completed successfully, 786 total actions

real	0m16.215s
user	0m0.002s
sys	0m0.012s
```

## Methodology

Run on Ubuntu 20.04 on a AMD® Ryzen 9 5900x 12-core processor × 24