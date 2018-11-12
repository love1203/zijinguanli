<template>
	<div class="header">
		<div class="header-left">
			<img src="../assets/img/logo.png" />
			<span>用户管理系统</span>
		</div>
		<div class="header-right">
			<img :src="users.avatar" />
			<div class="header-text">
				<p class="tx1">欢迎</p>
				<p class="tx2">{{users.name}}</p>
			</div>
			<el-dropdown @command="handleCommand" class='xialanav' trigger='click'>
			  <span class="el-dropdown-link">
				<i class="el-icon-arrow-down el-icon--right"></i>
			  </span>
			  <el-dropdown-menu slot="dropdown">
				<el-dropdown-item command="info">个人信息</el-dropdown-item>
				<el-dropdown-item command="loginout">退出</el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
	export default {
		computed:{
			users(){
				return this.$store.getters.users
			}
		},
		methods:{
			handleCommand(iteminfo){
				switch(iteminfo){
					case 'info':
					this.getinfo();
					break;
					
					case 'loginout':
					this.getloginout();
					break;
					
				}
			},
			getinfo(){
				this.$router.push('/info')
			},
			getloginout(){
				localStorage.removeItem('jwToken')
				this.$store.dispatch('cleardata')
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	.header{width: 100%;height: 70px;background: #222;}
	.header .header-left{float: left;height: 100%;}
	.header .header-left img{display: block;float: left;width: 50px;height: 50px;margin-top: 10px;margin-left: 10px;}
	.header .header-left span{font-size: 26px;color: #fff;float: left;line-height: 70px;margin-left: 10px;}
	.header .header-right{float: right;}
	.header .header-right img{display: block;float: left;width: 40px;height: 40px;border-radius: 50%;margin-top: 15px;margin-right: 10px;}
	.header .header-right .header-text{float: left;}
	.header .header-right .header-text .tx1{font-size: 14px;color: #fff;margin-top: 20px;}
	.header .header-right .header-text .tx2{font-size: 16px;color: #409eff;line-height: 24px;}
	.xialanav{float: left;margin-top: 30px;margin-right: 10px;margin-left: 10px;}
	.xialanav .el-dropdown-link{color: #fff;}
</style>
