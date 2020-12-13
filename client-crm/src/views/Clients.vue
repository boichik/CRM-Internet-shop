<template>
    <div class="app-page-container">
            <div class="page-title">
				<h2>Клиенты</h2>
				<hr>
			</div>
			<Loader v-if="loading"/>
			<p class="warn-text" v-else-if="!clients.length">На данный момент клиентов еще нет</p>
			<section v-else class="app-table">
				<div class="row tools-container">
					<div class="page-select-container col s4 m3 l2 xl1">
						<select class="select-size-page page-select browser-default" @change="renderComponent"  v-model="pageSize" >
							<option value="10" selected>10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
					<div class="input-field col s4 m3 l3 xl2">
						<select ref="select" class="browser-default"
						  v-model="searchIn"
						  :class="{invalid: ($v.searchIn.$dirty && !$v.searchIn.required)}"  
						>
						<option value="" disabled selected>Критерии поиска</option>
						<option value="id">ID</option>
						<option value="name">ФИО</option>
						<option value="email">Емейл</option>
						<option value="phone">Номер телефона</option>
						</select>

						<span 
							v-if="$v.searchIn.$dirty && !$v.searchIn.email"
							class="helper-text invalid left"
						>Сделайте выбор по Критерии</span>
					</div>
					<div class="input-field col s3 m3 l3 xl2">
						<input  id="first_name" type="text" class="validate"
						  v-model="serchText"
						  :class="{invalid: ($v.serchText.$dirty && !$v.serchText.required)}"  
						>
						<span 
							v-if="$v.serchText.$dirty && !$v.serchText.email"
							class="helper-text invalid left"
						>Введите текст для поиска</span>
						<label for="first_name">Поиск...</label>
				   </div>
				   <div class="col s2 m4 l3 xl2">
				   		<a @click.prevent="Search" class="btn btn-search"><i class="material-icons right">search</i>Поиск</a>
				   </div>
				   <div class="col s2 l1 xl1 offset-xl4">
					   <a @click="UpdateComponent" class="btn-floating btn-small blue btn-refresh right"><i class="material-icons">refresh</i></a>
				   </div>
				</div>
				<ClientsTable :clients='Items'/>
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
import ClientsTable from '@/components/ClientsTable'
export default {
	name:'clients',
	data:()=>({
	   clients:[],
	   select:null,
	   pageSize:'10',
	   Allclients:[],
	   searchIn:'',
	   serchText:'',
	   SearchItem:[],
	   loading: true
	}),
	mixins:[paginationMixin],
	validations:{
      searchIn:{required},
      serchText:{required}
    },
	async mounted(){
	  this.clients = await this.$store.dispatch('fetchCostumers')
	  this.select = M.FormSelect.init(this.$refs.select)
	  M.updateTextFields()
	  this.Allclients = this.clients
	  this.renderComponent()
	},
	methods:{
      renderComponent(){
		  this.sPagination(this.clients, this.pageSize)
		  this.loading=false
	  },
	  Search(){
	  this.loading=true
		  if(this.$v.$invalid){
               this.$v.$touch()
            return               
		   }
		  if(this.searchIn=='id'){
			this.SearchItem=[]
			   	for(var i=0; i<this.clients.length; i++){
					if(this.clients[i].costumer_id.toString().includes(this.serchText)===true){
						this.SearchItem.push(this.clients[i])
				}
			  }
			  this.clients = this.SearchItem
		  }
		  if(this.searchIn=='name'){
			  this.SearchItem=[]
			  for(var i=0; i<this.clients.length; i++){
			    if(this.clients[i].bio.toLowerCase().includes(this.serchText.toLowerCase())===true){
					this.SearchItem.push(this.clients[i])
				}
			  }
			  this.clients = this.SearchItem		 
		  }
		  if(this.searchIn=='email'){
			   this.SearchItem=[]
			   	for(var i=0; i<this.clients.length; i++){
					if(this.clients[i].email.toLowerCase().includes(this.serchText.toLowerCase())===true){
						this.SearchItem.push(this.clients[i])
				}
			  }
			  this.clients = this.SearchItem
		  }
		  if(this.searchIn=='phone'){
			  	this.SearchItem=[]
			   	for(var i=0; i<this.clients.length; i++){
					if(this.clients[i].phone.toString().includes(this.serchText)===true){
						this.SearchItem.push(this.clients[i])
				}
			  }
			  this.clients = this.SearchItem
		  }

		  this.renderComponent()

			// Добавить обработку ошибки	   
	  },
	  async UpdateComponent(){
		this.loading=true
		this.pageSize='10'
		this.clients = await this.$store.dispatch('fetchCostumers')
		this.Allclients = this.clients
		this.searchIn = this.serchText = ''
		this.SearchItem =[]
		this.renderComponent()

	  }

	},
	components:{
		ClientsTable
	}
}
</script>