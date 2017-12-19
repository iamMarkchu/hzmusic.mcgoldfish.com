import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/music/',
    method: 'get',
    params
  })
}
export function fetchMusic(params) {
  return request({
    url: '/music/' + params.id,
    method: 'get'
  })
}

export function createMusic(params) {
  return request({
    url: '/music/',
    method: 'post',
    params
  })
}

export function updateMusic(params) {
  return request({
    url: '/music/' + params.id,
    method: 'put',
    params
  })
}
