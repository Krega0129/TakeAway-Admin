const BASE_URL = 'https://www.lizeqiang.top:8888'

const H_config = {}

// 平台
H_config.STATECODE_campus_SUCCESS = 3200
H_config.API_addCampus_URL = '/campus/insert'
H_config.STATECODE_addCampus_FAILED = 1510

H_config.API_getAllCampus_URL = '/campus/selectAll'
H_config.STATECODE_getAllCampus_FAILED = 2513

H_config.API_updateCampusInfo_URL = '/campus/update'
H_config.STATECODE_updateCampusInfo_FAILED = 1506

H_config.API_deleteCampus_URL = '/campus/delete'

H_config.API_updatePhoto_URL = '/managerInfo/updatePhoto'
H_config.API_updatePhotos_URL = '/managerInfo/updatePhotos'
H_config.STATECODE_updatePhoto_SUCCESS = 1205
H_config.STATECODE_updatePhoto_NULL_FAILED = 1516   // 文件为空
H_config.STATECODE_updatePhoto_TYPE_FAILED = 1517   // 文件类型错误
H_config.STATECODE_updatePhoto_FAILED = 1518        // 文件上传失败

H_config.API_selectPhotos_URL = '/managerInfo/selectPhotos'
H_config.API_deletePhoto_URL = '/managerInfo/deletePhoto'
H_config.STATECODE_selectPhotos_NULL_FAILED = 1500   // 参数为空（删除图片适用）
// 根据订单编号查询订单
H_config.API_getOrderByOrderNum_URL = '/order/selectAllOrderInfo'
H_config.STATECODE_getOrderByOrderNum_SUCCESS = 3208
H_config.STATECODE_getOrderByOrderNum_FAILED = 3555

// 店铺
H_config.STATECODE_get_SUCCESS = 1200 // 查询成功
H_config.STATECODE_getNull_FAILED = 1201  // 查询结果为空
H_config.STATECODE_update_SUCCESS = 1202  // 修改成功
H_config.STATECODE_getShopInfo_FAILED = 1503    // 店铺信息结果为空（除店铺商品）
// 审核店铺修改信息
H_config.API_auditShopUpdate_URL = '/managerInfo/auditShopUpdate'
H_config.STATECODE_review_SUCCESS = 1207
// 获取店铺修改详情
H_config.API_statusGetShopUpdate_URL = '/managerInfo/statusGetShopUpdate'
// 审核新店
H_config.API_reviewNewShop_URL = '/managerInfo/updateAuditStatus'
// 店铺列表展示
H_config.API_getShop_URL = '/managerInfo/selectShops'
// 查询店铺商品信息
H_config.API_shopIdGetCommodity_URL = '/managerInfo/selectShopCommodity'
// 店铺详细信息
H_config.API_shopIdGetShop_URL = '/managerInfo/selectShopInfo'
// 店铺证书
H_config.API_shopIdGetShopLicense_URL = '/managerInfo/selectShopLicense'
// 修改店铺营业状态
H_config.API_updateAllRunStatus_URL = '/managerInfo/updateAllRunStatus'
// 修改店铺置顶
H_config.API_updateTopStatus_URL = '/managerInfo/updateTopStatus'


// 骑手
H_config.STATECODE_rider_SUCCESS = 3200
H_config.API_getAllRider_URL = '/driverinfo/selectAll'
H_config.API_getRiderInfo_URL = '/driverinfo/selectById'
H_config.API_getRiderByStatus_URL = '/driverinfo/selectByStatus'  // 没有成功状态码
H_config.API_updateRiderInfo_URL = '/driverinfo/update'
H_config.API_updateReviewStatus_URL = '/driverinfo/updateStatus'
H_config.API_deleteRiderInfo_URL = '/driverinfo/delete'

// 分享校园
H_config.API_checkUserHistory_URL = '/shareschool/selectByUid'
H_config.STATECODE_checkUserHistory_SUCCESSSTATUS = 2217
H_config.API_getAllShareSchool_URL = '/shareschool/selectAll'
H_config.STATECODE_getAllShareSchool_SUCCESSSTATUS = 2222
H_config.API_getShareSchoolByStatus_URL = '/shareschool/selectByStatus'
H_config.STATECODE_getShareSchoolByStatus_SUCCESSSTATUS = 2218
H_config.API_updateShareSchoolStatus_URL = '/shareschool/updateStatus'
H_config.STATECODE_updateShareSchoolStatus_SUCCESSSTATUS = 2220


H_config.API_test_URL = '/modifyCommodity/updateHead'

export {
  BASE_URL,
  H_config
}