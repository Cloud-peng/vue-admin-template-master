<template>
    <div class="app-container">
        <!-- 类目信息 -->
        <el-form label-width="auto"  :rules="rules"  size="middle" :model="item" ref="item">
            <el-row :gutter="20" class="row-bg" >
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="类目名称"  prop="name">
                            <el-input  @keyup.enter.native="changedialogItemTableVisible" v-model="item.name"  :disabled="isAdd" >
                                <el-button @click.native="changedialogItemTableVisible" slot="append" icon="el-icon-search"></el-button>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple-light">
                        <el-form-item label="类别" >
                            <el-input v-model="item.category"   :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="等级">
                            <el-input v-model="item.grade"   :disabled="true"></el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="品牌"  prop="brand">
                            <el-input v-model="item.brand" :disabled="true" />
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>

            <el-row :gutter="20" class="row-bg">
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="规格" prop="specification">
                            <el-input v-model.number="item.specification"  :disabled="true" >
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-form-item label="单位">
                            <el-input v-model="item.unit"  :disabled="true" >
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <el-form-item label="包装方式">
                            <el-input  v-model="item.packing"  :disabled="true" >
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple"> 
                        <el-form-item label="批号" >
                            <el-input v-model="item.batchNumber" :disabled="true" />
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple"> 
                        <el-form-item label="CAS号" >
                            <el-input v-model="item.casNumber"  :disabled="true"/>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="100" class="row-bg">
            
                <el-col :span="8">
                    <div class="grid-content bg-purple">
                        <el-form-item label="存放数量" 
                        prop="storageNumber"
                        >
                            <el-input v-model.number="item.storageNumber" >
                                <template slot="append">{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="7">
                    <div class="grid-content bg-purple">
                        <el-form-item label="库存预警值"  
                        prop="alertNumber">
                            <el-input v-model.number="item.alertNumber"  :disabled="true" >
                                <template slot="append" >{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="最大允许库存" 
                        prop="allowStorage">
                            <el-input v-model.number="item.allowStorage"  :disabled="true" >
                                <template slot="append">{{ item.packing }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="row-bg">
                <el-col :span="7">
                    <div class="grid-content bg-purple">
                        <el-form-item label="存放总量"  
                        prop="totalStorage">
                            <el-input   v-model="item.totalStorage" >
                                <template slot="append">{{ item.unit }}</template>
                            </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="物质状态">
                            <el-input v-model="item.matter" :disabled="true"/>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-form-item label="存放位置"  
                        prop="location">
                        <el-input  @keyup.enter.native="changedialogLocationTableVisible" v-model="item.location">
                            <el-button @click.native="changedialogLocationTableVisible" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                        </el-form-item>
                    </div>
                </el-col>
                <el-col :span="5">
                    <div class="grid-content bg-purple">
                        <el-form-item label="所属基地"  
                        prop="basement">
                            <el-input v-model="item.basement"  :disabled="true"/>
                            </el-form-item>
                    </div>
                </el-col>
            </el-row>
            
            <el-form-item  >
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate" >保存</el-button>
            </el-form-item>
        </el-form>

        <!-- 弹窗式表单 -->
        <el-dialog title="修改类目信息" :visible.sync="dialogItemTableVisible"  label-width="auto">
            <ItemSimpleListVue   @changedialogItemTableVisible="changedialogItemTableVisible" @changeSelectItem="hanldlerGetItem" ></ItemSimpleListVue>
        </el-dialog>

        <el-dialog title="修改位置信息" :visible.sync="dialogLocationTableVisible"  label-width="auto">
            <LocationSimpleListVue   @changedialogLocationTableVisible="changedialogLocationTableVisible" @changeSelectLocation="hanldlerGetLocation" ></LocationSimpleListVue>
        </el-dialog>
    </div>
</template>
<script>


import storageAPI from '@/api/smq/storage'
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'
import Vue from 'vue';
Vue.component('ItemSimpleListVue', () => import('@/views/smq/storage/itemsimplelist.vue'))
Vue.component('LocationSimpleListVue', () => import('@/views/smq/storage/locationsimplelist.vue'))
export default {
    components: { ImageCropper, PanThumb},
    data() {
        //验证数值(非负值，最多两位小数)
        const validateValidity = (rule, value, callback) => {
            if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
                callback(new Error('请输入非负数,最多能输入两位小数'));
            } else {
                callback();
            }
        };
        //验证数值(非负整数)
        const checkMinVal = (rule, value, callback) => {
            if (!/(^[0-9]\d*$)/.test(value)) {
                callback(new Error('请输入非负整数'));
            } else {
                callback();
            }
        };
        return {
            item: {
                id:'',
                itemId:'',
                name: '',
                category: '',
                grade: '',
                brand: '',
                specification: '0',
                unit: '',
                packing: '',
                batchNumber: '',
                casNumber: '',
                matter: '',
                storageNumber: 0,
                totalStorage: 0.0000,
                alertNumber: 1,
                allowStorage: 10,
                locationId:'',
                location:'',
                basement:''
            },
            isAdd:'',   
            rules:{
                name:[
                    { required: true, message: '类目名称不能为空'},
                    { trigger: 'blur'}    
                ],
              
                storageNumber:[
                    { required: true, message: '存放数量不能为空'},
                    { validator: checkMinVal, trigger: 'blur'}
                ],
                alertNumber:[
                    { validator: checkMinVal, trigger: 'blur'}
                ],
                allowStorage:[
                    { validator: checkMinVal, trigger: 'blur'}  
                    
                ],
                totalStorage:[
                    { required: true, message: '存放总量不能为空'},
                    { validator: validateValidity, trigger: 'blur'}                  
                ],
                location:[
                { required: true, message: '请输入存放位置'},
                { trigger: 'blur'} 
                ]

            },

            // 弹出式类目列表
            dialogItemTableVisible: false,
            // 弹出式位置列表
            dialogLocationTableVisible: false,
            dialogFormVisible: false,
            // 
            // 上传弹框组件是否显示
            imagecropperShow: false,
            imagecropperKey: 0,//上传组件key值
            BASE_API: process.env.VUE_APP_BASE_API,//获取dev.env.js里面的地址
            saveBtnDisabled: false//保存按钮是否禁用
        };
    },
    created() {//页面渲染前执行
        this.init()
    },
    watch: {//监听
        $route(to, from) {//路由变换方式，路由发生变化，就会执行
            this.init()
        }
    },
    methods: {
        close() {//关闭上传弹框的方法
            this.imagecropperShow = false
            // 上传组件初始化
            this.imagecropperKey = this.imagecropperKey + 1
        },
        // 上传成功的方法
        cropSuccess(data) {
            this.imagecropperShow = false
            // 上传成功之后接口返回图片地址
            this.teacher.avatar = data.url

        },
        init() {
            // 判断路径是否有id值
            if (this.$route.params && this.$route.params.id) {
                // 从路径获取id值
                const id = this.$route.params.id
                this.getItemInfo(id)
                this.isAdd=true
            } else {
                // 清空表单
                this.item = {}
                this.isAdd=false
            }
        },
        // 根据库存类目id查询的方法
        getItemInfo(id) {
            storageAPI.getStorage(id)
                .then(response => {
                    this.item = response.data.storageVO
                })
        },
        saveOrUpdate() {
            // 判断是修改还是添加
            // 根据item是否有id
            if (!this.item.id) {
                this.saveItem()
            } else {
                this.updatedItem()
            }
        },
        // 修改库存类目的方法
        updatedItem() {
            storageAPI.updateStorageInfo(this.item)
                .then(response => {
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '修改成功!'
                    });
                    // 回到列表页面  路由跳转
                    this.$router.push({ path: '/storagemanager/list' })
                })
                .catch(error => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })
        },
        // 添加库存的方法
        saveItem() {
            storageAPI.addStorage(this.item)
                .then(response => {//添加成功
                    // 提示信息
                    this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    // 回到列表页面  路由跳转
                    this.$router.push({ path: '/storagemanager/list' })
                }).catch(response => {
                    this.$message({
                        type: 'error',
                        message: '保存失败'
                    });
                })
        },
        // 响应子组件传递的Item
        hanldlerGetItem(val){
            this.item.itemId=val.id,
            this.item.name=val.name,
            this.item.category=val.category,
            this.item.grade=val.grade,
            this.item.brand=val.brand,
            this.item.specification=val.specification,
            this.item.unit=val.unit,
            this.item.packing=val.packing,
            this.item.batchNumber=val.batchNumber,
            this.item.casNumber=val.casNumber,
            this.item.matter=val.matter,
            this.item.alertNumber=val.alertNumber
            this.item.allowStorage=val.allowStorage
        },
        // 响应子组件传递的location
        hanldlerGetLocation(val){
            this.item.locationId=val.id
            this.item.location=val.location,
            this.item.basement=val.basement
        },
        // 修改弹窗式类目列表子组件显示状态
        changedialogItemTableVisible(){
            this.dialogItemTableVisible = !this.dialogItemTableVisible
          
        },
        // 修改弹窗式位置列表子组件显示状态
        changedialogLocationTableVisible(){
            this.dialogLocationTableVisible = !this.dialogLocationTableVisible
        }
        

    },
}
</script>
<style>
.el-row {
    margin-bottom: 10px;
    &:last-child {
        margin-bottom: 0;
    }
}

.el-col {
    border-radius: 4px;
}

.bg-purple-dark {
    background: #99a9bf;
}

.bg-purple {
    background: #d3dce6;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 6px;
    min-height: 36px;
    
}

.row-bg {
    padding: 20px 0;
    background-color: #f9fafc;
}
.el-form-item__label-wrap {
  margin-left: 0px !important;
 
}
</style>