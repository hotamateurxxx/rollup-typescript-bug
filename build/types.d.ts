export interface IBuildTarget {
    title?: string;
    source: string;
    distDir: string;
}

export interface IBuildTargets {
    [name: string]: IBuildTarget;
}