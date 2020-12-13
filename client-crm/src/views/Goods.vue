<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>Товары</h2>
            <hr>
        </div>
        <Loader v-if="loading"/>
        <p class="warn-text" v-else-if="!goods.length">На данный момент товаров еще нет</p>
        <section v-else class="app-table">
            	<div class="row tools-container">
					<div class="page-select-container col s4 m4 l2 xl1">
						<select class="select-size-page page-select browser-default" @change="renderGoods"  v-model="pageSize" >
							<option value="10" selected>10</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
					</div>
					<div class="input-field col s3 m3 l3 xl2">
						<select ref="select" class="browser-default"
						  
						  v-model="searchIn"
						  :class="{invalid: ($v.searchIn.$dirty && !$v.searchIn.required)}"  
						>
							<option value="" disabled selected>Критерии поиска</option>
							<option value="id">Номер</option>
							<option value="name">Название</option>
							<option value="price">Цена</option>
							<option value="article">Артикул</option>
							<option value="count">Количество</option>
							<option value="manufacturer">Производитель</option>
						</select>
						<span 
							v-if="$v.searchIn.$dirty && !$v.searchIn.required"
							class="helper-text invalid left"
						>Сделайте выбор по Критерии</span>
					</div>
					<div class="input-field col s4 m4 l2 xl2">
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
				   <div class="col s1 m4 l4 xl2">
				   		<a @click.prevent="SearchGoods" class="btn btn-search"><i class="material-icons right">search</i>Поиск</a>
				   </div>
				   <div class="col s2 m1 l1  xl1 offset-xl4">
						<a @click="UpdateGoods" class="btn-floating btn-small  blue btn-refresh right"><i class="material-icons">refresh</i></a>
				   </div>
				</div>
            <GoodsTable :goods='Items'/>
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
import GoodsTable from "@/components/GoodsTable"
export default {
    name: 'goods',
    data:()=>({
        select:null,
        goods:[],
        pageSize:'10',
        Allgoods:[],
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
    components:{
        GoodsTable
    },
    async mounted(){
	  this.goods = await this.$store.dispatch('fetchGoods')
	//   this.select = M.FormSelect.init(this.$refs.select)
    //   M.updateTextFields()
	  this.Allgoods = this.goods
	  this.renderGoods()
    },
    methods:{
		renderGoods(){
			this.sPagination(this.goods, this.pageSize)
			this.loading=false
				
        },
        SearchGoods(){
			if(this.$v.$invalid){
				this.$v.$touch()
			    return               
            }
            
            this.loading=true

            if(this.searchIn=='id'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].good_id.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }
            if(this.searchIn=='name'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].name.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }
            if(this.searchIn=='price'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].price.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }
            if(this.searchIn=='article'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].article.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }
            if(this.searchIn=='count'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].count.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }
            if(this.searchIn=='manufacturer'){
				this.SearchItem=[]
					for(var i=0; i<this.goods.length; i++){
						if(this.goods[i].manufacturer.toString().includes(this.serchText)===true){
							this.SearchItem.push(this.goods[i])
					}
				}
				this.goods = this.SearchItem
            }


            this.renderGoods()
        },
        async UpdateGoods(){
            this.loading=true
			this.pageSize='10',
			this.goods = await this.$store.dispatch('fetchGoods')
			this.Allgoods = this.goods
			this.renderGoods()
        }
    }

}
</script>