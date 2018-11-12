<template>
	<div class="silder">
		<el-col :span="24" style='height: 100%;'>
			<el-menu
			  default-active="1"
			  class="el-menu-vertical-demo"
			  background-color="#222"
			  text-color="#fff"
			  active-text-color="#409eff">
			  <router-link to='/index' tag='div'>
			  <el-menu-item index="1">
				  <i class="el-icon-menu"></i>
				  <span slot="title">首页</span>
			  </el-menu-item>
			  </router-link>
			  <el-submenu index="2">
				<template slot="title">
				  <i class="el-icon-location"></i>
				  <span>资金流水</span>
				</template>
				<router-link to='/zijin' tag='div'>
				<el-menu-item index="2-1">资金流水</el-menu-item>
				</router-link>
			  </el-submenu>
			  <el-submenu index="3">
				  <template slot="title">
					<i class="el-icon-location"></i>
					<span>用户中心</span>
				  </template>
				  <router-link to='/info' tag='div'>
				  <el-menu-item index="3-1">个人信息</el-menu-item>
				  </router-link>
				  </el-submenu>
			</el-menu>
		  </el-col>
		</el-row>
	</div>
</template>

<script>
</script>

<style scoped>
	.silder{height: 100%;position: absolute;width: 15%;background: #222;}
	.el-menu-vertical-demo{height: 100%;}
</style>
