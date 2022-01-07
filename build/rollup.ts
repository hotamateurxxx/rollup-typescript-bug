import * as rollup from "rollup";
import * as rollupts from "@rollup/plugin-typescript";
import type { IBuildTarget } from "./types";


const tsoptions: rollupts.RollupTypescriptOptions = {
    cacheDir: `.rollup.tscache`,
    target: `es2016`,
    module: `esnext`,
};


export async function buildProject(target: IBuildTarget): Promise<void> {
    let options: rollup.RollupOptions = {
        input: target.source, 
        plugins: [
            rollupts.default(tsoptions)
        ]
    };
    let outputoptions: rollup.OutputOptions = {dir: target.distDir};

    let bundle = await rollup.rollup(options);
    await bundle.write(outputoptions);
}