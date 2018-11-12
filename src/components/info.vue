<template>
	<div class="info">
		<div class="info-left">
			<img :src="users.avatar" />
		</div>
		<div class="info-right">
			<p class="ptx1">名字：{{users.name}}</p>
			<p class="ptx2">职务：{{users.identity=='employee'?'普通员工':'管理员'}}</p>
		</div>
	</div>
</template>

<script>
	export default {
		computed:{
			users(){
				return this.$store.getters.users
			}
		}
	}
</script>

<style scoped>
	.info{width: 100%;height: 100%;overflow: hidden;}
	.info .info-left{width: 40%;height: 100%;background: #fff;float: left;}
	.info .info-left img{width: 150ox;height: 150px;border-radius: 50%;display: block;margin: 50% 0 0 70%;}
	.info .info-right{width: 60%;height: 100%;background: #ececec;float: left;}
	.info .info-right .ptx1{margin-top: 36%;margin-left: 20px;font-size: 28px;color: #333;}
	.info .info-right .ptx2{margin-left: 20px;font-size: 28px;color: #333;line-height: 80px;}
</style>
