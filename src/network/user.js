import axios from './axios'
import { H_config } from './config'

// 根据审核状态查询校园圈
export function getShareSchoolByStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_getShareSchoolByStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 修改审核状态
export function updateShareSchoolStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_updateShareSchoolStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 设置快递规格
export function getExpressSpec(data) {
  return axios({
    params: data,
    url: H_config.API_getExpressSpec_URL, 
  })
}

// 设置快递规格
export function setExpressSpec(data) {
  return axios({
    method: 'post',
    url: H_config.API_setExpressSpec_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/json',
    }
  })
}

// 删除快递规格
export function deleteExpressSpec(data) {
  return axios({
    url: H_config.API_deleteSpec_URL, 
    params: data,
  })
}

// 获取所有快递订单
export function listAllOrder(data) {
  return axios({
    method: 'post',
    url: H_config.API_listAllOrder_URL, 
    data: JSON.stringify(data),
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    }
  })
}

// 根据订单号查询快递订单
export function selectOrderByOrderNumber(data) {
  return axios({
    method: 'post',
    url: H_config.API_selectOrderByOrderNumber_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}