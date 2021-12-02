<template>
	<li>{{todo.text}}</li>
</template>

<script>
	export default {
		name: 'todo-item',
		props:{
			todo: Object
		},
		data(){
			return {
				title: "TODO lists"
			}
		}
	}
</script>

<style>
</style>
