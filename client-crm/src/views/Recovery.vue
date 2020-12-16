<template>
    <div class="center">
		<h1 class="recovery-h1">Востановление пароля</h1>
		<form @submit.prevent="submitRecovery">
			<label for="">Для востановления пароля введите свой емейл</label>
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
                    v-if="error==404"
                    class="helper-text invalid left"
                >Такого пользователя не существует</span>
                <span 
                    v-if="$v.email.$dirty && !$v.email.email"
                    class="helper-text invalid left"
                >Введите коректный емейл</span>
                <span 
                    v-if="$v.email.$dirty && !$v.email.required"
                    class="helper-text invalid left"
                >Поле емейл не должно быть пустым</span>
            </div>
			<button class="btn waves-effect waves-light btn-register" type="submit">Востановить
            </button>
			<div class="link">
				Вспомнили пароль ?
				<router-link to="/login">Войдите</router-link>
			</div>
		</form>
	</div>
</template>
<script>
import  {email, required} from 'vuelidate/lib/validators'

export default {
	name:'recovery',
	metaInfo:{
      title: 'Востановление | BOYKO-CRM'
	},
	data:()=>({
		email:'',
		error:null
	}),
	validations:{
      email:{email, required},    
	},
	methods:{
       async submitRecovery(){
            if(this.$v.$invalid){
                this.$v.$touch()
                 return 
			}
			const user = {
				email: this.email
			}
            try{
			   await this.$store.dispatch('recovery', user)
									.then(res=>{
										if(res==404) this.error=404
									})
            }
            catch(e){
              
            }  
           
		}
	}
}
</script>