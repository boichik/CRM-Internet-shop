<template>
    <div class="app-page-container">
        <div class="page-title">
            <h2>Главная</h2>
            <hr>
        </div>
        <section class="app-table">
        </section>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name: 'Home',
    mounted(){
       axios
        .create({baseURL:'http://localhost:5000'})
        .get('/user', { headers : { token : localStorage.getItem('token')}})
        .then(res => {
            console.log(res)
        })
    }
}
</script>