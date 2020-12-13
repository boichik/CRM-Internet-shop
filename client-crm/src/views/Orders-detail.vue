<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2><a @click="$router.go(-1)">Назад</a>>{{this.$route.params.id}}</h2>
				<hr>
			</div>
			<section class="app-table">
			<Loader v-if="loading"/>
				<div v-else class="detail-container">
                    <OdetailBlock :order="order"/>
					<OdetailForm :status="status" :key="order.length + updateCount" @updateStatus="updateStatus"/>
					<OdetailTable :status="status"/>
				</div>
			</section>
    </div>
</template>
<script>
import OdetailBlock from "@/components/order-detail/OdetailBlock"
import OdetailForm from "@/components/order-detail/OdetailForm"
import OdetailTable from "@/components/order-detail/OdetailTable"

export default {
  name: 'order-detail',
  data:()=>({
	order:{},
	costumer:[],
	status:{},
	updateCount: 0,
	loading:true
  }),	
  async mounted(){
	  this.createObject()		
	  	
  },
  components:{
	  OdetailBlock, OdetailForm, OdetailTable
  },
  methods:{
	 async createObject(){
			const id = this.$route.params.id
			const order = await this.$store.dispatch('fetchOrdersById', id)
			const cID= order.costumer_id
			const costumer = await this.$store.dispatch('fetchCostumerById', cID)

			this.order = {
					...order,
				//stNow: order.status[order.status.length-1].status_now,
				statusColor : (order.status[order.status.length-1].status_now =='placed_order') ? 'orange' : 
							(order.status[order.status.length-1].status_now =='order_processed') ? 'orange' : 
							(order.status[order.status.length-1].status_now=='submitted') ? 'yellow' :
							(order.status[order.status.length-1].status_now=='delivery') ? 'yellow' :
							(order.status[order.status.length-1].status_now=='received') ? 'green' :
							(order.status[order.status.length-1].status_now=='refund') ? 'blue' :
																				'red',
				
				bio: costumer.orders.find(o => o.order_id === id).order_bio,
				phone: costumer.phone,
				adress: costumer.orders.find(c=> c.order_id === id).address
				}
			this.status= order.status
			this.loading=false
	  },
	  updateStatus(){
	      this.loading=true
		  this.createObject()
	  }
  }
}
</script>