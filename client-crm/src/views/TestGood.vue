<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>TEST GOODS</h2>
            <hr>
        </div>
        <section class="app-table">
            <form @submit.prevent="submitHandler">
               <div class="input-field col s6">
                    <input placeholder="Placeholder" id="1" type="text" class="validate" v-model.trim="costs">
                    <label for="1">Цена</label>
               </div>
               <div class="input-field col s6">
                    <input placeholder="Placeholder" id="1" type="text" class="validate" v-model.trim="article_goods">
                    <label for="1">Артикул</label>
               </div>
               <div class="input-field col s6">
                    <input placeholder="Placeholder" id="1" type="text" class="validate" v-model.trim="bio">
                    <label for="1">ФИО</label>
               </div>
               <button class="waves-effect waves-light btn" type="submit" name="action">SEND
            </button>
            </form>
        </section>
    </div>
</template>
<script>
export default {
    name:'testgood',
    data:()=>({
        order_date: '',
        costs:'',
        article_goods:'',
        count:'',
        delivery:'',
        comment:'',

        bio:'',
        phone:'',
        email:'',
        address:''
    }),
    methods:{

       async submitHandler(){
           const order={
            order_date: new Date().toLocaleString(),
            costs:this.costs,
            article_goods:this.article_goods,
            count:"1",
            delivery:'NP',
            comment:'-',
            bio:this.bio,
            phone:'+38095967899',
            email:'rr@rutw.ru',
            address:"Ivan, Shevchenka 12"
           }
           const API_KEY='3b537b9c7cf8eec5506c56469b998bfaa7596a88'
            this.$axios.create({baseURL:'http://localhost:5000'})
                .post('/api/addOrder', {API_KEY, order})
                .then(res =>{
                    console.log(res.data.title)
                  }, err =>{
                      console.log(err)
                  })
        }
    }
}
</script>