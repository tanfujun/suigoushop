import request from '@/utils/request8510'

//品牌管理列表数据
export const reqGetTrademarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

//添加品牌或者修改品牌
export const reqAddTrademark = (TrademarkInfo) => {
    if (TrademarkInfo.id) {
        return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: TrademarkInfo })
    } else {
        return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: TrademarkInfo })
    }

}

//删除品牌
export const reqRemoveTrademark = (id) => request({ url: `/admin/product/baseTrademark/remove/${id}`, method: 'delete'})

//通过指定id查询某个品牌
export const reqGetTrademark = (id) => request({ url: `/admin/product/baseTrademark/get/${id}`, method: 'post', data: TrademarkInfo })

//搜索关键字查询品牌信息
export const reqSearchTrademark = (keyword) => request({ url: `/admin/product/baseTrademark/findBaseTrademarkByKeyword/${keyword}`, method: 'post', data: TrademarkInfo })