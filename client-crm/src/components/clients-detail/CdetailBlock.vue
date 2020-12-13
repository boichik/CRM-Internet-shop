<template>
    <div class="detail-block green" >
        <p>ФИО : {{client.bio}}</p>
        <p>Емейл : {{client.email}}</p>
        <p>Телефон : {{client.phone}}</p>
    </div>
</template>
<script>
export default {
    props:{
        client:{
            required:true
        }
    }
}
</script>