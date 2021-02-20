import axios from './axios'
import { H_config } from './config'

// 新增校区
export function addCampus(data) {
  return axios({
    method: 'post',
    url: H_config.API_addCampus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 获取所有校区
export function getAllCampus(data) {
  return axios({
    url: H_config.API_getAllCampus_URL
  })
}

// 修改校区信息
export function updateCampusInfo(data) {
  return axios({
    method: 'put',
    url: H_config.API_updateCampusInfo_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除校区
export function deleteCampus(data) {
  return axios({
    method: 'delete',
    url: H_config.API_deleteCampus_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 图片上传
export function updatePhoto(data) {
  return axios({
    method: 'post',
    url: H_config.API_updatePhoto_URL, 
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 多图片上传
export function updatePhotos(data) {
  return axios({
    method: 'post',
    url: H_config.API_updatePhotos_URL, 
    data: data,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

// 查询轮播图
export function selectPhotos(data) {
  return axios({
    method: 'post',
    url: H_config.API_selectPhotos_URL, 
    data: data,
  })
}

// 删除图片
export function deletePhoto(data) {
  return axios({
    method: 'post',
    url: H_config.API_deletePhoto_URL, 
    data: data,
  })
}

// 根据订单号查询订单
export function getOrderByOrderNum(data) {
  return axios({
    method: 'post',
    url: H_config.API_getOrderByOrderNum_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取当前抽成比
export function getNewestTakePercentage() {
  return axios({
    method: 'post',
    url: H_config.API_getNewestTakePercentage_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 设置抽成比
export function setTakePercentage(data) {
  return axios({
    method: 'post',
    url: H_config.API_setTakePercentage_URL, 
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取抽成修改记录
export function getProfitHistory() {
  return axios({
    method: 'post',
    url: H_config.API_getProfitHistory_URL,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
