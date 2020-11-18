<template>
    <div class="center">
		<h1>Регестрация</h1>
		<form action="post">
            <div class="input-field inline">
                <input id="name_inline" type="text" class="validate">
                <label for="name_inline">Имя Фамилия</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
            <div class="input-field inline">
                <input id="email_inline" type="email" class="validate">
                <label for="email_inline">Email</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
            <div class="input-field inline">
                <input id="password_inline" type="password" class="validate">
                <label for="password_inline">Пароль</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
            <div class="input-field inline">
                <input id="confim_pass_inline" type="email" class="validate">
                <label for="confim_pass_inline">Повторите пароль</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
			<div class="checkbox">
				<label>
                    <input type="checkbox" />
                    <span>Я согласен (согласна) на обработку и хранение предоставленных персональных данных в соответствии с <a href="#">Согласием</a></span>
                </label>
			</div>
			<button class="btn waves-effect waves-light btn-register" type="submit" name="action">Зарегестрироваться
            </button>
			<div class="link">
				Уже есть аккаунт ?
				<a href="#">Войдите</a>
			</div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Register',
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        register(){
            const newUser={
                name: this.name,
                email:this.email,
                password:this.password
            }

            axios
             .create({baseURL:'http://localhost:5000'})
             .post('/register', newUser)
             .then(res => {
                 console.log(res)
             }, err =>{
                 console.log(err)
             })
        }
    }
}
</script>