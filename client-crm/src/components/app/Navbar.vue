<template>
    <nav class="alpha nav">
	    <div class="nav-wrapper navbar">
	      <a class="left" href="#!" @click.prevent="$emit('click')"><i class="large material-icons right">dehaze</i></a>
	      <a href="#" class="brand-logo logo">Logo</a>
	      <ul id="nav-mobile" class="right ">
           <li class="drop-link drop-li"><a class="dropdown-trigger" href="#!" data-target="dropdown1" ref="dropdown">{{name}}
           	<i class="large material-icons right">arrow_drop_down</i></a></li>
			    <ul id="dropdown1" class="dropdown-content">
					<li><router-link to="/profile">Настройки профиля</router-link></li>
					<li><a href="#!" @click.prevent="logout">Выйти</a></li>
				</ul>
	      </ul>
	    </div>
    </nav>
</template>
<script>
export default {
	data: ()=>({
	}),
	async mounted(){
		M.Dropdown.init(this.$refs.dropdown, {
			constrainWidth: true
		})		
		
	},
	computed:{
		name(){
			return this.$store.getters.info.name
		}
	},
	methods:{
		logout(){
			this.$store.dispatch('logout')
			this.$router.push('/login')
		}
	}
}
</script>