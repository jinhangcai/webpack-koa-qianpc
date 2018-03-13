<template>
	<aside class="i-sidebar" id="sidebar">
		<ul>
			<li  :class="$route.name === 'pandect' ? 'on' : ''"><a @click="$router.push({ name: 'pandect'})">账户总览</a></li>
			<li :class="$route.name === 'recharge' ? 'on' : ''"><a @click="$router.push({ name: 'recharge'})">充值</a></li>
			<li  :class="$route.name === 'withdraw' ? 'on' : ''"><a @click="$router.push({ name: 'withdraw'})">提现</a></li>
			<li :class="$route.name === 'repayment' ? 'on' : ''"><a @click="$router.push({ name: 'repayment'})">还款</a></li>
		</ul>
	</aside>
</template>


<script>
	export default{
		data(){
		    return {
		        path: ''
			}
		},
		mounted(){
		    let path = this.$route.name;
            this.changeRouter(path);
		},
		methods: {
		    changeRouter(path){
		        if(path === '/'){
		            path = 'pandect'
				}
				this.path = path;
			}
		}
	}
</script>