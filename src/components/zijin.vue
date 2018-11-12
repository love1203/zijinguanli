<template>
	<div class="zijin">
		<div class="add">
			<div class="block">
				<span class="demonstration">筛选</span>
				<el-date-picker
					v-model="value6"
					type="daterange"
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期">
				</el-date-picker>
			</div>
			<el-button class='addbtn1' type="primary" @click="saixuan">筛选</el-button>
			<el-button class='addbtn' type="primary" @click="dialogshow"  v-if='users.identity=="manager"'>添加</el-button>
		</div>
		<el-table
		:data="tableData"
		border
		max-height='450'
		:default-sort = "{prop: 'date', order: 'descending'}"
		style="width: 100%">
		
		<el-table-column
		label="序号"
		type='index'
		align='center'
		width="80">
		</el-table-column>
		
		<el-table-column
		  label="日期"
		  align='center'
			prop='date'
			sortable
		  width="220">
		  <template slot-scope="scope">
			<i class="el-icon-time"></i>
			<span style="">{{ scope.row.date }}</span>
		  </template>
		</el-table-column>
		
		<el-table-column
		label="类型"
		align='center'
		width="180">
		<template slot-scope="scope">
			<span style="">{{ scope.row.type }}</span>
		</template>
		</el-table-column>
		
		<el-table-column
		label="描述"
		align='center'
		width="300">
		<template slot-scope="scope">
			<span style="">{{ scope.row.describe }}</span>
		</template>
		</el-table-column>
		
		<el-table-column
		label="收入"
		align='center'
		width="100">
		<template slot-scope="scope">
			<span style="color: #08d568;">{{ scope.row.income }}</span>
		</template>
		</el-table-column>
		
		<el-table-column
		label="支出"
		align='center'
		width="100">
		<template slot-scope="scope">
			<span style="color: #f5437a;">{{ scope.row.expend }}</span>
		</template>
		</el-table-column>
		
		<el-table-column
		label="现金"
		align='center'
		width="100">
		<template slot-scope="scope">
			<span style="color: #409EFF;">{{ scope.row.cash }}</span>
		</template>
		</el-table-column>
		
		<el-table-column
		label="备注"
		align='center'
		>
		<template slot-scope="scope">
			<span style="">{{ scope.row.remark }}</span>
		</template>
		</el-table-column>
		
		
		<el-table-column label="操作" align='center' v-if='users.identity=="manager"'>
		  <template slot-scope="scope">
			<el-button
			  size="mini"
			  type='primary'
			  @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
			<el-button
			  size="mini"
			  type="danger"
			  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
		  </template>
		</el-table-column>
	  </el-table>
		
		<!--分页-->
		<div class="block1">
			<el-pagination class='pagecount'
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page.sync="pagenum.page_index"
				:page-sizes="pagenum.page_sizes"
				:page-size="pagenum.page_size"
				:layout="pagenum.layout"
				:total="pagenum.total">
			</el-pagination>
		</div>
		<!--分页-->
	  <Dialog :showdialog='showdialog' :formdata='formdata' @update='getformdata()' />
	</div>
</template>

<script>
	import Dialog from './dialog'
	export default {
		data(){
			return{
				tableData:[],
				alltableData:[],
				fliterdata:[],
				value6:[],
				showdialog:{
					show:false,
					title:"添加信息",
					add:'edit'
				},
				formdata:{
					type:'',
					describe:'',
					income:'',
					expend:'',
					cash:'',
					remark:'',
					id:''
				},
				pagenum:{
					page_index:1,
					page_sizes:[5,10,20,30],
					page_size:5,
					layout:"total, sizes, prev, pager, next, jumper",
					total:10
				}

			}
		},
		components:{
			Dialog
		},
		computed:{
			users(){
				return this.$store.getters.users
			}
		},
		methods:{
			getformdata(){
				this.$axios.get('/api/profiles')
				.then((res)=>{
					this.alltableData=res.data
					this.fliterdata=res.data
					this.showpage()
					
				})
				.catch((err)=>{console.log(err)})
			},
			showpage(){
				this.pagenum.page_index=1
				this.pagenum.page_size=5
				this.pagenum.total=this.alltableData.length
				this.tableData=this.alltableData.filter((item,index)=>{
					return index<this.pagenum.page_size
				})
			},
			dialogshow(){
				this.showdialog={
					show:true,
					title:"添加信息",
					add:'add'
				}
				this.formdata={
					type:'',
					describe:'',
					income:'',
					expend:'',
					cash:'',
					remark:'',
					id:''
				}
			},
			handleDelete(index, row){
				this.$axios.delete(`/api/profiles/delete/${row._id}`)
				.then((res)=>{
					this.$message({
						message:'删除成功',
						type:'success'
					})
					this.getformdata()
				})
				.catch((err)=>{
					console.log(err)
				})
			},
			handleEdit(index, row){
				this.showdialog={
					show:true,
					title:"更改信息",
					add:'edit'
				}
				console.log(this.showdialog)
				this.formdata={
					type:row.type,
					describe:row.describe,
					income:row.income,
					expend:row.expend,
					cash:row.cash,
					remark:row.remark,
					id:row._id
				}
			},
			saixuan(){
				if(this.value6.length==0){
					this.$message({
						message:'请输入时间',
						type:'warning'
					})
					this.getformdata()
					return
				}
				let data1=this.value6[0].getTime()
				let data2=this.value6[1].getTime()
				this.alltableData=this.fliterdata.filter((item)=>{
					let idata=new Date(item.date).getTime()
					return idata>=data1&&idata<=data2
				})
				this.showpage()
			},
			handleSizeChange(page){
				this.pagenum.page_index=1
				this.pagenum.page_size=page
				this.tableData=this.alltableData.filter((item,index)=>{
					return index<page
				})
			},
			handleCurrentChange(num){
				let incon=this.pagenum.page_size*(num-1)
				let anum=this.pagenum.page_size*num
				let coun=[]
				
				for(let j=incon;j<anum;j++){
					if(this.alltableData[j]){
						coun.push(this.alltableData[j])
					}
				}
				this.tableData=coun
			}
		},
		created(){
			this.getformdata()
		}
	}
</script>

<style>
	.zijin{padding: 20px;}
	.add{width: 100%;height: 50px;margin-bottom: 20px;}
	.add .addbtn{float: right;}
	.add .addbtn1{float: left;margin-left: 10px;}
	.block{float: left;}
	.block .demonstration{font-size: 15px;color: #666;margin-right: 10px;}
	.block1{overflow: hidden;margin-top: 20px;}
	.block1 .pagecount{float: right;}
</style>
