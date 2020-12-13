<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>Профиль</h2>
        </div>
        <section class="app-table">
            <form @submit.prevent="submitHandler">
            <div class="row">
                <div class="input-field col s3">
                    <input 
                      id="last_name" 
                      type="text" 
                      class="validate"
                      v-model="fio"
                      :class="{invalid:($v.fio.$dirty && !$v.fio.minLength)}"
                    >
                    <label for="last_name">ФИО</label>
                    <span 
                        v-if="$v.fio.$dirty && !$v.fio.minLength"
                        class="helper-text invalid left"
                    >Длина имени должена быть {{$v.fio.$params.minLength.min}} символов. Сейчас {{fio.length}}</span>
                    <button class="btn" type="submit">Изменить</button>
                </div>
            </div>
            </form>
        </section>
    </div>
</template>
<script>
import  {required,minLength} from 'vuelidate/lib/validators'
export default {
    name: 'Profile',
    data(){
        return{
            fio:''
        }
    },
    validations:{
      fio:{minLength: minLength(6)},
    },
    methods:{
       async submitHandler(){
           if(this.$v.$invalid){
               this.$v.$touch()
                   return
               
           }
           const user ={
                fio: this.fio
            }
            try{
               await this.$store.dispatch('ChangeUserName', user).then(
                   this.fio=''
               )
              // this.$router.push('/')         
            }
            catch(e){
                console.log(e)
            }  
       }
    }

}
</script>