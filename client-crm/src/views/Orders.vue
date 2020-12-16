<template>
    <div class="app-page-container">
        	<div class="page-title">
				<h2>Заказы</h2>
				<hr>
			</div>
			<Loader v-if="loading"/>
			<section v-else-if="!orders.length" class="app-table">
				<h4>На данный момент заказов еще нет</h4>
				<p>Для работы з сервесом ознакомтесь по <router-link to="/api">ссылке</router-link></p>
			</section>
			<section v-else class="app-table">
				<div class="row tools-container">
					<div class="page-select-container col s4 m3 l2 xl1">
						<select class="select-size-page page-select browser-default" @change="renderOrder"  v-model="pageSize" >
							<option value="10" selected>10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
					<div class="input-field col s2 m3 l2 xl2">
						<select ref="select" class="browser-default"
						  
						  v-model="searchIn"
						  :class="{invalid: ($v.searchIn.$dirty && !$v.searchIn.required)}"  
						>
							<option value="" disabled selected>Критерии поиска</option>
							<option value="id">ID</option>
							<option value="costs">Сумма</option>
							<option value="date">Дата</option>
							<option value="article">Артикул</option>
							<option value="count">Количество</option>
						</select>
						<span 
							v-if="$v.searchIn.$dirty && !$v.searchIn.required"
							class="helper-text invalid left"
						>Сделайте выбор по Критерии</span>
					</div>
					<div class="input-field col s3 m3 l2 xl2">
						<input  id="first_name" type="text" class="validate"
						  v-model="serchText"
						  :class="{invalid: ($v.serchText.$dirty && !$v.serchText.required)}"  
						>
						<span 
							v-if="$v.serchText.$dirty && !$v.serchText.required"
							class="helper-text invalid left"
						>Введите текст для поиска</span>
						<label for="first_name">Поиск...</label>
				   </div>
				   <div class="col s2 m1 l2 xl2">
				   		<a @click.prevent="Search" class="btn btn-search"><i class="material-icons right">search</i>Поиск</a>
				   </div>
				   <div class="col s2 m2 l2 xl2 offset-s2">
					<select ref="select" class="select-size-page browser-default" @change="renderOrderStatus" v-model="statusNow">
						<option value="all" selected>Все</option>
						<option value="placed_order">Оформлен заказ</option>
						<option value="order_processed">Обработан заказ</option>
						<option value="submitted">Отправлен</option>
						<option value="delivery">Доставка</option>
						<option value="received">Получен</option>
						<option value="refund">Возврат</option>		           
						<option value="cancled">Отменён</option>		           
					</select>
				   </div>
				   <div class="col s2 m1 l1  xl1 offset-l1 offset-xl2">
						<a @click="UpdateComponent" class="btn-floating btn-small  blue btn-refresh right"><i class="material-icons">refresh</i></a>
				   </div>
				</div>
				<OrdersTable :orders="Items"/>
				<Paginate
				    v-model="page"
				    :page-count="pageCount"
					:click-handler="paginationHandler"
					:prev-text="'Назад'"
					:next-text="'Вперед'"
					:container-class="'pagination'"
					:active-class="'active blue'"
					>
				</Paginate>
			</section>
    </div>
</template>

<script>
import  {required} from 'vuelidate/lib/validators'
import paginationMixin from "@/mixins/pagination.mixin"
import OrdersTable from "@/components/OrdersTable"
export default {
	name: 'orders',
	metaInfo:{
        title: 'Заказы | BOYKO-CRM'
    },
	data:()=>({
	   select:null,
	   orders:[],
	   pageSize:'10',
	   statusNow:'all',
	   Allorders:[],
	   searchIn:'',
	   serchText:'',
	   SearchItem:[],
	   loading:true

	}),
	mixins:[paginationMixin],
	validations:{
      searchIn:{required},
      serchText:{required}
	},
	async created(){
	  	this.orders = await this.$store.dispatch('fetchOrders')
		this.Allorders = this.orders
	  	this.renderOrder()
	},
	async mounted(){
	  	this.select = M.FormSelect.init(this.$refs.select)
      	M.updateTextFields()

	},
	components:{
      	OrdersTable
	},
	methods:{
		renderOrder(){
			this.orders.reverse()
			this.sPagination(this.orders.map(order =>{
				return{
					...order,

					statusColor : (order.status[order.status.length-1].status_now =='placed_order') ? 'orange' : 
							(order.status[order.status.length-1].status_now =='order_processed') ? 'orange' : 
							(order.status[order.status.length-1].status_now=='submitted') ? 'yellow' :
							(order.status[order.status.length-1].status_now=='delivery') ? 'yellow' :
							(order.status[order.status.length-1].status_now=='received') ? 'green' :
							(order.status[order.status.length-1].status_now=='refund') ? 'blue' :
																				'red',
				
					statusText : order.status[order.status.length-1].status_now
				}
				}),this.pageSize)

			this.loading=false
				
		},
		renderOrderStatus(){
			this.loading=true
			if(this.statusNow=='all'){
				this.orders = this.Allorders
				this.renderOrder()
			}
			else{
				var Order = []
				for( var i=0; i<this.orders.length; i++){
					if(this.orders[i].status[this.orders[i].status.length-1].status_now===this.statusNow){
						Order.push(this.orders[i]) 
					}
				}
				this.orders = Order
				this.renderOrder()
				this.loading=false
				this.orders = this.Allorders
			}
		},
		async UpdateComponent(){
			this.loading=true
			this.pageSize='10',
	        this.statusNow='all',
			this.orders = await this.$store.dispatch('fetchOrders')
			this.Allorders = this.orders
			this.renderOrder()
		},
		Search(){
			if(this.$v.$invalid){
				this.$v.$touch()
			return               
		   }
		   if(this.searchIn=='id'){
				this.SearchItem=[]
					for(var i=0; i<this.orders.length; i++){
						if(this.orders[i].order_id.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.orders[i])
					}
				}
				this.orders = this.SearchItem
			}
			if(this.searchIn=='costs'){
				this.SearchItem=[]
					for(var i=0; i<this.orders.length; i++){
						
						if(this.orders[i].costs.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.orders[i])
					}
				}
				this.orders = this.SearchItem
			}
			if(this.searchIn=='date'){
				this.SearchItem=[]
					for(var i=0; i<this.orders.length; i++){
						if(this.orders[i].order_date.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.orders[i])
					}
				}
				this.orders = this.SearchItem
			}
			if(this.searchIn=='article'){
				this.SearchItem=[]
					for(var i=0; i<this.orders.length; i++){
						if(this.orders[i].article_good.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.orders[i])
					}
				}
				this.orders = this.SearchItem
			}
			if(this.searchIn=='count'){
				this.SearchItem=[]
					for(var i=0; i<this.orders.length; i++){
						if(this.orders[i].count.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.orders[i])
					}
				}
				this.orders = this.SearchItem
			}
			this.renderOrder()
		}
	}

}
</script>