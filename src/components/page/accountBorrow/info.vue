<template>
    <div id="pandect"  class="reset-pwd">
        <h3 class="account-title">账户资料</h3>
        <template v-if="info !== null">
            <personalBasic v-if="info.borrowerType === 1" :detail="info"></personalBasic>
            <companyBasic v-if="info.borrowerType === 2" :detail="info"></companyBasic>
        </template>
    </div>
</template>

<script>
    import companyBasic from './companyBasic.vue';
    import personalBasic from './personalBasic.vue';
    export default{
        data(){
            return {
                info: null
            }
        },
        mounted(){
            this.getData();
        },
        methods: {
            getData(){
                this.$http({
                    method: 'get',
                    url: this.$urls.accountBorrowInfo,
                    data: {
                        service: 'info'
                    }
                }).then( data => {
                    this.info = data.data;


                }).catch( e => {
                    this.$alert(e.msg, '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                })
            },
        },
        components:{
            companyBasic,
            personalBasic
        }
    }
</script>