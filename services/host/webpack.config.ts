
import path from 'path';
import webpack from 'webpack';
// import { buildWebpack } from './config/build/buildWebpack';
// import { BuildMode, BuildPath, BuildPlatform } from './config/build/types/types';
import { BuildMode, BuildPath, BuildPlatform, buildWebpack } from '@packages/build-config';
import packageJson from './package.json';

interface EnvVariables {
    mode?: BuildMode,
    port?: number,
    analyzer?: boolean;
    platform: BuildPlatform;
    SHOP_REMOTE_URL?: string;
    ADMIN_REMOTE_URL?: string;
}


export default (env: EnvVariables) => {

    const paths: BuildPath = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, "public")
    }

    const SHOP_REMOTE_URL = env.SHOP_REMOTE_URL ?? 'http://localhost:3001';
    const ADMIN_REMOTE_URL = env.ADMIN_REMOTE_URL ?? 'http://localhost:3002';


    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        path: paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    });

    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'host',
        filename: 'remoteEntry.js',

        remotes: {
            shop: `shop@${SHOP_REMOTE_URL}/remoteEntry.js`,   // определяем на каком порту будет запущен модуль
            admin: `admin@${ADMIN_REMOTE_URL}/remoteEntry.js`
        },
        shared: {                    // указываем какие библиотеки у нас общие и какие должны передаваться
            ...packageJson.dependencies,
            react: {
                eager: true,         // указывает на то, чтоб подгрузить сразу данную библиотеку
                requiredVersion: packageJson.dependencies['react']
            },
            'react-router-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-router-dom']
            },
            'react-dom': {
                eager: true,
                requiredVersion: packageJson.dependencies['react-dom']
            }
        }
    }))


    return config;

};

