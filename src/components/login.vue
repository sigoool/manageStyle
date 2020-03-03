<template>
    <div class="main">
         <div class="model">
             <div class="title">
                 后台管理系统
             </div>
             <div class="inner">
                 <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="Username">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="Password">
                            <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
                    </FormItem>
                </Form>
             </div>
             
         </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能低于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.login();
                    }
                })
            },
            login(){
                if(this.formInline.user==="wcy" && this.formInline.password==="123456"){
                    this.$router.push({name:"User"});
                    localStorage.setItem("name","wcy")
                }else{
                    this.$Message.error('用户名密码错误，请重新输入');
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .main{
        width: 100%;
        height: 100%;
        position: fixed;
        background-color: tomato;
    
        .model{
            width: 600px;
            height: 260px;
            position: absolute;
            top:50%;
            left: 50%;
            margin-top: -130px;
            margin-left: -300px;
            background-color: white;
            border-radius: 10px;
            padding:20px;
            box-shadow: 4px 4px 8px -3px #000;
            .title{
                width: 100%;
                height: 30px;
                text-align: center;
                line-height: 30px;
                margin-bottom: 10px;
                font-weight: bold;
            }
            .inner{
                width: 60%;
                margin:0 auto;
            }
        }
    }
</style>