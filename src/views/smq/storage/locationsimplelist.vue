<template>
    <div class="app-container">
        <!--查询表单-->
        <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="locationQuery.location"
                    placeholder="位置名称" />
            </el-form-item>
            <el-form-item>
                <el-input @blur="getList()" @keyup.enter.native="getList()" v-model="locationQuery.basement" placeholder="所属基地" />
            </el-form-item>

            <el-form-item>
                <el-select clearable  v-model="locationQuery.isUseful" placeholder="是否禁用"    >
                        <el-option :value="1" label="启用" align="center" />
                        <el-option :value="0" label="禁用" align="center" />
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="修改时间">
                <el-date-picker v-model="locationQuery.begin" type="datetime" placeholder="选择开始时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="locationQuery.end" type="datetime" placeholder="选择截止时间"
                    value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
            </el-form-item> -->
            <el-button type="primary" icon="el-icon-search"  @click="getList()">查询</el-button>
            <el-button type="default" icon="el-icon-delete"  @click="resetData()">清空</el-button>   
        </el-form>
        
        <!-- 表格 -->
        <el-table :data="list" :row-style="{ height: '15px' }"
        :cell-style="{ padding: '2px' }" 
        fit stripe  style="width: 100%" ref="selectTable"
        @selection-change="handleSelectionChange" @select="select" 
        size:mini border highlight-current-row>
        <el-table-column align="center" type="selection" width="50px" ></el-table-column>
            <el-table-column fixed label="序号" type="index" width="50px"  align="center">
                <!-- <template slot-scope="scope">
                    {{ (page - 1) * limit + scope.$index + 1 }}
                </template> -->
            </el-table-column>
            <el-table-column prop="location" label="位置名称" width="auto" align="center" height:atuo sortable >
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="small"  v-model="scope.row.location" required></el-input>
                    </span>
                    <span v-else>{{scope.row.location}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="basement" label="所属基地" width="auto" align="center" sortable>
                <template slot-scope="scope">
                    <span v-if="scope.row.show">
                        <el-input size="small"  v-model="scope.row.basement"></el-input>
                    </span>
                    <span v-else>{{scope.row.basement}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="isUseful" label="是否禁用" width="auto" align="center" sortable>
                <template slot-scope="scope"  >
                    <span v-if="scope.row.show" >
                        <el-select size="small"  v-model="scope.row.isUseful" align="center"  >
                            <el-option :value="1" label="启用" align="center" />
                            <el-option :value="0" label="禁用" align="center" />
                        </el-select>
                    </span>
                    <span v-else  >{{ scope.row.isUseful === 0 ? '禁用' : '启用' }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="gmtModified" label="更新时间" width="auto" sortable align="center" />
        </el-table>
        <!-- 分页 -->
        <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper" @current-change="getList" />
    </div>
</template>
<script>
import locationApi from '@/api/smq/location'
export default {
    // 写核心代码的位置
    data() {
        // 定义变量和初始值
        return {
            list: null,//查询之后接口返回集合
            page: 1,//当前页
            limit: 20,//每页记录数
            total: 0,//总记录数
            locationItem:{
                id:'',
                location:'',   
                basement:'',
                isUseful:''
            },
            locationQuery: {

            },//条件封装对象
            dialogTableVisible: false,
            dialogFormVisible: false,
            // 封装新增位置对象
            addlocationform: {
                location: '',
                basement: '',
                isUseful: ''
            },
            formLabelWidth: 'auto',
             // 选中行位置对象
             selectrowlocation:{}
        }
    },
    created() {
        // 渲染之前执行，一般调用method定义的方法
        // 调用
        this.getList()
        

    },
    methods: {
        // 创建具体的方法，调用locationApi.js定义的方法
        getList(page = 1) {
            this.page = page
            locationApi.getlocationListPage(this.page, this.limit, this.locationQuery)
                .then(response => {//请求成功
                    // response接口返回的数据

                    this.list = response.data.rows
                    this.total = response.data.total
                })
                .catch(error => {
                    console.error()
                })
        },
        resetData() {
            // 清空表单中条件输入项
            this.locationQuery = {}
            // 重新查询数据
            this.getList()
        },

         // 根据位置id查询的方法
         getlocationInfo(id) {
            locationApi.getInfo(id)
                .then(response => {
                    this.locationItem=response.data.item
                })
        },
        edit(row) {
            // 调用根据位置id查询的方法为locationItem赋值
            this.getlocationInfo(row.id)
            // 切换行是否可编辑状态
            row.show = row.show ? false : true
            // 根据编辑状态判断是编辑还是提交
            if (!row.show) {
                // 比较编辑后的结果和locationItem， 若有变化才提交更改
                if (!(this.locationItem.location==row.location && this.locationItem.basement==row.basement && this.locationItem.isUseful==row.isUseful)) {
                    locationApi.updateLocationInfo(row)
                        .then(response => {
                            this.getList()
                            this.$message({
                                type: 'success',
                                message: '修改成功!'
                            });
                            // 提交更改后清空locationItem的值
                            this.locationItem={}
                        }
                    ).catch(response => {
                        this.$message({
                                type: 'error',
                                message: '保存失败'
                            });
                    })
                    
                }else{
                    // 比较编辑后的结果和locationItem， 若无变化直接返回列表
                    return this.getList()
                }       
            }      
        },
        addlocation(){
            locationApi.addLocation(this.addlocationform)
                .then(response => {//添加成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    this.dialogFormVisible = false
                    // 回到列表页面  路由跳转，不使用路由跳转方式，此方式路径未变化，浏览器不会请求数据，列表数据不会刷新
                    // this.$router.push({ path: '/locationmanager/list' })
                    // 强制返回请求刷新列表
                    this.addlocationform.location=''
                    this.getList()
                    //清空   addlocationform
                       
                }).catch(response => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })
        },
         // 处理单选事件
      select(selection, row) {
            if (selection.length > 1) {
                const del_row = selection.shift();
                this.$refs.selectTable.toggleRowSelection(del_row, false);
            }
            this.selectrowlocation=row
            // 
            this.$emit('changedialogLocationTableVisible')
            this.$emit('changeSelectLocation',this.selectrowlocation)
        },
      // 处理多选事件
      handleSelectionChange(val) {
        //   当选中数量大于1时，限制选中数量并弹出提示
        if(val.length>1){
            // 处理多余的选中项目
            let tempArr=val;
            if(tempArr.length!=0){
                // 取消多余项目的选中框
                tempArr.forEach(ele=>{
                    this.$refs.selectTable.toggleRowSelection(ele,false)
                })     
            } 
           // 弹出提示信息
        this.$message({
                        type: 'warning',
                        message: '最多只能选中1条'
                    })        
        }
      },


    }
}
</script>