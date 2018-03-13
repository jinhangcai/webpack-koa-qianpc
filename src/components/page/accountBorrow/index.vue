<template>
	<div class="i-bd">
		<div class="mid clearfix">
			<accountNav></accountNav>
			<article class="i-main-con">
				<router-view></router-view>
			</article>
		</div>
	</div>
</template>

<script>
	import accountNav from 'components/accountNav/index.vue'
	export default{
		data(){
		    return {
			}
		},
		mounted(){
		},
		components: {
            accountNav
		}
	}
</script>