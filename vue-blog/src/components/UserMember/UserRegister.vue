<template>
<div>
    <breadnavigation/>

    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户新增</span>
        </div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

            <el-form-item label="姓名" prop="name"  style="width: 300px; height: 50px">
                <el-input v-model="ruleForm.name"/>
            </el-form-item>

            <el-form-item label="性别" prop="sex" style="width: 300px; height: 50px">
                <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                    <el-option label="男" value="man"/>
                    <el-option label="女" value="woman"/>
                </el-select>
            </el-form-item>

            <el-form-item label="手机号" prop="phonenumber"  style="width: 300px; height: 50px">
                <el-input v-model="ruleForm.phonenumber"/>
            </el-form-item>

            <el-form-item label="邮箱" prop="email"  style="width: 300px; height: 50px">
                <el-input v-model="ruleForm.email"/>
            </el-form-item>

            <el-form-item label="出生日期"  style="width: 300px; height: 50px">
                <el-form-item prop="birthday">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.birthday"  style="width: 200px; height: 50px"/>
                </el-form-item>
            </el-form-item>

            <el-form-item label="兴趣爱好" prop="interest"  style="width: 500px; height: 50px;">
                <el-checkbox-group v-model="ruleForm.interest" style="float: left">
                    <el-checkbox label="睡觉" name="interest"/>
                    <el-checkbox label="看书" name="interest"/>
                    <el-checkbox label="打球" name="interest"/>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="自我介绍" prop="intro"  style="width: 450px; height: 100px">
                <el-input type="text" v-model="ruleForm.intro" maxlength="50" placeholder="请输入内容" show-word-limit/>
            </el-form-item>

            <el-form-item  style=" width: 400px; height: 50px">
                <el-button type="primary" @click="submitForm('ruleForm')">创建用户</el-button>
                <el-button @click="resetForm('ruleForm')">重置信息</el-button>
                <el-button @click="returnUserList('ruleForm')">返回</el-button>
            </el-form-item>
        </el-form>
    </el-card>

</div>
</template>

<script>
    import breadnavigation from "../../Biz/breadnavigation.vue";
    import axios from "axios";
    export default {
        name: "UserRegisterEle",
        data() {
            return {
                ruleForm: {
                    name: '',
                    sex: '',
                    phonenumber: '',
                    email: '',
                    birthday: '',
                    interest: [],
                    intro: ''
                },

                rules: {
                    name: [
                        { required: true, message: '请输入名字', trigger: 'blur' },
                        { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    phonenumber: [
                        { required: true, message: '请输入手机号', trigger: 'change' },
                        // { min: 11, max:11, message: '请输入11位手机号', trigger: 'blur'},
                        { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号', trigger: 'change' }
                    ],
                    email: [
                        { type: 'email', required: true, message: '请输入邮箱号', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱号', trigger: 'change'}
                    ],
                    birthday: [
                        { required: false, message: '请选择日期', trigger: 'change' }
                    ],
                    interest: [
                        { type: 'array', required: false, message: '请至少选择一个兴趣爱好', trigger: 'change' }
                    ],
                    intro: [
                        { required: false, message: '请填写自我介绍', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            submitForm(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid){
                        const post_data2={
                            "user_name":this.ruleForm.name,
                            "sex":1,
                            "birthday":this.ruleForm.birthday,
                            "email":this.ruleForm.email,
                            "interest":this.ruleForm.interest,
                            "cell_phone":this.ruleForm.phonenumber,
                            "introduction":this.ruleForm.intro
                        };
                        console.log(post_data2);
                        axios.post('/sjfapi/userregister/', post_data2)
                            .then((response) => {
                                if (response.data.code===200){
                                    this.$message.success('新增用户成功！')
                                }else{
                                    this.$message.error('新增用户失败！'+response.data.message)
                                }
                            })
                            .catch((error) => {
                                this.$message.error(error)
                            });
                        this.$message.success('新增用户成功！')
                    }else {
                        this.$message.error('参数校验有误')
                    }
                })
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            },
            returnUserList(){
                this.$router.push({name: "ManageMember"})
            }
        },

        components: {
            breadnavigation
        }
    }
</script>

<style scoped>
    .demo-ruleForm {
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 500px;
        margin-left: 300px;
        margin-top: 100px;
        size: 24px;
        background-color: #232121;
        border: 0;
    }

    .box-card p,  .box-card{
        padding: 5px;
        color: white;
        font-weight: 500;
        font-size: 16px;
    }

</style>
