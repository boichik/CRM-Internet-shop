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

		<a class="sidebar-item" href="#">{{link.title}}<i class="material-icons right mr-1">{{link.ico}}</i></a>
        </router-link>
		<li class="sidebar-item sidebar-btn"><a class="waves-effect waves-light btn-small red"><i class="material-icons right">exit_to_app</i>Выйти</a></li>
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
           {title:'API', url:'/documentation',ico:'brightness_5'},
           {title:'Профиль', url:'/profile',ico:'contacts'},
       ]
    })
}
</script>