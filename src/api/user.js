import request from '@/utils/request'
const url = '/sys'
export function login(data) {
  return request({
    url: `${url}/login`,
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: `${url}/profile`,
    method: 'post'
  })
}

export function getUserDetailById(id) {
  return request({
    url: `${url}/user/${id}`
  })
}
