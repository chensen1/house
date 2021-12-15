import request from '@/utils/request'

// 卖家挂牌房屋信息列表
export function getHouseList (data) {
  return request({
    url: `/seller/houseList`,
    method: 'POST',
    data
  })
}
// 用户信息
export function getUserInfo (data) {
  return request({
    url: `/userinfo?uid=${data.uid || ''}&idNum=${data.idNum || ''}`,
    method: 'GET'
  })
}

// 卖家确认意向买家
export function confirmBuyer (data) {
  return request({
    url: `/seller/confirmBuyer`,
    method: 'POST',
    data
  })
}

// 买家选定房源
export function intendBuy (data) {
  return request({
    url: `/buyer/intendBuy`,
    method: 'POST',
    data
  })
}

// 计算税费接口
export function getCalcTax (data) {
  return request({
    url: `/calcTax?role=${data.role || ''}&uid=${data.uid || ''}&hid=${data.hid || ''}`,
    method: 'GET'
  })
}

// 更新房屋信息
export function updataHouseInfo (data) {
  return request({
    url: `/seller/updateHouse`,
    method: 'POST',
    data
  })
}
// 更新房屋状态
export function updataHouseStatue (data) {
  return request({
    url: `/updateStatus`,
    method: 'POST',
    data
  })
}
