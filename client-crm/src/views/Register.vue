<template>
    <div class="center">
		<h1>Регестрация</h1>
		<form @submit.prevent="submitHandler">
            <div class="input-field inline">
                <input
                    id="name_inline"
                    type="text"
                    class="validate"
                    v-model.trim="name"
                    :class="{invalid: ($v.name.$dirty && !$v.name.required)}"
                >
                <label for="name_inline">Имя Фамилия</label>
                <span 
                    v-if="$v.name.$dirty && !$v.name.required"
                    class="helper-text invalid left"
                >Введите ваше имя</span>
            </div>
            <div class="input-field inline">
                <input 
                   id="email_inline" 
                   type="email" 
                   class="validate"
                   v-model.trim="email"
                   :class="{invalid: ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                >
                <label for="email_inline">Email</label>
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
                   :class="{invalid: ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
                >
                <label for="pass_inline">Пароль</label>
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
			<div class="checkbox">
				<label>
                    <input type="checkbox" v-model="check"/>
                    <span>Я согласен (согласна) на обработку и хранение предоставленных персональных данных в соответствии с <a href="#">Согласием</a></span>
                </label>
			</div>
			<button class="btn waves-effect waves-light btn-register" type="submit" name="action">Зарегестрироваться
            </button>
			<div class="link">
				Уже есть аккаунт ?
				<router-link to="/login">Войдите</router-link>
			</div>
		</form>
	</div>
</template>
<script>
import Axios from 'axios'

import  {email, required, minLength, sameAs} from 'vuelidate/lib/validators'
export default {
    name: 'Register',
    data:() =>({      
        name:'',
        email:'',
        password:'',
        confimpassword:'',
        check:false    
    }),
    validations:{
      name:{required},
      email:{email, required},
      password:{required, minLength: minLength(8)},
      confimpassword:{required, sameAsPassword: sameAs('password')
      
    },
      check:{ checked: v=> v}
    },
    methods:{
       async submitHandler(){
            if(this.$v.$invalid){
                this.$v.$touch()
                 return 
            }
            const newUser={
                name: this.name,
                email:this.email,
                password:this.password
            }
            try{
               await this.$store.dispatch('register', newUser).then(
                    await this.$store.dispatch('login', newUser).then(()=>this.$router.push('/'))     
               )       
            }
            catch(e){
                console.log(e)
            }  
           
        }

        // register(){
        //     const newUser={
        //         name: this.name,
        //         email:this.email,
        //         password:this.password
        //     }

        //     axios
        //      .create({baseURL:'http://localhost:5000'})
        //      .post('/register', newUser)
        //      .then(res => {
        //          console.log(res)
        //      }, err =>{
        //          console.log(err)
        //      })
        // }
    }
}
</script>