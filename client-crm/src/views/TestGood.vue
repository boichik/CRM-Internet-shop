<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2><router-link to="/api">Назад</router-link>>Тест сервиса</h2>
            <hr>
        </div>
        <section  class="app-table">
            <div class="row test-api-container">
                <div class="col s12">
                <ul ref="tabs" class="tabs">
                    <li class="tab col s4"><a class="active" href="#test1">Заказ</a></li>
                    <li class="tab col s4"><a href="#test2">Товар</a></li>
                    <li class="tab col s4"><a href="#test3">Клиент</a></li>
                </ul>
                </div>
                <div id="test1" class="col s4">
                    <form @submit.prevent="submitHandler">
                        <div class="row">
                            <div class="input-field col s12">
                                    <input  id="article_good" type="text" class="validate" disabled :value="this.article_good">
                                    <label for="article_good">Артикул</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="delivery" type="text" class="validate" disabled :value="'test'">
                                    <label for="delivery">Доставка</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="address" type="text" class="validate" disabled :value="'Test, Grushevskogo 23'">
                                    <label for="address">Адресс</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="costs" type="text" class="validate" v-model.trim="this.costs">
                                    <label for="costs">Цена</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="g_bio" type="text" class="validate" v-model.trim="this.g_bio">
                                    <label for="g_bio">ФИО</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="g_phone" type="text" class="validate" v-model.trim="this.g_phone">
                                    <label for="g_phone">Телефон</label>
                            </div>
                        </div>
                        <button class="btn col s6 offset-s3" type="submit" name="action">Отправить</button>
                    </form>
                </div>
                <div id="test2" class="col s4 offset-s4">
                    <form @submit.prevent="submitGood">
                        <div class="row">
                            <div class="input-field col s12">
                                    <input  id="manufacturer" type="text" class="validate" disabled :value="this.manufacturer">
                                    <label for="manufacturer">Производитель</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="5" type="text" class="validate" disabled :value="10">
                                    <label for="5">Количество</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="6" type="text" class="validate" disabled :value="this.article_good">
                                    <label for="6">Артикул</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="name" type="text" class="validate" v-model.trim="name">
                                    <label for="name">Название</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="price" type="text" class="validate" v-model.trim="price">
                                    <label for="price">Первая цена</label>
                            </div>
                        </div>
                        <button class="btn col s6 offset-s3" type="submit" name="action">Отправить</button>
                    </form>
                </div>
                <div id="test3" class="col s4 offset-s8">
                    <form @submit.prevent="submitCostumer">
                        <div class="row">
                            <div class="input-field col s12">
                                    <input  id="bio" type="text" class="validate" v-model.trim="this.bio">
                                    <label for="bio">ФИО</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="phone" type="text" class="validate" v-model.trim="this.phone">
                                    <label for="phone">Телефон</label>
                            </div>
                            <div class="input-field col s12">
                                    <input  id="email" type="text" class="validate" v-model.trim="this.email">
                                    <label for="email">Емейл</label>
                            </div>
                        </div>
                        <button class="btn col s6 offset-s3" type="submit" name="action">Отправить</button>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    name:'testgood',
    data:()=>({
        tabs:null,
        api:'',

        order_date: '',
        costs:'',
        article_good:'test',
        count:'',
        delivery:'',
        comment:'',
        g_bio:'',
        g_phone:'',
        email:'',
        address:'',
       
        manufacturer:'test',
        name:'',
        price:'',

        bio:'',
        phone:'',
    }),
    async mounted(){
        if(!Object.keys(this.$store.getters.info).length){
            await this.$store.dispatch('fetchInfo')
        }
        this.api = await this.$store.getters.info.api_key
        this.tabs = M.Tabs.init(this.$refs.tabs)
        M.updateTextFields()
       
    },
    methods:{
       async submitHandler(){
            var data = new Date()
           const order={
            order_date: data,
            costs:this.costs,
            article_good:this.article_good,
            count:"1",
            delivery:'test',
            comment:'test',
            bio:this.g_bio,
            phone:this.g_phone,
            email:'test@gmail.com',
            address:"Test, Grushevskogo 23"
           }
           const API_KEY = this.api
          // const API_KEY='3b537b9c7cf8eec5506c56469b998bfaa7596a88'
            this.$axios.create({baseURL:'http://localhost:5000'})
                .post('/api/addOrder', {API_KEY,order})
                .then(res =>{
                    console.log(res.data.title)
                  }, err =>{
                      console.log(err.title)
                  })
            this.order_date= '',
            this.costs='',
            this.article_good='',
            this.bio=''
       
        },
        async submitGood(){
            const good={
                manufacturer:this.manufacturer,
                name:this.name,
                price:this.price,
                article:this.article_good,
                count: '10'
            }
            const API_KEY =this.api
          // const API_KEY='3b537b9c7cf8eec5506c56469b998bfaa7596a88'
            this.$axios.create({baseURL:'http://localhost:5000'})
                .post('/api/addGood', {API_KEY,good})
                .then(res =>{
                    console.log(res.data.title)
                  }, err =>{
                      console.log(err.title)
                  })
            this.manufacturer='',
            this.name='',
            this.price='',
            this.article=''
        },
    }
}
</script>