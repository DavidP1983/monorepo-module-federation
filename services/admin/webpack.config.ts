
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
}


export default (env: EnvVariables) => {

    const paths: BuildPath = {
        entry: path.resolve(__dirname, "src", "index.tsx"),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, "public")
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 3002,
        mode: env.mode ?? 'development',
        path: paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    });

    // Эти настройки можно вынести в отдельный файл configs
    config.plugins.push(new webpack.container.ModuleFederationPlugin({
        name: 'admin',                                   //название microfrontend
        filename: 'remoteEntry.js',   // название файла, который удаленно будет подключаться в host-контейнер
        exposes: {                   // отдаем наружу наш 'routers'
            './Router': './src/router/Router.tsx'
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

