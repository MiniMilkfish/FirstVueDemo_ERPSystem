import ACTION_TYPES from '../constantActionTypes';
import ServerConfig from '../../config/urlConfig';
import * as common from '../../utils/common';

/**
 * 处理异步请求
 */
export default {
    [ACTION_TYPES.LOGIN_FORM_SUBMIT]({ commit }, payload) {
        let reqUrl = `${ServerConfig.SERVER_BASE_URL}${ServerConfig.SERVER_API.LOGIN_AUTH}`,
            _extraTools = {
                actionFailure: payload.actionFailure,
            },
            reqParam = {
                userName: payload.name,
                password: payload.pass,
                seed: payload.seed,
                vaildCode: payload.vaildCode
            };

        common.fetchGet(reqUrl, reqParam, function (json) {
            if (json) {
                let token = json.token;
                common.setItem('t', token);

                commit({ type: ACTION_TYPES.LOGIN_FORM_SUBMIT, ...payload })
            }
        }, _extraTools)
    }
}