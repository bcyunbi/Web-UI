import request from '@/utils/request'

export function getMarketStatust() {
  return request({
    url: '/public/system/market_status',
    method: 'get'
  })
}

export function postMarketStatust(data) {
  return request({
    url: '/public/system/account',
    method: 'post',
    data
  })
}
