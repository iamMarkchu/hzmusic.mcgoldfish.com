import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: {
      grant_type: 'password',
      client_id: 2,
      client_secret: '8JEtJ6AVFrN5eNHFaavPaPLFT8HiVIlqXlERaJo2',
      scope: '',
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/user',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
