<template>
	<div class="hello">
		<h1>{{ msg }}</h1>
		<p>
			Counter: {{ counter }} - {{this.timerInterval ? "已启用": "已停止"}}
			<button v-on:click="stopTimer">Stop & Restart timer</button>
		</p>
		<p>
			<span v-bind:title="tips">
				Message: {{message}}
			</span>
		</p>
		<p>
			<span>
				<button v-on:click="reverseMessage">反转Message</button>
				<input v-model="message" v-bind:style="messageInputStyle"/>
			</span>
		</p>
		<p v-if="seen">
			这是一个可以隐藏的段落~
		</p>
		<p>
		<ol>
			<li v-for="(todo, index) in todos" v-bind:key="index">
				{{todo.text}}
			</li>
		</ol>
		</p>
	</div>
</template>

<script>
	export default {
		name: "HelloWorld",
		props: {
			msg: String,
		},
		data() {
			return {
				counter: 1,
				timerInterval: null,
				message: '鼠标悬停几秒钟查看此处动态绑定的提示信息！',
				tips: 'You loaded this page on ' + new Date().toLocaleString(),
				seen: true,
				todos: [{
						id: 0,
						text: 'Learn JavaScript'
					},
					{
						id: 1,
						text: 'Learn Vue'
					},
					{
						id: 2,
						text: 'Build something awesome'
					}
				],
				messageInputStyle: {
					width: '500px'
				}
			};
		},
		mounted() {
			this.timerInterval = setInterval(() => {
				this.counter++;
			}, 1000);
		},
		methods: {
			stopTimer: function() {
				if (this.timerInterval) {
					clearInterval(this.timerInterval);
					this.timerInterval = null;
				} else {
					this.timerInterval = setInterval(() => {
						this.counter++;
					}, 1000);
				}
			},
			reverseMessage: function() {
				return this.message = this.message.split('').reverse().join('');
			}
		},
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h3 {
		margin: 40px 0 0;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
