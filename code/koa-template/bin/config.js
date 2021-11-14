const defaultConfig = {
  packageName: "test-koa-setup",
  port: 8000,
  middleware: {
    static: false,
    router: false,
    views: false,
    body: false,
  },
};

let config = Object.assign({}, defaultConfig);

// 适配逻辑
// 处理 options

function adapter(options) {
  const haveMiddleware = (middleware) => {
    return options.middleware.indexOf(middleware) !== -1;
  };

  config.packageName = options.packageName;
  config.port = options.port;
  config.middleware.static = haveMiddleware("koaStatic");
  config.middleware.router = haveMiddleware("koaRouter");
  config.middleware.views = haveMiddleware("koaViews");
  config.middleware.body = haveMiddleware("koaBody");
}

module.exports = {
  defaultConfig,
  adapter,
  config,
};
