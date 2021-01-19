const BASE_URL = 'https://www.lizeqiang.top:8888'

const H_config = {}

H_config.API_addCampus_URL = '/campus/insert'
H_config.API_getAllCampus_URL = '/campus/selectAll'
H_config.API_updateCampusInfo_URL = '/campus/update'

H_config.API_auditShopUpdate_URL = '/managerInfo/auditShopUpdate'
H_config.API_statusGetShopUpdate_URL = '/managerInfo/statusGetShopUpdate'
H_config.API_reviewNewShop_URL = '/managerInfo/updateAuditStatus'
H_config.API_getShop_URL = '/managerInfo/managerGetShop'
H_config.API_shopIdGetCommodity_URL = '/managerInfo/shopIdGetCommodityManager'
H_config.API_shopIdGetShop_URL = '/managerInfo/shopIdGetShop'
H_config.API_shopIdGetShopLicense_URL = '/managerInfo/shopIdGetShopLicense'
H_config.API_updateAllRunStatus_URL = '/managerInfo/updateAllRunStatus'
H_config.API_updateTopStatus_URL = '/managerInfo/updateTopStatus'

H_config.API_getAllRider_URL = '/driverinfo/selectAll'
H_config.API_getRiderInfo_URL = '/driverinfo/selectById'
H_config.API_getRiderByStatus_URL = '/driverinfo/selectByStatus'
H_config.API_updateRiderInfo_URL = '/driverinfo/update'
H_config.API_updateReviewStatus_URL = '/driverinfo/updateStatus'
H_config.API_deleteRiderInfo_URL = '/driverinfo/delete'

H_config.API_checkUserHistory_URL = '/shareschool/selectByUid'
H_config.API_getAllShareSchool_URL = '/shareschool/selectAll'
H_config.API_getShareSchoolByStatus_URL = '/shareschool/selectByStatus'
H_config.API_updateShareSchoolStatus_URL = '/shareschool/updateStatus'

export {
  BASE_URL,
  H_config
}