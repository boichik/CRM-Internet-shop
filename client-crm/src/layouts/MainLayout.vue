<template>
    <div>
      <ul id="dropdown1" class="dropdown-content">
	  <li><a href="#!">one</a></li>
	  <li><a href="#!">two</a></li>
	  <li class="divider"></li>
	  <li><a href="#!">three</a></li>
	</ul>

	<!-- NAVBAR -->
    <Navbar @click="isOpen = !isOpen"/>
    <!-- SIDEBAR -->
    <Sidebar v-model="isOpen"/>
    <!-- MAIN CONTENT -->

    <main class="app-content" :class="{max: !isOpen}">
      <div class="app-page">
          <router-view/>
	  </div>
    </main>
  </div>
</template>
<script>
import Navbar from '@/components/app/Navbar'
import Sidebar from '@/components/app/Sidebar'
export default {
    name: 'main-layout',
    data:()=>({
      isOpen:true
    }),
    components:{
        Navbar, Sidebar
    }
}
</script>