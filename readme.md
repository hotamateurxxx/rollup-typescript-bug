# Rollup Typescript Bug

This repo reproduces closed issue [ Typescript plugin 4.0.0 Error: Unexpected token (Note that you need plugins to import files that are not JavaScript) #287](https://github.com/rollup/plugins/issues/287). Issue closed because it should to be fixed within pull request [ chore(typescript): bump TypeScript version #818](https://github.com/rollup/plugins/pull/818) and actual plugin changelog contains this fix:

`node_modules\@rollup\plugin-typescript\CHANGELOG.md`
> ## v8.2.1
> 
> _2021-03-26_
> 
> ### Bugfixes
> 
> - fix: bump TypeScript version (#818)
> - fix: update readme and peerDeps version (#830)

but something goes wrong.

## Installation
```BATCH
yarn install
```

## Reproduce

### OK
```BATCH
cls & rmdir /s/q dist & yarn ts-node build-rollup.ts & type dist/script-one/main.js
cls & rmdir /s/q dist & yarn gulp -f build-gulp-rollup.ts build & type dist/script-one/main.js
```

### Feat 1
```BATCH
cls & rmdir /s/q dist & yarn ts-node subfolder/build-rollup.ts & type dist/script-one/main.js
```
Inside subfolder you need specify src path from root, not from subfolder.

#### Expected code
```TS
async function build(): Promise<void> {
    let bundle = await rollup.rollup({
        input: `../src/script-one/main.ts`, 
        plugins: [
            typescript.default()
        ]
    });
    await bundle.write({dir: `../dist/script-one`});
}
```

#### Actual code
```TS
async function build(): Promise<void> {
    let bundle = await rollup.rollup({
        input: `./src/script-one/main.ts`, 
        plugins: [
            typescript.default()
        ]
    });
    await bundle.write({dir: `./dist/script-one`});
}
```

### Error 1
```BATCH
cls & rmdir /s/q dist & yarn gulp -f subfolder/build-gulp-rollup.ts build & type dist/script-one/main.js
```
No way to build with rollup from gulp from subfolder.

#### src path from root
```TS
export async function build(): Promise<void> {
    let bundle = await rollup.rollup({
        input: `./src/script-one/main.ts`, 
        plugins: [
            typescript.default()
        ]
    });
    await bundle.write({dir: `./dist/script-one`});
}
```

```TXT
yarn run v1.22.15
warning package.json: No license field
$ D:\Projects\github.com\rollup-typescript-bug\node_modules\.bin\gulp -f subfolder/build-gulp-rollup.ts build
[17:28:55] Requiring external module ts-node/register
[17:28:55] Working directory changed to D:\Projects\github.com\rollup-typescript-bug\subfolder
[17:28:58] Using gulpfile D:\Projects\github.com\rollup-typescript-bug\subfolder\build-gulp-rollup.ts
[17:28:58] Starting 'build'...
[17:29:00] 'build' errored after 1.76 s
[17:29:00] Error: Could not resolve entry module (./src/script-one/main.ts).
    at error (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:158:30)
    at ModuleLoader.loadEntryModule (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:22405:20)
    at processTicksAndRejections (node:internal/process/task_queues:96:5)
    at async Promise.all (index 0)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
The syntax of the command is incorrect.
```

#### src path from subfolder
```TS
export async function build(): Promise<void> {
    let bundle = await rollup.rollup({
        input: `../src/script-one/main.ts`, 
        plugins: [
            typescript.default()
        ]
    });
    await bundle.write({dir: `../dist/script-one`});
}
```

```TXT
yarn run v1.22.15
warning package.json: No license field
$ D:\Projects\github.com\rollup-typescript-bug\node_modules\.bin\gulp -f subfolder/build-gulp-rollup.ts build
[17:19:54] Requiring external module ts-node/register
[17:19:54] Working directory changed to D:\Projects\github.com\rollup-typescript-bug\subfolder
[17:19:56] Using gulpfile D:\Projects\github.com\rollup-typescript-bug\subfolder\build-gulp-rollup.ts
[17:19:56] Starting 'build'...
[17:19:58] 'build' errored after 1.57 s
[17:19:58] Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)
    at error (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:158:30)
    at Module.error (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12423:16)
    at Module.tryParse (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12826:25)
    at Module.setSource (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12729:24)
    at ModuleLoader.addModuleSource (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:22202:20)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
The syntax of the command is incorrect.
```