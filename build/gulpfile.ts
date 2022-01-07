import * as gulp from "gulp";
import * as fs from "fs";

import * as rollup from "./rollup";
import * as constants from "./constants";

export let clean = async () => await fs.promises.rmdir(constants.dist);
export let build = async () => await rollup.buildProject(constants.buildTargets["script-one"]);