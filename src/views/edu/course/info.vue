<template>
    <div class="app-container">
        <h2 style="text-align: center;">发布新课程</h2>
        <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
            <el-step title="填写课程基本信息" />
            <el-step title="创建课程大纲" />
            <el-step title="提交审核" />
        </el-steps>
        <el-form label-width="120px">
            <el-form-item label="课程标题">
                <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视"></el-input>
            </el-form-item>
            <!-- 所属分类 TODO -->
            <!-- 课程讲师 TODO -->
            <el-form-item label="总课时">
                <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="课时数" />
            </el-form-item>
            <!-- 课程简介 TODO -->
            <el-form-item label="课程简介">
                <el-input v-model="courseInfo.description" placeholder=""></el-input>
            </el-form-item>
            <!-- 课程封面 TODO -->
            <el-form-item label="课程价格">
                <el-input-number :min="0" v-model="courseInfo.price" controls-position="right"
                    placehold="价格"></el-input-number>?
            </el-form-item>
            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import course from '@/api/edu/course'

export default {
    data() {
        return {
            saveBtnDisabled: false,
            courseInfo: {
                title: '',
                subjectId: '',
                teacherId: '',
                lessonNum: 0,
                description: '',
                cover: '',
                price: 0
            }
        };
    },
    created() {

    },
    methods: {
        saveOrUpdate() {
            course.addCourseInfo(this.courseInfo)
                .then(response=>{
                    // 提示
                    this.$message({
                    type: 'success',
                    message: '添加课程信息成功!'
                });
            // 跳转到第二步
            this.$router.push({ path: '/course/chapter/1' })
            })
           
        }
    },
}
</script>
