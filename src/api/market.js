import request from '@/utils/request'

export function getMarketStatus() {
  return request({
    url: '/public/system/market_status',
    method: 'get'
  })
}

export function postMarketInfo(data) {
  return request({
    url: '/public/system/market_status',
    method: 'post',
    data
  })
}
