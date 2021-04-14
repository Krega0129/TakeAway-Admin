import axios from './axios'
import { H_config } from './config'

// 查出所有骑手信息
export function getAllRider(data) {
  return axios({
    method: 'post',
    url: H_config.API_getAllRider_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 查出骑手信息
export function getRiderInfo(data) {
  return axios({
    method: 'post',
    url: H_config.API_getRiderInfo_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 根据审核状态查询骑手
export function getRiderByStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_getRiderByStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 修改骑手信息
export function updateRiderInfo(data) {
  return axios({
    method: 'post',
    url: H_config.API_updateRiderInfo_URL, 
    data: data
  })
}

// 修改骑手审核状态
export function updateReviewStatus(data) {
  return axios({
    method: 'post',
    url: H_config.API_updateReviewStatus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 修改骑手审核状态
export function selectById(data) {
  return axios({
    url: H_config.API_selectById_URL, 
    params: data
  })
}

// 删除骑手信息
export function deleteRiderInfo(data) {
  return axios({
    method: 'delete',
    url: H_config.API_deleteRiderInfo_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      //'Content-Type': 'application/json',
    }
  })
}

// 删除骑手信息
export function selectRiderOrderInfoByDate(data) {
  return axios({
    method: 'post',
    url: H_config.API_selectRiderOrderInfoByDate_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}