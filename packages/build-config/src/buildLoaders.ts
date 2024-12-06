import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import ReactRefreshTypeScript from 'react-refresh-typescript';
import { buildBabelLoader } from "./babel/buildBabelLoader";



export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {

    const isDev = options.mode === 'development';

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : "[hash:base64:8]"
            }
        },
    }

    const imageLodaer =
    {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    }

    const svgLoader = {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{
            loader: '@svgr/webpack', options:
            {
                icon: true,
                svgoConfig: {
                    plugins: [{
                        name: 'convertColors',
                        params: {
                            "currentColor": true
                        }

                    }]
                }

            }
        }],
    }



    const scssLodader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            // "style-loader",
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }



    // const tsLoader = {
    //     test: /\.tsx?$/,
    //     use: 'ts-loader',
    //     exclude: /node_modules/,
    // }

    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    //Проверка типов отдельным процессом
                    transpileOnly: true,
                    // обновление кода без перезагрузки страницы 
                    getCustomTransformers: () => ({
                        before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
                    })
                }
            }
        ]
    }

    // const babelLoader = {
    //     test: /\.tsx?$/,
    //     exclude: /node_modules/,
    //     use: {
    //         loader: "babel-loader",
    //         // options: {
    //         //     presets: [
    //         //         '@babel/preset-env',
    //         //         "@babel/preset-typescript",
    //         //         [
    //         //             "@babel/preset-react",
    //         //             {
    //         //                 runtime: isDev ? 'automatic' : 'classic',
    //         //             }
    //         //         ]
    //         //     ]
    //         // }
    //     }
    // }

    // const babelLoader = buildBabelLoader(options);


    return [
        svgLoader,
        scssLodader,
        imageLodaer,
        tsLoader,
        // babelLoader
    ]
}

