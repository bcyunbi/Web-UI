import request from '@/utils/request'

export function fetchSubscriptionList() {
  return request({
    url: '/public/portfolio/sub',
    method: 'get'
  })
}
export function createSubscription(data) {
  console.log('createSubscription api::', data)
  return request({
    url: '/public/portfolio/sub',
    method: 'post',
    data
  })
}
export function modifySubscription(data) {
  console.log('modifySubscription api::', data)
  return request({
    url: '/public/portfolio/sub',
    method: 'put',
    data
  })
}
export function getSubscriptionChanges() {
  return request({
    url: '/public/portfolio/sub_change',
    method: 'get'
  })
}
