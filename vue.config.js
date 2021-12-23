
module.exports = {
    chainWebpack: config => {
        config.plugin('html').tap(args => {
            args[0].title = "内部运维系统平台 | Internal Operation & Maintenance System Platform";
            return args;
        })
    }
}