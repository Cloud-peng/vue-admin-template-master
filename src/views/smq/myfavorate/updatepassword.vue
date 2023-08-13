<template>
   <el-dialog title="修改密码" :visible="dialogVisible" width="30%">
                <div >
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldPassword">
                    <el-input type="password" v-model="ruleForm.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                    <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认新密码" prop="checkedNewPassword">
                    <el-input type="password" v-model="ruleForm.checkedNewPassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form> 
                </div>
                <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = !dialogVisible ">取 消</el-button>
                        <el-button type="primary" @click="submitForm('ruleForm')" >提交</el-button>
                </span>       
                
    </el-dialog>
</template>
<script>
import updatepswAPI from '@/api/smq/updatepassword'
export default {
    data() {

      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.oldPassword.length >=6) {
            this.$refs.ruleForm.validateField('newPassword');
          }else{
            callback(new Error('密码长度不得少于6个字符'));
          }
          callback();
        }
      };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (value.length >=6) {
            this.$refs.ruleForm.validateField('checkedNewPassword');
          }else{
            callback(new Error('密码长度不得少于6个字符'));
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入新密码'));
        } else if (value !== this.ruleForm.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      ruleForm: {
        oldPassword: '',
        newPassword: '',
        checkedNewPassword: ''
        },
      rules: {
        oldPassword: [
            { validator: validatePass, trigger: 'blur' }
          ],
          newPassword: [
            { validator: validatePass1, trigger: 'blur' }
          ],
          checkedNewPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          
        },
      dialogVisible:true

    };
  },
  created() {
   
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            updatepswAPI.updatepassword(this.ruleForm).then(
                response => {//修改成功
                        this.$message({
                            // 提示信息
                            type: 'success',
                            message: '密码修改成功，请重新登录!'
                        })
                        // 退出登录
                        this.logout();
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '密码修改失败，请重试.'
                        });
            }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    //   退出登录并返回主页
    async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login`)
    },
  }
}
</script>