<template>
	<div class="center">
		<h1>Вход</h1>
		<form action="post">
            <div class="input-field inline">
                <input id="email_inline" type="email" class="validate">
                <label for="email_inline">Email</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
            <div class="input-field inline">
                <input id="pass_inline" type="password" class="validate">
                <label for="pass_inline">Пароль</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите пароль</span>
            </div>
			<div class="fpass">Забыли пароль?</div>
			<button class="btn waves-effect waves-light btn-register" type="submit" name="action">Войти
            </button>
			<div class="link">
				Нет аккаунта?
				<a href="#">Зарегистрироваться</a>
			</div>
		</form>
	</div>
</template>
<script>
import axios from 'axios'
import { request } from 'http'
export default {
    name: 'Login',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        login(){
            const user ={
                email:this.email,
                password:this.password
            }
            axios
             .create({baseURL:'http://localhost:5000'})
             .post('/login', user)
             .then(res => {
                    localStorage.setItem('token', res.data.token);
                    this.$router.push('/')
                }, err =>{
                    console.log(err)
                })
        }
    }
}
</script>