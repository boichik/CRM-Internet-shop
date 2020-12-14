<template>
    <ul class="sidebar" :class="{open: value}">
        <li class="sidebar-item sidebar-name">Vlad Vlad</li>
        <router-link
          v-for="link in links"
          :key="link.url"
          tag="li"
          active-class="active"
          :to="link.url"
          
          exact
        >

		<a class="sidebar-item" @click="myMethods()" href="#">{{link.title}}<i class="material-icons right mr-1">{{link.ico}}</i></a>
        </router-link>
		<li class="sidebar-item sidebar-btn"><a @click.prevent="logout" class="waves-effect waves-light btn-small red"><i class="material-icons right">exit_to_app</i>Выйти</a></li>
	</ul>
</template>
<script>
export default {
    props: ['value'],
    data: () =>({
       links:[
           {title:'Главная', url:'/',ico:'home'},
           {title:'Заказы', url:'/orders',ico:'local_grocery_store'},
           {title:'Товары', url:'/goods',ico:'assignment'},
           {title:'Клиенты', url:'/clients',ico:'people'},
           {title:'API', url:'/api',ico:'brightness_5'},
           {title:'Профиль', url:'/profile',ico:'contacts'},
       ]
    }),
    methods:{
       myMethods(){
           if(screen.width<=480){
               this.$emit('mclick')
           }  
       },
        logout(){
			this.$store.dispatch('logout')
			this.$router.push('/login')
		}
    }
}
</script>