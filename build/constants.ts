import type { IBuildTargets } from './types';

export const src = `../src`;
export const dist = `../dist`;

export const buildTargets: IBuildTargets = {

    'script-one': {
        title: `Script One`,
        source: `${src}/script-one/main.ts`,
        distDir: `${dist}/script-one`
    }

};