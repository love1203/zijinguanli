<template>
	<div class="index">
		<Headernav></Headernav>
		<Sildernav></Sildernav>
		<div class="conter">
			<router-view />
		</div>
	</div>
</template>

<script>
	import Headernav from './headernav'
	import Sildernav from './sildernav'
	export default {
		components:{
			Headernav,
			Sildernav
		}
	}
</script>

<style>
	.index{width: 100%;position: absolute;height: 100%;overflow: hidden;}
	.conter{width: 85%;position: absolute;height: 100%;right: 0;top: 70px;}
</style>
