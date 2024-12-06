export interface BuildPath {
    entry: string;
    html: string;
    output: string;
    src: string;
    public: string;
}

export type BuildMode = 'production' | 'development';
export type BuildPlatform = 'mobile' | 'desktop';

export interface BuildOptions {
    port: number;
    mode: BuildMode;
    path: BuildPath;
    analyzer?: boolean;
    platform: BuildPlatform;
}

