import request from '@/utils/request'

// 获取设备列表
export function getDeviceList() {
  return request ({
    method: 'post',
    url: '/device/list'
  })
}

// 删除设备
export function deleteDeviceRequest(deviceId) {
  return request ({
    method: 'post',
    url: '/device/delete',
    data: deviceId
  })
}

// 添加设备
export function addDeviceRequest(form) {
  return request ({
    method: 'post',
    url: '/device/add',
    data: form
  })
}

// 改变设备状态
export function changeStatusRequest(deviceId) {
  return request ({
    method: 'post',
    url: '/device/change',
    data: deviceId
  })
}

// 修改设备
export function upadteDeviceRequest(form) {
  return request ({
    method: 'post',
    url: '/device/updata',
    data: form
  })
}