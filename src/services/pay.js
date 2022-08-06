import request from '@/utils/request'
export const createOrder = (data) => {
  return request({
    method: 'Post',
    url: '/front/order/createOrder',
    data
  })
}
export const getPayInfo = (data) => {
  return request({
    method: 'Post',
    url: '/front/pay/getPayInfo',
    data
  })
}
export const getPayResult = (data) => {
  return request({
    method: 'post',
    url: '/front/pay/getResult',
    data
  })
}
