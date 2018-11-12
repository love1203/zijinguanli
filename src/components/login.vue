<template>
	<div class="login">
		<div class="logintitle">后台管理系统</div>
		<el-form :model="logindata" :rules="rules" ref="loginForm" class="demo-ruleForm">
		  <p class="logintitle1">登录</router-link></p>
		  <el-form-item label="邮箱" prop="email" :error='maserror.email'>
		  <el-input type="email" placeholder='请输入邮箱' v-model="logindata.email"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="密码" prop="password" :error='maserror.password'>
		  <el-input type="password" placeholder='请输入密码' v-model="logindata.password"></el-input>
		  </el-form-item>
			
		  <el-form-item>
			<el-button class='submitbtn' type='primary' @click='submit()'>确认</el-button>
		  </el-form-item>
			<p class="logintext">还没有账号？<router-link to='/register'>请注册</router-link></p>
		</el-form>
	</div>
</template>

<script>
	import jwt_decode from 'jwt-decode'
	export default {
		data(){
						
			return {
				logindata:{
					email:'',
					password:''
				},
				maserror:{},
				rules:{
					email:[
						{ required: true, message: "邮箱不能为空", trigger: "blur" },
						{ type:'email', required: true, message: "邮箱格式不正确", trigger: "change" }
					],
					password:[
						{ required: true, message: "密码不能为空", trigger: "blur" },
						{ min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
					]
				}
			}
		},
		methods:{
			submit() {
				this.$refs.loginForm.validate((valid) => {
					if (valid) {
						this.$axios.post('/api/users/login',this.logindata)
						.then((res)=>{
							//console.log(res.data)
							this.$message({
								message:'登录成功',
								type:'success'
							})
							const token=res.data.token
							localStorage.setItem('jwToken',token)
							const decode=jwt_decode(token)
							//console.log(decode)
							this.$store.dispatch('getusers',decode)
							this.$store.dispatch('getisLogin',!this.isEmpty(decode))
							this.$router.push('/')
						})
						.catch((err)=>{
							this.$message({
								message:'登录失败',
								type:'error'
							})
							this.maserror=err.response.data
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			isEmpty(value) {
				return (
					value === undefined ||
					value === null ||
					(typeof value === 'object' && Object.keys(value).length === 0) ||
					(typeof value === 'string' && value.trim().length === 0)
				);
			}
		}
	}
</script>

<style scoped>
	.login{width: 100%;height: 100%;background: url(../assets/img/bg.jpg);background-size: 100% 100%;position: absolute;top: 0;bottom: 0;}
	.logintitle{font-size: 30px;text-align: center;color: #fff;font-weight: bold;padding-top: 200px;}
	.demo-ruleForm{background: #fff;width: 400px;margin: 0 auto;padding: 30px;border-radius: 5px;margin-top: 30px;}
	.submitbtn{width: 100%;margin-top: 10px;}
	.logintext{text-align: center;font-size: 14px;color: #666;}
	.logintext a{color: #409EFF;margin-left: 5px;text-decoration: none;}
	
	.logintitle1{text-align: center;font-size: 20px;color: #333;margin-bottom: 10px;}
</style>
