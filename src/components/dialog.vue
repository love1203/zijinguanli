<template>
	<div>
		<el-dialog :title="showdialog.title" :visible.sync="showdialog.show">
		  <el-form :model="formdata" :rules="rules" ref="addform" class="demo-ruleForm" label-width="80px">
		  	<el-form-item label="类型">
				<el-select v-model="formdata.type" placeholder="请选择">
					<el-option
					  v-for="(item,index) in typedata"
					  :key="index"
					  :label="item"
					  :value="item">
					</el-option>
				</el-select>
		  	</el-form-item>
		  	
				<el-form-item label="描述" prop="describe">
				<el-input type="text" v-model="formdata.describe"></el-input>
				</el-form-item>
				
		  	<el-form-item label="收入" prop="income">
				<el-input type="text" v-model="formdata.income"></el-input>
		  	</el-form-item>
				
				<el-form-item label="支出" prop="expend">
				<el-input type="text" v-model="formdata.expend"></el-input>
				</el-form-item>
				
				<el-form-item label="现金" prop="cash">
				<el-input type="text" v-model="formdata.cash"></el-input>
				</el-form-item>
				
				<el-form-item label="备注" prop="remark">
				<el-input type="textarea" v-model="formdata.remark"></el-input>
				</el-form-item>
		  	
		  	<el-form-item>
				<el-button class='submitbtn' type='warning' @click='closedia()'>取消</el-button>
		  	<el-button class='submitbtn' type='primary' @click='submit()'>确认</el-button>
		  	</el-form-item>
		  </el-form>
		 
		</el-dialog>

	</div>
</template>

<script>
	export default {
		props:{
			showdialog:Object,
			formdata:Object
		},
		data(){
			return {
				typedata:["提现","提现手续费","充值","优惠券","充值礼券","转账"],
				rules:{
					describe:[
						{ required: true, message: "不能为空", trigger: "blur" }
					],
					income:[
						{ required: true, message: "不能为空", trigger: "blur" }
					],
					expend:[
						{ required: true, message: "不能为空", trigger: "blur" }
					],
					cash:[
						{ required: true, message: "不能为空", trigger: "blur" }
					],
					remark:[
						{ required: true, message: "不能为空", trigger: "blur" }
					]
				}
			}
		},
		methods:{
			submit(){
				this.$refs.addform.validate((valid) => {
          if (valid) {
						const url=this.showdialog.add=='add'?'add':`edit/${this.formdata.id}`
						
						console.log(url)
            this.$axios.post(`/api/profiles/${url}`,this.formdata)
						.then((res)=>{
							this.$message({
								message:'保存成功',
								type:'success'
							})
							this.showdialog.show=false
							this.$emit('update')
						})
						.catch((err)=>{console.log(err)})
          } else {
            console.log('error submit!!');
            return false;
          }
        });
			},
			closedia(){
				this.showdialog.show=false
			}
		}
	}
</script>

<style>
</style>
