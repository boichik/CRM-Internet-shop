<template>
    <div class="api-container">
            <div  class="api-input">
                <p>API: {{userInfo}}</p>
            </div>
    </div>
</template>
<script>
export default {
    data:()=>({
        tabs:null,
        userInfo:[],
        host:'localhost:5000'
    }),
    async mounted(){
        this.tabs = M.Tabs.init(this.$refs.tabs)
        this.userInfo = await this.$store.getters.info.api_key
    }
}
</script>