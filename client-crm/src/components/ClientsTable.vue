<template>
        <table class="client-table">
            <thead>
                <tr>
                    <th class="th-sort" @click="sortId" >#ID<i class="material-icons icon-table">{{Iid}}</i></th>
                    <th class="th-sort" @click="sortBIO">Имя Фамилия<i class="material-icons icon-table">{{Iname}}</i></th>
                    <th class="th-sort" @click="sortEmail">Email<i class="material-icons icon-table">{{Iemail}}</i></th>
                    <th class="th-sort" @click="sortPhone">Телефон<i class="material-icons icon-table">{{Iphone}}</i></th>
                    <th>Детали</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="client of clients" :key="client.id">
                <td>{{client.costumer_id}}</td>
                <td>{{client.bio}}</td>
                <td>{{client.email}}</td>
                <td>+{{client.phone}}</td>
                <td><router-link :to="/clients-detail/+client.costumer_id" class="waves-effect waves-light btn"><i class="material-icons">more_vert</i></router-link></td>
                </tr>
            </tbody>
        </table>
</template>
<script>
import { type } from 'os'
export default {
    props:{
        clients:{
            type:Array
        }
    },
    data(){
        return{
            Iid:'',
            Iname:'',
            Iemail:'',
            Iphone:'',
        }
    },
    methods:{
        sortId(){
            if(this.Iid==''){
                this.clients.sort((a,b) => a.costumer_id - b.costumer_id)
                this.Iid='arrow_drop_down'
            }else{
                    if(this.Iid=='arrow_drop_down'){
                        this.clients.sort((a,b) => b.costumer_id - a.costumer_id)    
                            this.Iid='arrow_drop_up'            
                    }
                    else{
                            if(this.Iid=='arrow_drop_up'){
                            this.Iid=''
                        }
                    }
                }
        },
        sortBIO(){
            if(this.Iname==''){
                this.clients.sort((a,b) => a.bio.localeCompare(b.bio))
                this.Iname='arrow_drop_down'
            }else{
                    if(this.Iname=='arrow_drop_down'){
                        this.clients.sort((a,b) => b.bio.localeCompare(a.bio))    
                            this.Iname='arrow_drop_up'            
                    }
                    else{
                            if(this.Iname=='arrow_drop_up'){
                            this.Iname=''
                        }
                    }
                }
        },
        sortEmail(){
            if(this.Iemail==''){
                this.clients.sort((a,b) => a.email.localeCompare(b.email))
                this.Iemail='arrow_drop_down'
            }else{
                    if(this.Iemail=='arrow_drop_down'){
                        this.clients.sort((a,b) => b.email.localeCompare(a.email))    
                            this.Iemail='arrow_drop_up'            
                    }
                    else{
                            if(this.Iemail=='arrow_drop_up'){
                            this.Iemail=''
                        }
                    }
                }
        },
        sortPhone(){
            if(this.Iphone==''){
                this.clients.sort((a,b) => a.phone - b.phone)
                this.Iphone='arrow_drop_down'
            }else{
                    if(this.Iphone=='arrow_drop_down'){
                        this.clients.sort((a,b) => b.phone - a.phone)    
                            this.Iphone='arrow_drop_up'            
                    }
                    else{
                            if(this.Iphone=='arrow_drop_up'){
                            this.Iphone=''
                        }
                    }
                }
        },

    }
}
</script>