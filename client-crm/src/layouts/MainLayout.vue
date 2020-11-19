<template>
    <div>

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
    async mounted(){
      if(!Object.keys(this.$store.getters.info).length){
        await this.$store.dispatch('fetchInfo')
      }
    },
    components:{
        Navbar, Sidebar
    }
}
</script>