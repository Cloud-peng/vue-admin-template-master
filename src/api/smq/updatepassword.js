import request from '@/utils/request'

export default {
    // 更新密码
    updatepassword(data){
        return request({
            url: `/smq/memberservice/updatepassword`,
            method: 'post',
            // data表示把对象转换为json进行传递到接口里面
            data
          })
    },

}
