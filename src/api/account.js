import request from '@/utils/request'

export function fetchAccountList() {
  return request({
    url: '/public/portfolio/account',
    method: 'get'
  })
}
