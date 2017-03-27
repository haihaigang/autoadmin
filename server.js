var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");

var config = require("./webpack.config.dev.js");
config.entry.app.unshift("webpack-dev-server/client?http://0.0.0.0:8083");
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    // webpack-dev-server options

    contentBase: "./src",
    // or: contentBase: "http://localhost/",

    hot: false,
    // Enable special support for Hot Module Replacement
    // Page is no longer updated, but a "webpackHotUpdate" message is send to the content
    // Use "webpack/hot/dev-server" as additional module in your entry point
    // Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does. 

    // Set this as true if you want to access dev server from awrbitrary url.
    // This is handy if you are using a html5 router.
    historyApiFallback: true,

    // webpack-dev-middleware options
    quiet: false,
    noInfo: false,
    // lazy: true,
    // filename: "index.html",
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    },
    publicPath: "/assets/",
    headers: {
        "X-Custom-Header": "yes"
    },
    stats: {
        colors: true
    },

    proxy: {
        '/api/*': {
            target: 'http://admin.meigo.com',
            headers: {
                host:'admin.meigo.com'
            },
            secure: false,
            rewrite: function(req) {
                //req.url = req.url.replace(/^\/api/, '');
            }
        },
        '/php/*': {
            target: 'http://admin.meigo.com',
            secure: false,
            headers: {
                "host": "admin.meigo.com"
            },
            rewrite: function(req) {
                //req.url = req.url.replace(/^\/php/, '');
            }
        },
    }

});
server.listen(8083, "0.0.0.0", function() {});
// server.close();
