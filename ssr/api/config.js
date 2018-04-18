// 接口前缀地址
export function setUrl() {
    let href = location.host;

    if (href !== 'linfengzhuiyi.cn') {
        href = 'linfengzhuiyi.cn';
    }

    return `https://${href}:4433`;
}


export default ERR_OK = 0;
