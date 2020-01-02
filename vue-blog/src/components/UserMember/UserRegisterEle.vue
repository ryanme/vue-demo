<template>
<div>
    <breadnavigation/>

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
                <el-form-item prop="date1">
                    <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1"  style="width: 200px; height: 50px"/>
                </el-form-item>
        </el-form-item>

        <el-form-item label="兴趣爱好" prop="interest"  style="width: 500px; height: 50px;">
            <el-checkbox-group v-model="ruleForm.interest" style="float: left">
                <el-checkbox label="睡觉" name="interest"/>
                <el-checkbox label="看书" name="interest"/>
                <el-checkbox label="打球" name="interest"/>
            </el-checkbox-group>
        </el-form-item>

        <el-form-item label="自我介绍" prop="intro"  style="width: 500px; height: 100px">
            <el-input type="textarea" v-model="ruleForm.intro"/>
        </el-form-item>

        <el-form-item  style=" width: 600px; height: 50px">
            <el-button type="primary" @click="submitForm('ruleForm')">创建用户</el-button>
            <el-button @click="resetForm('ruleForm')">重置信息</el-button>
            <el-button @click="returnUserList('ruleForm')">返回</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
    import breadnavigation from "../../Biz/breadnavigation.vue";
    export default {
        name: "UserRegisterEle",
        data() {
            return {
                ruleForm: {
                    name: '',
                    sex: '',
                    phonenumber: '',
                    email: '',
                    date1: '',
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
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        // { min: 11, max:11, message: '请输入11位手机号', trigger: 'blur'},
                        { pattern: /^1[34578]\d{9}$/, message: '请输入正确的手机号' }
                    ],
                    email: [
                        { type: 'email', required: true, message: '请输入邮箱号', trigger: 'blur' },
                        { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱号'}
                    ],
                    date1: [
                        { type: 'date', required: false, message: '请选择日期', trigger: 'change' }
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
                        this.$message.success('新增用户成功！')
                    }else {
                        this.$message.error('新增用户失败！');
                        return false;
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
    /*@import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");*/
    .demo-ruleForm {
        color: white;
        padding-left: 100px;
        padding-top: 50px;
    }
</style>
