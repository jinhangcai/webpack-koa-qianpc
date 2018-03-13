<template>
    <div id="group">
        <div class="groups">
            <div class="navTab on">
                <nav class="title" v-on:mouseenter="dataDetails"  v-on:mouseout='dataDetails1'>授权业务设置
                </nav>
            </div>
            <div class="hovershow" v-if="ishover">授权业务指用户授权平台代为进行相关业务操作；授权后，平台可在授权期限及授权金额范围内进行代授权业务操作，授权期限到期后，或超过累计授权金额范围后，用户需重新授权。</div>
            <div class="list"  >

                <!--<el-form ref="form"  label-width="80%">-->
                    <!--<el-form-item label="自动还款" >-->
                        <!--<div class="gogroup"><div class="accredit">立即授权</div></div>-->
                    <!--</el-form-item>-->
                <!--</el-form>-->
                <template v-for="i in arr">
                    <el-form ref="form"  label-width="80%">
                        <el-form-item :label="i.authName" >
                            <div class="gogroup" v-if="i.status"><span>已授权</span>&nbsp;&nbsp;<span ><a href="javascript:;" class="clone" @click="clone(i.authId,i.authName)">取消</a></span></div>
                            <div class="gogroup" v-else><a class="accredit" @click="gowithdraw(i.authId)">立即授权</a></div>
                        </el-form-item>
                    </el-form>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                ishover:false,
                arr:[]
            }
        },
        mounted(){
            this.withdraw();
        },
        methods:{
            dataDetails(){
                this.ishover  = true;
            },
            dataDetails1(){
                this.ishover  = false;
            },
            withdraw(){
                this.$http({
                    method: 'get',
                    url: this.$urls.userAuthinfo,
                    data: {
                        service:'info'
                    }
                }).then( data => {
                    for(let i=0;i<data.data.length;i++){
                       this.arr.push(data.data[i])
                    }
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            },
            gowithdraw(id){
                this.$http({
                    method: 'post',
                    url: this.$urls.userAuthgrantAuth,
                    data: {
                        authId:id,
                        service:'grontAuth'
                    }
                }).then( data => {
                    let url = data.data.postUrl,
                        formData = data.data.reqDataPackage;

                    this.formPost(url, formData, ()=>{
                        this.$confirm('立即授权已完成，刷新页面?' , '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            location.reload();
                        }).catch(() => {
                        });
                    }, '_blank');
                }).catch( e => {
                    this.$alert(e.msg, '标题名称', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                type: 'info',
                                message: `action: ${ action }`
                            });
                        }
                    });
                })
            },
            clone(id,authName){
                this.$confirm('确认要取消'+authName+'吗？' , '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({
                        method: 'post',
                        url: this.$urls.userAuthcancelAuth,
                        data: {
                            service:'cancelAuth',
                            authId:id
                        }
                    }).then( data => {
                        location.reload();
                    }).catch( e => {
                        this.$alert(e.msg, '标题名称', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: `action: ${ action }`
                                });
                            }
                        });
                    })
                }).catch(() => {
                });
            }
        }
    }
</script>