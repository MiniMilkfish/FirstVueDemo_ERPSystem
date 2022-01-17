/**
 * Motation && Action 事件类型
 */
 export default {
    INCREMENT: 'INCREMENT',

    MASTER_GO_BACK_HOME: 'MASTER_GO_BACK_HOME',                             // 返回主页
    MASTER_EXIST_PLATFORM: 'MASTER_EXIST_PLATFORM',                         // 退出当前系统

    // 平台头部
    MASTER_HEADER_TAB_ON_CLICK: 'MASTER_HEADER_TAB_ON_CLICK',               // 头Tab页点击事件
    CLEAR_CURRENT_HEADER_TAB_PAGE_URL: 'CLEAR_CURRENT_HEADER_TAB_PAGE_URL', // 清理当前TAB页的垃圾数据

    // 平台左侧菜单
    MASTER_LEFT_MENU_ITEM_ON_CLICK: 'MASTER_LEFT_MENU_ITEM_ON_CLICK',      //  左侧菜单菜单项点击事件
    CLEAR_CURRENT_MENU_PAGE_URL: 'CLEAR_CURRENT_MENU_PAGE_URL',             //  清理当前菜单栏的垃圾数据

    // 登录页
    WINDOWS_ON_RESIZE: 'WINDOWS_ON_RESIZE',                                  // 窗体窗口调整事件
    LOGIN_FORM_SUBMIT: 'LOGIN_FORM_SUBMIT',                                  // 登录窗体提交
    REFRESH_VARIFICATION_CODE: 'REFRESH_VARIFICATION_CODE',                  // 更新验证码
};