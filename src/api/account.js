import request from '@/utils/request'

export function fetchAccountList() {
  return request({
    url: '/public/portfolio/account',
    method: 'get'
  })
}
export function createAccount(data) {
  console.log('createAccount api::', data)
  return request({
    url: '/public/portfolio/account',
    method: 'post',
    data
  })
}
export function modifyAccount(data) {
  console.log('modifyAccount api::', data)
  return request({
    url: '/public/portfolio/account',
    method: 'put',
    data
    // id 不能為0
  })
}
