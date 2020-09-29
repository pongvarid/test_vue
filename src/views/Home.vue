<template>
<div>
    <h1>{{bluetooth}}</h1> 
    <button class="bg-green-500 text-white p-4 border-b-4 border-green-700"
     @click="switchBluetooth()">Switch Bluetooth</button>
     <pre>{{userProfile}}</pre>
</div>
</template>

  
<script>
import { sync, call} from 'vuex-pathify';
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

            txt: 'Hello World'

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
        bluetooth:sync('test/BLUETOOTH'),
        userProfile:sync('test/RAW_DATA'),
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        async switchBluetooth(){
            this.bluetooth = !this.bluetooth
        },
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style lang='postcss' scoped>

</style>
