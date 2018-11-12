<template>
	<div class="register">
		<div class="registertitle">后台管理系统</div>
		<el-form :model="registerdata" :rules="rules" ref="registerForm" class="demo-ruleForm">
			<p class="logintitle1">注册</router-link></p>
		  <el-form-item label="用户名" prop="name">
			<el-input type="text" placeholder='请输入用户名' v-model="registerdata.name"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="邮箱" prop="email" :error='emailerr'>
		  <el-input type="email" placeholder='请输入邮箱' v-model="registerdata.email"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="密码" prop="password">
		  <el-input type="password" placeholder='请输入密码' v-model="registerdata.password"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="确认密码" prop="password2">
		  <el-input type="password" placeholder='请确认密码' v-model="registerdata.password2"></el-input>
		  </el-form-item>
		  
		  <el-form-item label="选择身份">
			  <el-select v-model="registerdata.identity" placeholder="请选择" style='width: 100%;'>
					<el-option label="管理员" value="manager"></el-option>
					<el-option label="员工" value="employee"></el-option>
			  </el-select>
		  </el-form-item>

		  <el-form-item>
			<el-button class='submitbtn' type='primary' @click='submit()'>确认</el-button>
		  </el-form-item>
			<p class="logintext">已有账号<router-link to='/login'>请登录</router-link></p>
		</el-form>
		
	</div>
</template>

<script>
	export default {
		data(){		
			 var validatePass2 = (rule, value, callback) => {
				if (value !== this.registerdata.password) {
				  callback(new Error('两次输入密码不一致!'));
				} else {
				  callback();
				}
			  };			
			return {
				registerdata:{
					name:'',
					email:'',
					password:'',
					password2:'',
					identity:''
				},
				emailerr:'',
				rules:{
					name:[
						{ required: true, message: "用户名不能为空", trigger: "change" },
						{ min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
					],
					email:[
						{ type:'email', required: true, message: "邮箱格式不正确", trigger: "change" }
					],
					password:[
						{ required: true, message: "密码不能为空", trigger: "blur" },
						{ min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" }
					],
					password2:[
						{ required: true, message: "密码不能为空", trigger: "change" },
						{ validator: validatePass2, trigger: "change" }
					]
				}
			}
		},
		methods:{
			submit() {
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						this.$axios.post('/api/users/register',this.registerdata)
						.then((res)=>{
							this.$message({
								message: '注册成功',
								type:'success'
							})
							this.$router.push('/login')
						})
						.catch((err)=>{
							this.emailerr=err.response.data
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped>
	.register{width: 100%;height: 100%;background: url(../assets/img/bg.jpg);background-size: 100% 100%;position: absolute;top: 0;bottom: 0;}
	.registertitle{font-size: 30px;text-align: center;color: #fff;font-weight: bold;padding-top: 100px;}
	.demo-ruleForm{background: #fff;width: 400px;margin: 0 auto;padding: 30px;border-radius: 5px;margin-top: 30px;}
	.submitbtn{width: 100%;}
	.logintext{text-align: center;font-size: 14px;color: #666;}
	.logintext a{color: #409EFF;margin-left: 5px;text-decoration: none;}
	.logintitle1{text-align: center;font-size: 20px;color: #333;margin-bottom: 10px;}
</style>
