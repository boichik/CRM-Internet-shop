<template>
    <div class="graph ">
            <canvas ref="canvas" class="graph-canvas"></canvas>
    </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
export default {
    name:'home-chart',
    extends: Bar,
    props:{
       reports:{
           type: Array,
           required: true
       }
    },
    mounted(){
        this.renderChart({
               labels: this.reports.map(r => r.report_date.slice(0,7)),
               datasets:[
                    {
                            label : 'Доходы за месяц',
                            data: this.reports.map( r =>{
                                return r.income
                            }),
                            backgroundColor: [
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',
                                'rgba(38, 215, 20, 0.5)',

                            ],
                            borderColor: [
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                            ],
                            borderWidth: 1
                    },
                    {
                            label : 'Возможный доход',
                            data: this.reports.map( r =>{
                                return r.possible
                            }),
                            backgroundColor: [
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                                'rgba(255, 0, 0, 0.5)',
                            ],
                            borderColor: [
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                                'rgba(0, 0, 0, 1)',
                            ],
                            borderWidth: 1
                    }
                ]
           },{
            //    responsive: true,
            //    maintainAspectRatio: false,
               aspectRatio: 1
           })
    }
}
</script>