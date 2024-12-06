import type { Configuration as DevServerConfiguration } from "webpack-dev-server";  // типы из npm
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,
        //Работает только для DevServer
        historyApiFallback: true,
        hot: true
    }
}