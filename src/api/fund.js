import request from '@/utils/request'

export function fetchAccountList() {
  return request({
    url: '/public/portfolio/fund',
    method: 'get'
  })
}
export function createAccount(data) {
  console.log('createAccount api::', data)
  return request({
    url: '/public/portfolio/fund',
    method: 'post',
    data
  })
}