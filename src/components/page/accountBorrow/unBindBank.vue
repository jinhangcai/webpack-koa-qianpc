<template>
    <a href="javascript:;" @click="unbindBank">解绑</a>
</template>

<script>
    export default {
        props: ['userId'],
        data: function () {
            return {
                url: '',
                formData: ''
            }
        },
        created: function(){

        },
        mounted: function () {
        },
        methods: {
            unbindBank: function(){

                this.$http({
                    url: this.$urls.unbindBankCard,
                    method: 'POST',
                    data: {
                        service: 'unbindBankCard'
                    }
                }).then( data => {
                    data = data.data;
                    let url = data.postUrl,
                        formData = data.reqDataPackage;
                    this.$confirm('确定要解绑吗, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {

                        this.xwPost(url, formData)
                    }).catch(() => {
                    });

                }).catch( e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                });
            },
            xwPost(url, formData){
                this.formPost(url, formData, ()=>{

                    this.$confirm('解绑完成，刷新页面?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        location.reload();
                    }).catch(() => {
                    });
                }, '_blank');
            }
        },
        components: {
        }
    }
</script>
