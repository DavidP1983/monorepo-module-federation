import * as paths from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack from 'webpack';
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";

import { Configuration } from "webpack";
import { BuildOptions } from './types/types';
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

export function buildPlugins({ mode, path, analyzer, platform }: BuildOptions): Configuration['plugins'] {

    const isDev = mode === 'development';
    const isProd = mode === 'production';

    const plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: path.html,
            favicon: paths.resolve(path.public, 'favicon.ico'),
            publicPath: '/' // чтоб маршруты правильно работали
        }),
        new webpack.DefinePlugin({
            PLATFORM: JSON.stringify(platform),
            ENV: JSON.stringify(mode)
        }),
    ]

    if (isDev) {
        plugins.push(new webpack.ProgressPlugin());
        // plugins.push(new ForkTsCheckerWebpackPlugin());
        plugins.push(new ReactRefreshWebpackPlugin());
    }

    if (isProd) {
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        }));
        plugins.push(
            new CopyPlugin({
                patterns: [
                    { from: paths.resolve(path.public, 'locales'), to: paths.resolve(path.output, 'locales') },
                ],
            }),
        )
    }

    if (analyzer) {
        plugins.push(new BundleAnalyzerPlugin())
    }


    return plugins;
}