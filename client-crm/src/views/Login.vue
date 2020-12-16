<template>
	<div class="center">
		<h1>Вход</h1>
		<form @submit.prevent="submitHandler">
            <div class="input-field inline">
                <input 
                   id="email_inline" 
                   type="email" 
                   class="validate"
                   v-model.trim="email"
                   :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)|| (error==404)}"
                >
                <label for="email_inline">Email</label>
                <span 
                    v-if="error==404"
                    class="helper-text invalid left"
                >Пользователя с таким емейлом не существует</span>
                <span 
                    v-if="$v.email.$dirty && !$v.email.email"
                    class="helper-text invalid left"
                >Введите коректный емейл</span>
                <span 
                    v-if="$v.email.$dirty && !$v.email.required"
                    class="helper-text invalid left"
                >Поле емейл не должно быть пустым</span>
            </div>
            <div class="input-field inline">
                <input 
                   id="pass_inline"
                   type="password"
                   class="validate"
                   v-model="password"
                   :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength) || (error==401)}"
                >
                <label for="pass_inline">Пароль</label>
                <span 
                    v-if="error==401"
                    class="helper-text invalid left"
                >Неправильный пароль</span>
                <span 
                    v-if="$v.password.$dirty && !$v.password.required"
                    class="helper-text invalid left"
                >Введите коректный пароль</span>
                <span 
                    v-if="$v.password.$dirty && !$v.password.minLength"
                    class="helper-text invalid left"
                >Длина пароля должена быть {{$v.password.$params.minLength.min}} символов. Сейчас {{password.length}}</span>
            </div>
			<div class="fpass"><router-link to="/recovery">Забыли пароль?</router-link></div>
			<button class="btn waves-effect waves-light btn-register" type="submit" name="action">Войти
            </button>
			<div class="link">
				Нет аккаунта?
				<router-link to="/register">Зарегистрироваться</router-link>
			</div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import { request } from 'http'

import  {email, required, minLength} from 'vuelidate/lib/validators'
export default {
    name: 'Login',
    metaInfo:{
        title: 'Вход | BOYKO-CRM'
    },
    data(){
        return{
            email:'',
            password:'',
            error:''
        }
    },
    validations:{
      email:{email, required},
      password:{required, minLength: minLength(8)}
    },
    methods:{
       async submitHandler(){
           if(this.$v.$invalid){
               this.$v.$touch()
                   return
               
           }
           const user ={
                email:this.email,
                password:this.password
            }
            try{
               await this.$store.dispatch('login', user).then(res=>{
                    if(res==401) this.error = 401
                    if(res==404) this.error = 404
                    else this.$router.push('/')             
               })            
            }
            catch(e){
            }  
        }
    }
}
</script>