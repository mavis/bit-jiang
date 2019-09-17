/**
 * api接口，切换HOST即可切换本地模拟api或线上api
 */
const HOST = '';
const api = {
    'lotteryDateList':'/lottery/number',//get开奖日期列表
    'lotteryList':'/lottery',//get 往期中将列表
    'myLotteryList':'/lottery/',//我的投注记录列表
    'balance':'/balance',//奖池总金额
}

for (let [key, value] of Object.entries(api)) {
    api[key] = HOST + value;
}

export {
    api
};