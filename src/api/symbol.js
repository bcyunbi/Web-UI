import request from '@/utils/request'

export function fetchSymbolList() {
  return request({
    url: '/public/system/symbol',
    method: 'get'
  })
}

export function getSymbolSwitch() {
  return request({
    url: '/public/system/symbol_switch_event',
    method: 'get'
  })
}

export function postSymbolSwitch(data) {
  return request({
    url: '/public/system/symbol_switch_event',
    method: 'post',
    data
  })
}
