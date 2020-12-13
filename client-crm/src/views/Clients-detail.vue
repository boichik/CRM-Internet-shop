<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2><a @click="$router.go(-1)">Назад</a>>{{this.$route.params.id}}</h2>
				<hr>
			</div>
			<section class="app-table">
			<Loader v-if="loading"/>
				<div v-else class="detail-container">
          <CdetailBlock :client="client"/>
					<CdetailTable :orders="orders"/>
				</div>
			</section>
    </div>
</template>
<script>
import CdetailBlock from "@/components/clients-detail/CdetailBlock"
import CdetailTable from "@/components/clients-detail/CdetailTable"

export default {
  name: 'clients-detail',
  data:()=>({
    client:{},
    orders:[],
    loading:true
  }),	
  async mounted(){
	  this.createObject()			
  },
  components:{
	  CdetailBlock, CdetailTable
  },
  methods:{
	 async createObject(){
			const id = this.$route.params.id
      this.client = await this.$store.dispatch('fetchCostumerById', id)	
      this.orders = this.client.orders
      this.loading=false
         
	  },
  }
}
</script>