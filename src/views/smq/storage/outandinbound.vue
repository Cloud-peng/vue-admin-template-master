<template>
    <div class="app-container">
        <!-- 表格 -->
        <el-table :data="item" :row-style="{ height: '15px' }"
        :cell-style="{ padding: '2px' }" 
        fit stripe  style="width: 100%" 
        size:mini border highlight-current-row>
            <el-table-column fixed label="序号" type="index" width="50px"  align="center">
            </el-table-column>
            <el-table-column prop="location" label="位置" width="200px"  sortable/>
            <el-table-column prop="name" label="名称" width="200px" sortable/>
            <el-table-column prop="storageNumber" label="数量" width="auto" align="center" height:atuo sortable >
                <template slot-scope="scope">
                    <el-input v-model="scope.row.storageNumber"><template slot="append">{{ scope.row.packing }}</template></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="totalStorage" label="详细值" width="auto" align="center" height:atuo sortable >
                <template slot-scope="scope">
                    <el-input   v-model="scope.row.totalStorage" ><template slot="append">{{ scope.row.unit}}</template></el-input>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
        <el-button  @click="handlerCancle">取 消</el-button>
        <el-button  type="primary" @click="handlerSubmit">提 交</el-button>
        </span>
    </div>
</template>
<script>
import storageApi from '@/api/smq/storage';
export default {
    props:{
        list:{
            type:Array,
            required: true,
            default: [] //如果没有传值，list默认为[]
        },
        // 接受操作状态：出库or入库
        flag:{
            type:String,
            required: true,
            default: '' //如果没有传值，默认为''
        }
    },
    watch: {
        // 监视父组件传过来的list，当有变化时重新给item赋值
        list: {
        handler () { //这是vue的规定写法，当watch的值发生变化的时候，就会触发这个handler，这是vue内部帮你做的事情
            this.item=JSON.parse(JSON.stringify(this.list))
        },
        deep: true,  // 可以深度检测到 list 对象的属性值的变化
        immediate: true //刷新加载  立马触发一次handler
        },
   
  },

    // 写核心代码的位置
    data() {
        
        // 定义变量和初始值
        return {
            item:{
                loginInfo:{}     
            },
            oprationPackageNumber:[],
            oprationDetailNumber:[],
            dialogTableVisible: false,
            dialogFormVisible: false,
            formLabelWidth: 'auto',
        }
    },
    created() {
        // 对象地址引用修改会导致父组件显示值修改
        // // this.item=this.list
        // 使用深度复制，避免子组件的内容修改导致父组件的值改变
        this.item=JSON.parse(JSON.stringify(this.list))
        // Store中获取登录用户的相关信息并复制给item
        this.item.loginInfo=this.$store.loginInfo
        console.log(this.item);
    },
    methods: {
        handlerCancle(){

            this.$emit('changedialogInOutFormVisible');

        },
        handlerSubmit(){

            storageApi.inOroutStorage(this.item,this.flag)
                .then(response => {//添加成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.$emit('changedialogInOutFormVisible');
                    // 回到列表页面  路由跳转
                    this.$router.push({ path: '/storagemanager/list' })
                }).catch(response => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })

           

        }
      
    }
}
</script>
<style>
.dialog-footer{
    margin-top: 1%;
    margin-left: 80%;
    display: inline-block;
}
</style>