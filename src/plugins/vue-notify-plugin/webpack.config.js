/* eslint-disable @typescript-eslint/no-var-requires */
const Encore = require("@symfony/webpack-encore");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "development");
}

Encore
    .setOutputPath("dist")
    .setPublicPath("/")
    .addEntry("plugin/main", "./src/main.ts")
    .enableSassLoader()
    .splitEntryChunks()
    .cleanupOutputBeforeBuild()
    .enableVueLoader()
    .enableTypeScriptLoader()
    .copyFiles({from: "./src", pattern: /index\.d\.ts$/})
    .enableSourceMaps(Encore.isDev())
    .enableSingleRuntimeChunk()
    .configureDevServerOptions((options) => {
        options.open = true;
    });

const config = Encore.getWebpackConfig();

Object.assign(config.resolve, {
    plugins: [
        new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    ]
});

module.exports = config;
