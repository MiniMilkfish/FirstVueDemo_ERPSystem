/**
 * 服务器配置、路由配置
 */
const SERVER_CONFIG = {
    HOST: window.SERVER_HOST,
    PORT: window.SERVER_PORT
};

export default {
    SERVER_BASE_URL: `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/`,
    SERVER_API: {
        // 
    }
}