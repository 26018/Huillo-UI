const {defineConfig} = require('@vue/cli-service');

// 动态配置IP地址
const os = require('os');
function getNetworkIp() {
    // 打开的host
    let needHost = '';
    try {
        // 获得网络接口列表
        let network = os.networkInterfaces();
        for (let dev in network) {
            let iface = network[dev];
            for (let i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    needHost = alias.address;
                }
            }
        }
    } catch (e) {
        needHost = 'localhost';
    }
    return needHost;
}

module.exports = defineConfig({
    transpileDependencies: true,

    lintOnSave: false,

    devServer: {
        proxy: {
            // 配置跨域
            '/api': {
                target: "http://"+getNetworkIp(), //后端接口地址
                changeOrigin: true, //是否允许跨越
                pathRewrite: {
                    '^/api': '', //重写,
                },
            },
        }
    }
});
