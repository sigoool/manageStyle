<template>
    <div style="main">
        <Row style="margin-bottom:20px;">
            <Col>
                <Button type="primary" icon="ios-add" @click="showModal">添加用户</Button>
            </Col>
        </Row>
        <Table stripe border :columns="columns1" :data="data1" :max-height='600'></Table>
        <Modal
            v-model="modal1"
            title="添加用户"
            :closable="false">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                    <FormItem label="Name" prop="name">
                        <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
                    </FormItem>
                    <FormItem label="Password" prop="password">
                        <Input v-model="formValidate.password" placeholder="Enter your password"></Input>
                    </FormItem>
                    <FormItem label="Role" prop="role">
                        <Input v-model="formValidate.role" placeholder="Enter your role"></Input>
                    </FormItem>
                    <FormItem label="Date" prop="date">
                        <DatePicker type="date" placeholder="Select date" v-model="formValidate.date"></DatePicker>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formValidate')">添加用户</Button>
                    </FormItem>
                </Form>
                <div slot="footer">

                </div>
        </Modal>
        <Modal
            v-model="modal2"
            title="修改用户名"
            :closable="false">
                <Form :label-width="100">
                    <FormItem label="名称" prop="name">
                        <Input v-model="rename" placeholder="输入名称"></Input>
                    </FormItem>
                    
                    <FormItem>
                        <Button type="primary" @click="changeName">修改名称</Button>
                    </FormItem>
                </Form>  
                <div slot="footer">

                </div>
        </Modal>
        <Modal
            v-model="modal3"
            title="修改密码"
            :closable="false">
            <Form :label-width="100">
                <FormItem label="密码" prop="name">
                    <Input v-model="repassword" placeholder="输入密码"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="changePassword">修改密码</Button>
                </FormItem>
            </Form>
            <div slot="footer">

                </div>
        </Modal>
    </div>
    
</template>
<style lang="less">
    
</style>
<script>
export default {
    data(){
        return{
            modal1:false,
            modal2:false,
            modal3:false,
            oldname:'',
            oldpass:'',
            repassword:"",
            rename:"",
            formValidate: {
                    name: '',
                    password: '',
                    role:'普通用户',
                    date:''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        {min:6,message:'密码不能少于六位',trigger: 'blur' }
                    ],
                    role: [
                        { required: true, message: '角色不能为空', trigger: 'blur' }
                    ],
                    date: [
                        { required: true, type: 'date', message: '请选择时间', trigger: 'change' }
                    ],
                    
                },
            columns1: [
                    {
                        align:"center",
                        title: 'Name',
                        render:(h,params)=>{
                            return h("div",[
                                h("span",{
                                    on:{
                                        "click":()=>{
                                            this.showModal2(params.row.name);
                                        },
                                    },
                                    style:{
                                        color:"red",
                                        cursor:"pointer"
                                    }
                                    
                                },params.row.name)
                            ])
                        }
                    },
                    {
                        align:"center",
                        title: 'passWord',
                        render:(h,params)=>{
                            return h("div",[
                                h("span",{
                                    on:{
                                        "click":()=>{
                                            this.showModal3(params.row.password);
                                        },
                                    },
                                    style:{
                                        color:"red",
                                        cursor:"pointer"
                                    }
                                    
                                },params.row.password)
                            ])
                        }
                    },
                    {
                        align:"center",
                        title: 'Role',
                        key: 'role'
                    },
                    {
                        align:"center",
                        title: 'Date',
                        key: 'date'
                    },
                    {
                        title:"操作",
                        align:"center",
                        render:(h,params)=>{
                            return h("div",[
                                h("Button",{
                                    props:{
                                        type:"error"
                                    },
                                    style:{
                                        display:(params.row.name=="wcy"&&params.row.password=="123456")?"none":"block",
                                        textAlign:"center"
                                    },
                                    on:{
                                        "click":()=>{
                                            this.deleteDate(params.row);
                                        }
                                    }
                                },"删除")
                            ])
                        }
                    }
                ],
                data1: [
                    {
                        name: 'wcy',
                        password: "123456",
                        role: '管理员',
                        date: '2020-03-03'
                    }
                ]
            
        }
    },
    methods:{
        showModal(){
            this.modal1=true;
        },
        showModal2(name){
            if(name=="wcy"){

            }else{
                this.modal2=true;
                this.rename=name;
                this.oldname=name;
            }
            
        },
        showModal3(password){
            if(password=="123456"){

            }else{
                this.modal3=true;
                this.repassword=password;
                this.oldpass=password;
            }
            
        },
        deleteDate(item){
            this.data1.map((item2,index)=>{
                if(item2.name == item.name){
                    this.data1.splice(index,1);
                }
            })
            // console.log(item)
        },
        add(){
            this.data1.push({name:this.formValidate.name,password:this.formValidate.password,role:this.formValidate.role,data:this.formValidate.date})
            this.modal1=false;
            this.formValidate={};
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.add();
                    }
                })
        },
        cancel(){
            this.modal1=false;
        },
        changePassword(){
            if(this.repassword){
                this.data1.map((item,index)=>{
                    if(item.password==this.oldpass){
                        item.password=this.repassword;
                    }
                })
            }
            this.modal3=false;
        },
        changeName(){
            if(this.rename){
                this.data1.map((item,index)=>{
                    if(item.name==this.oldname){
                        item.name=this.rename;
                    }
                })
            }
            this.modal2=false;
        }
    }
}
</script>