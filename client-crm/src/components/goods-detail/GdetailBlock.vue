<template>
    <div>
        <div class="good-detail-form">
            <div class="input-field ">
                <input id="manufacturer" type="text" class="validate disable" :disabled="this.disableClass"  v-model.lazy="Umanufacturer">
                <label for="manufacturer">Производитель</label>
            </div>
            <div class="input-field ">
                <input id="name" type="text" class="validate" :disabled="this.disableClass"  v-model.lazy="Uname">
                <label for="name">Название</label>
            </div>
            <div class="input-field ">
                <input id="price" type="text" class="validate" :disabled="this.disableClass"  v-model.lazy="Uprice">
                <label for="price">Цена</label>
            </div>
            <div class="input-field ">
                <input id="article" type="text" class="validate" :disabled="this.disableClass" v-model.lazy="Uarticle">
                <label for="article">Артикул</label>
            </div>
            <div class="input-field ">
                <input id="count" type="text" class="validate" :disabled="this.disableClass"  v-model.lazy="Ucount">
                <label for="count">Количество</label>
            </div>
            <div class="row">
                <a @click.prevent="editGood" class="btn col s4">Изменить</a>
                <button @click.prevent='updateGood' :disabled='this.disableClass' class="btn col s4 offset-s4">Сохранить</button>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    props:{
        good:{
            required:true
        }
    },
    data:()=>({
        disableClass:true,
        Umanufacturer:'',
        Uname: '',
        Uprice:'',
        Uarticle:'',
        Ucount:'',
    }),
    mounted(){
        this.createDetailBlock()
        this.$nextTick(M.updateTextFields);
    },
    methods:{
        createDetailBlock(){
            this.Umanufacturer = this.good.manufacturer
            this.Uname = this.good.name
            this.Uprice = this.good.price
            this.Uarticle = this.good.article
            this.Ucount = this.good.count
        },
        editGood(){
            if(this.disableClass==true){
                this.disableClass=false
            }else{
                this.disableClass=true
            }

        },
        async updateGood(){
            const idx = this.$route.params.id
            const data ={
                id: idx,
                manufacturer: this.Umanufacturer,
                name: this.Uname,
                price: this.Uprice,
                article: this.Uarticle,
                count: this.Ucount
            }
            await this.$store.dispatch('updateGoodById',data)
            this.$emit('updateGdetail')
        }
    }
    
}
</script>