<template>
  <div id="app">
		<keep-alive>
		<router-view />
		</keep-alive>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: 'App',
  created(){
  	if(localStorage.jwToken){
		const decode=jwt_decode(localStorage.jwToken)
		let idata=Date.now()/1000
		if(idata>decode.exp){
			localStorage.removeItem('jwToken')
			this.$store.dispatch('cleardata')
			this.$router.push('/login')
		}else{
			this.$store.dispatch('getusers',decode)
			this.$store.dispatch('getisLogin',!this.isEmpty(decode))
		}
		
	}
  },
  methods:{
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

<style>

</style>
