import request from '@/utils/request'

export function reqUserInfo(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

