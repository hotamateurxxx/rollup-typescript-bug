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

## Installation & Reproduce
```CMD
yarn install
yarn build
```

## What you should get
```
yarn run v1.22.15
warning package.json: No license field
$ gulp -f build/gulpfile.ts build
[02:17:51] Requiring external module ts-node/register
[02:17:51] Working directory changed to D:\Projects\github.com\rollup-typescript-bug\build
[02:17:53] Using gulpfile D:\Projects\github.com\rollup-typescript-bug\build\gulpfile.ts
[02:17:53] Starting 'build'...
[02:17:54] 'build' errored after 1.46 s
[02:17:54] Error: Unexpected token (Note that you need plugins to import files that are not JavaScript)
    at error (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:158:30)
    at Module.error (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12423:16)
    at Module.tryParse (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12826:25)
    at Module.setSource (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:12729:24)
    at ModuleLoader.addModuleSource (D:\Projects\github.com\rollup-typescript-bug\node_modules\rollup\dist\shared\rollup.js:22202:20)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```