<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>Профиль</h2>
        </div>
        <section class="app-table">
            <div class="row">
                <div class="col xl4">
                    <form @submit.prevent="submitHandler">
                        <div class="row">
                            <div class="input-field col s12">
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
                </div>
                <div class="col offset-xl2 xl6">
                    <form @submit.prevent="submitChangePassword">
                        <div class="row">
                            <div class="input-field inline">
                                <input 
                                id="pass_inline"
                                type="password"
                                class="validate"
                                v-model="password"
                                :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) || (error==409)}"
                                >
                                <label for="pass_inline">Текущий Пароль</label>
                                <span 
                                    v-if="error==409"
                                    class="helper-text invalid left"
                                >Не правильный пароль</span>
                                <span 
                                    v-if="$v.password.$dirty && !$v.password.required"
                                    class="helper-text invalid left"
                                >Введите коректный пароль</span>
                                <span 
                                    v-if="$v.password.$dirty && !$v.password.minLength"
                                    class="helper-text invalid left"
                                >Длина пароля должена быть {{$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}</span>
                            </div>
                            <div class="input-field inline">
                                <input 
                                id="new_pass_inline"
                                type="password"
                                class="validate"
                                v-model="new_password"
                                :class="{invalid: ($v.new_password.$dirty && !$v.new_password.required) || ($v.new_password.$dirty && !$v.new_password.minLength)}"
                                >
                                <label for="pass_inline">Новый пароль</label>
                                <span 
                                    v-if="$v.new_password.$dirty && !$v.new_password.required"
                                    class="helper-text invalid left"
                                >Введите коректный пароль</span>
                                <span 
                                    v-if="$v.new_password.$dirty && !$v.new_password.minLength"
                                    class="helper-text invalid left"
                                >Длина пароля должена быть {{$v.new_password.$params.minLength.min}} символов. Сейчас {{new_password.length}}</span>
                            </div>
                            <div class="input-field inline">
                                <input 
                                id="confim_pass_inline"
                                type="password"
                                class="validate"
                                v-model="confimpassword"
                                :class="{invalid: ($v.password.$dirty && !$v.confimpassword.sameAsPassword)}"
                                >
                                <label for="confim_pass_inline">Повторите пароль</label>
                                <span 
                                    v-if="($v.password.$dirty && !$v.confimpassword.sameAsPassword)"
                                    class="helper-text invalid left"
                                >Пароли не совпадают</span>
                            </div>
                            <button class="btn" type="submit">Изменить</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import  {required, minLength, sameAs} from 'vuelidate/lib/validators'

export default {
    name: 'Profile',
    metaInfo:{
        title: 'Профиль | BOYKO-CRM'
    },
    data(){
        return{
            fio:'',
            password:'',
            new_password:'',
            confimpassword:'',
            error:null
        }
    },
    validations:{
      fio:{minLength: minLength(6)},
      password:{required, minLength: minLength(8)},
      new_password:{required, minLength: minLength(8)},
      confimpassword:{required, sameAsPassword: sameAs('new_password')}
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
        },
        async submitChangePassword(){
           if(this.$v.$invalid){
                this.$v.$touch()
                return       
           }
           const user={
               password: this.password,
               new_password: this.new_password
           }
           try{
               await this.$store.dispatch('ChangePassword', user).then(res=>{
                   if(res==409){
                        this.error=409
                        return
                   }
                   this.password = '',
                   this.new_password = '',
                   this.confimpassword = '' 
               })
           }
           catch(e){}
        }

    }
}
</script>