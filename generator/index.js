/**
 * Generate lots of "feature" code to bulk out this example to a given size.
 * By default we generate 40 components and check that in.
 * You can generate more by passing arguments, for example
 * node generator/index.js 10 10
 * will make 1000 components total: for each of the ten "features", it will have 10 modules, each
 * has 10 components.
 */
const {existsSync, mkdirSync, writeFileSync} = require('fs');
const {dirname} = require('path');

const featureNames = [
    'billing',
    'compute',
    'datastore',
    'functions',
    'logging',
    'monitoring',
    'networking',
    'registry',
    'storage',
    'support',
];

const modulesPerFeature = process.argv[2] || 2;
const componentsPerModule = process.argv[3] || 2;
let globalCmpIdx = 0;

function mkdir(d) {
    if (!existsSync(dirname(d))) {
        mkdir(dirname(d))
    }
    if (!existsSync(d)) {
        mkdirSync(d)
    }
}
function write(to, content) {
    mkdir(dirname(to))
    writeFileSync(to, content)
}

const LOAD = 'load("@aspect_rules_ts//ts:defs.bzl", "ts_project")'
// const LOAD = 'load("@npm//@bazel/typescript:index.bzl", "ts_project")'
// const LOAD = 'load("@npm//@bazel/concatjs:index.bzl", ts_project = "ts_library")'

const TS_ATTRS = `
    # Needed with everything except ts_library
    declaration = True,

    # Default varies between rules_nodejs and rules_ts
    supports_workers = True,

    # Uncomment for swc transpiler
    transpiler = swc_transpiler,

    # For rules_ts:
    tsconfig = "//:tsconfig",
    # For rules_nodejs:
    # tsconfig = "//:tsconfig.json",
`

function makeFeatureModule(name) {

    //    ng('generate', 'module', name, '--module', 'app');
    //    ng('generate', 'component', `${name}/index`, '--module', `${name}`, '--inlineStyle=true');

    const featureModuleDeps = [];

    for (let modIdx = 0; modIdx < modulesPerFeature; modIdx++) {
        //  ng('generate', 'module', `${name}/module${modIdx}`, '--module', name);

        featureModuleDeps.push(`//src/${name}/lib${modIdx}`);
        const tsFileAcc = [];

        for (let cmpIdx = 0; cmpIdx < componentsPerModule; cmpIdx++) {
            //    ng('generate', 'component', `${name}/module${modIdx}/cmp${globalCmpIdx}`, '--module',
            //       `${name}/module${modIdx}`, '--export=true');
            let fileName = `cmp${globalCmpIdx}/cmp${globalCmpIdx}.component.ts`
            let range1k = [...Array(1000).keys()]
            let vars = range1k.map(f => `export const a${f}: number = ${f}`).join('\n')
            let sum = 'export const a = ' + range1k.map(f => `a${f}`).join('+')
            write(`src/${name}/lib${modIdx}/${fileName}`, `${vars}\n${sum}\n`)
            tsFileAcc.push(fileName);
            globalCmpIdx++;
        }

        write(`src/${name}/lib${modIdx}/index.ts`, tsFileAcc.map(
            (s, idx) => `import {a as val${idx}} from './${s.replace('.ts', '')}'`).join('\n'));

        // Write a BUILD file to build the lib
        write(`src/${name}/lib${modIdx}/BUILD.bazel`, `
# Generated BUILD file, see /tools/generate.js
${LOAD}
load("@aspect_rules_swc//swc:defs.bzl", "swc_transpiler")

package(default_visibility = ["//:__subpackages__"])
 
ts_project(
    name = "lib${modIdx}",
    srcs = [
        "index.ts",
        ${tsFileAcc.map(s => `"${s}"`).join(',\n        ')}
    ],
${TS_ATTRS}
)
`);
    }

    write(`src/${name}/index.ts`, featureModuleDeps.map(f => f.split("/").pop()).map(f => `import {} from './${f}'`).join("\n"))
    // Write a BUILD file to build the feature
    write(`src/${name}/BUILD.bazel`, `
# Generated BUILD file, see /tools/generate.js
${LOAD}
load("@aspect_rules_swc//swc:defs.bzl", "swc_transpiler")

package(default_visibility = ["//:__subpackages__"])

ts_project(
    name = "${name}",
    srcs = [
        "index.ts",
    ],
${TS_ATTRS}
    deps = [
        ${featureModuleDeps.map(s => `"${s}"`).join(',\n        ')}
    ],
)
`);
}

featureNames.forEach(p => makeFeatureModule(p));
