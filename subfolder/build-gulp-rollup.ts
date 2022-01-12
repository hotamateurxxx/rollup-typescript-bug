import * as rollup from "rollup";
import * as typescript from "@rollup/plugin-typescript";

export async function build(): Promise<void> {
    let bundle = await rollup.rollup({
        input: `./src/script-one/main.ts`, 
        plugins: [
            typescript.default()
        ]
    });
    await bundle.write({dir: `./dist/script-one`});
}