<template>
    <div class="center">
		<h1 class="recovery-h1">Востановление пароля</h1>
		<form action="post">
			<label for="">Для востановления пароля введите свой емейл</label>
            <div class="input-field inline">
                <input id="email_inline" type="email" class="validate">
                <label for="email_inline">Email</label>
                <span class="helper-text" data-error="wrong" data-success="right">Введите емейл</span>
            </div>
			<button class="btn waves-effect waves-light btn-register" type="submit" name="action">Востановить
            </button>
			<div class="link">
				Вспомнили пароль ?
				<a href="#">Войдите</a>
			</div>
		</form>
	</div>
</template>