import request from '@/utils/request'

export default {
    // 1、库存操作记录列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，itemQuery查询条件
    getRecordListPage(current,limt,recordQuery){
        return request({
            url: `/smq/recordservice/pageRecordCondition/${current}/${limt}`,
            method: 'post',
            // storageQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: recordQuery
          })
    }
    
}
