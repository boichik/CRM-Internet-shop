<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>API</h2>
            <hr>
        </div>
        <section class="app-table">
            <div class="api-container">
                <div  class="api-input">
                    <p>API: {{userInfo}}</p>
                </div>
            </div>
            <div class="row">
               <router-link to="/apiexample" class="waves-effect waves-light btn btn-api col offset-s1 s2 lx2 offset-lx2">Примеры</router-link>
               <router-link to="/Wiki" class="waves-effect waves-light btn btn-api col offset-s2 s2 lx2 offset-lx2">API Запросы</router-link>
               <router-link to="/testg" class="waves-effect waves-light btn btn-api col offset-s2 s2 lx2 offset-lx2">Тест API</router-link>    
            </div>        
        </section>
    </div>
</template>
<script>
export default {
    name: 'Documentation',
    data:()=>({
        userInfo:[]
    }),
   async mounted(){
        if(!Object.keys(this.$store.getters.info).length){
            await this.$store.dispatch('fetchInfo')
        }
        this.userInfo = await this.$store.getters.info.api_key
    },
    methods:{
        
    }

}
</script>