import axios from './axios.js'
import { H_config } from './config.js'

// 审核店铺修改信息
export function auditShopUpdate(data) {
  return axios({
    method: 'post',
    url: H_config.API_auditShopUpdate_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 
export function reviewDetails(data) {
  return axios({
    method: 'post',
    url: H_config.API_statusGetShopUpdate_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 新店注册
export function reviewNewShop(data) {
  return axios({
    method: 'post',
    url: H_config.API_reviewNewShop_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 获取商铺列表
export function getShop(data) {
  return axios({
    method: 'post',
    url: H_config.API_getShop_URL, 
    data: data,
  })
}

// 根据商铺id获取商品信息
export function shopIdGetCommodity(data) {
  return axios({
    method: 'post',
    url: H_config.API_shopIdGetCommodity_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 获取店铺详细信息
export function shopIdGetShop(data) {
  return axios({
    method: 'post',
    url: H_config.shopIdGetShop, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 获取店铺执照
export function shopIdGetShopLicense(data) {
  return axios({
    method: 'post',
    url: H_config.API_shopIdGetShopLicense_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 店铺同一打烊
export function updateAllRunStatus(data) {
  return axios({
    method: 'post',
    url: H_config.updateAllRunStatus, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 修改店铺置顶状态
export function updateTopStatus(data) {
  return axios({
    method: 'post',
    url: H_config.updateTopStatus, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

