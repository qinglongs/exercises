
/** 格式化请求参数为query形式 */
export const formatResquestParamsToQuery = (params: Record<string, any>) => {
    let str = '?';
    Object.entries(params).forEach(([key, value]) => {
        str += key + '=' + value +'&'
    })
    return str.slice(0,-1);
}