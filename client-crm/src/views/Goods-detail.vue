<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2><a @click="$router.go(-1)">Назад</a>>{{this.$route.params.id}}</h2>
				<hr>
			</div>
			<section class="app-table">
			<Loader v-if="loading"/>
				<div v-else class="detail-container">
                   <GdetailBlock :good="good" @updateGdetail='updateGdetail'/>
				</div>
			</section>
    </div>
</template>
<script>
import GdetailBlock from "@/components/goods-detail/GdetailBlock"

export default {
    name: 'goods-detail',
    metaInfo:{
        title: 'О товаре | BOYKO-CRM'
    },
    data:()=>({
      good:{},
      loading:true
    }),	
    async mounted(){
      this.create()			
    },
    components:{
      GdetailBlock
    },
    methods:{
    async create(){
      const id = this.$route.params.id
        this.good = await this.$store.dispatch('fetchGoodById', id)	
        this.loading=false
          
      },
      updateGdetail(){
        this.loading = true
        this.create()
      }
    }
}
</script>