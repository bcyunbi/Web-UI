import request from '@/utils/request'

export function getStreamOrder() {
  return request({
    url: '/public/system/stream_order',
    method: 'get'
  })
}
export function getCountOrder(data) {
  console.log('getCountOrder api::', data)

  return request({
    url: '/public/system/count_order',
    method: 'get',
    data
  })
}
export function getDetailOrder(data) {
  console.log('getDetailOrder api::', data)
  return request({
    url: '/public/system/detail_order',
    method: 'get',
    data
  })
}
