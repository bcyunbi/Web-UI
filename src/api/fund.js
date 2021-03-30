import request from '@/utils/request'

export function fetchFundList() {
  return request({
    url: '/public/portfolio/fund',
    method: 'get'
  })
}
export function createFund(data) {
  console.log('createAccount api::', data)
  return request({
    url: '/public/portfolio/fund',
    method: 'post',
    data
  })
}
