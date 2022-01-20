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
        LOGIN_GET_VALIDGRAPHIC: 'authenticate/getvalidgraphic',                    // 获取验证码图片
        LOGIN_AUTH: 'authenticate/login',                                          // 登录验证

        MARKETING_CONTRACT_LIST: 'api/salesbusiness/salescontract/list',           // 销售合同列表

        UNIT_OF_MEASUREMENT_LIST: 'api/stock/measureunit/list',                    // 计量单位列表
        UNIT_OF_MEASUREMENT_MODIFY: 'api/stock/measureunit/modify',                // 计量单位新增 && 编辑
        UNIT_OF_MEASUREMENT_DELETE: 'api/stock/measureunit/delete',                // 计量单位 删除
    }
}