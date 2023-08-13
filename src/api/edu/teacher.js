import request from '@/utils/request'

export default {
    // 1、讲师列表(条件查询带分页)
    // current 当前页 ，limt每页记录数，teacherQuery查询条件
    getTeacherListPage(current,limt,teacherQuery){
        return request({
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limt}`,
            method: 'post',
            // teacherQuery条件对象，后端使用RequestBody获取数据
            // data表示把对象转换为json进行传递到接口里面
            data: teacherQuery
          })
    },
    //删除讲师
    deleteTeacherId(id){
        return request({
            url: `/eduservice/teacher/${id}`,
            method: 'delete',
          })
    },
    // 添加讲师
    addTeacher(teacher) {
        return request({
            url: `/eduservice/teacher/addTeacher`,
            method: 'post',
            data: teacher
        })
    },
    // 根据id查询讲师
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get',
        })
    },
    // 修改讲师
    updateTeacherInfo(teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher`,
            method: 'post',
            data: teacher
        })
    },
}
