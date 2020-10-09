<template>
<div>
    <canvas id="badCanvas1" width="400" height="400"></canvas>

</div>
</template>

<script>
import {
    sync,
    call
} from 'vuex-pathify';
import Chart from 'chart.js';
export default {
    name: 'Root',
    /*-------------------------ประกาศ components ---------------------------------------*/
    components: {

    },
    /*-------------------------รับค่าเมื่อเราเป็น components---------------------------------------*/
    props: {

    },
    /*-------------------------ประกาศตัวแปรที่ใช้ ผูกกับ v-model ---------------------------------------*/
    data() {
        return {
            txt: 'Hello World',

        };
    },
    /*------------------------- สิ่งทที่อยู่ในนี้จะถูกรัยเมื่อโหลด ------------------------------------------*/
    mounted: async function () {
        /**** เรียกใช้ methods ชื่อ load() */
        await this.load();
    },
    /*------------------------- กระทำการตอน router ถูกโหลดเข้ามา------------------------------------------*/
    async beforeRouteEnter(to, from, next) {
        next()
    },
    /*-------------------------ใช้จัดการ operation  หรือ คำนวณค่าต่างๆ (คล้าย methods)------------------------------------------*/
    computed: {
        cadence:sync('test/CADENCE')
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {

        load: async function () {
            let ctx = document.getElementById('badCanvas1')
            let myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels:['1','2','3','4'],
                    datasets :[
                        // {
                        //     label: 'Heart Rate',
                        //     data : [1,2,3,4],
                        //     borderColor:'red',
                        //     fill:false
                        // },
                         {
                            label: 'Cadence Rate',
                            data : this.cadence,
                            borderColor:'blue',
                            fill:false
                        },
                        // {
                        //     label: 'Wheel Rate',
                        //     data : [7,6,3,6],
                        //     borderColor:'green',
                        //     fill:true
                        // },
                    ]
                },
                options: {
                    tooltips: {
                        mode: 'point'
                    }
                }
            });
        }
    },
}
</script>

<style lang='postcss' scoped>

</style>
