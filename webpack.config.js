/* eslint-disable @typescript-eslint/no-var-requires */
const Encore = require("@symfony/webpack-encore");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");


if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || "development");
}

Encore
    .setOutputPath("dist")
    .setPublicPath("/")
    .addEntry("app", "./src/app.ts")
    .enablePostCssLoader()
    .enableSassLoader()
    .splitEntryChunks()
    .cleanupOutputBeforeBuild()
    .enableVueLoader(() => {}, { runtimeCompilerBuild: true })
    .enableTypeScriptLoader()
    .enableSourceMaps(Encore.isDev())
    .enableVersioning(Encore.isProduction())
    .disableSingleRuntimeChunk()
    .configureDevServerOptions((options) => {
        options.open = true;
        options.allowedHosts = 'all';
    })
    .addPlugin(new HtmlWebpackPlugin({
        title: "Mountain kingdom",
        template: 'src/index.html',
        inject: 'body',
        meta: {
            viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
        }
    }));

const config = Encore.getWebpackConfig();

Object.assign(config.resolve, {
    plugins: [
        new TsconfigPathsPlugin({ configFile: "tsconfig.json" })
    ]
});

module.exports = config;
