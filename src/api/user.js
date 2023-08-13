import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/smq/memberservice/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/smq/memberservice/getLoginInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  return request({
    url: '/smq/memberservice/logout',
    method: 'post',
    data
  })
}
