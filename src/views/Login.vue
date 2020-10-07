<template>
<div>
    <div class="m-3 p-3 rounded shadow-2xl border-green-700 border-b-3">
        <h2 class="text-3xl"><i class="em em-bicyclist text-2xl" aria-role="presentation" aria-label="BICYCLIST"></i> &nbsp;Sign In</h2>
        <p class="ml-6">Plese input text in this from</p>
        <form @submit.prevent="prepareLogin()" class="flex flex-col md:flex-row">
        <input v-model="form.username" class="p-4 mt-4 rounded border-2" required placeholder="Username" type="text" >
        <input v-model="form.password" class="p-4 mt-4 rounded border-2" required placeholder="Password" type="password" >
        <button class="mt-4 p-4 text-white bg-green-500 rounded" type="submit"> Login </button>
    </form>
    <pre>{{test_data}}</pre> 
    </div>
      
</div>
</template>

    
<script>
import {sync , call} from 'vuex-pathify';
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
            form : {
                username : '',
                password: ''
            },
            txt: 'Hello World',
            test_data:[],

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

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        logined:call('test/login'),
        getData:call('test/getTest'),
        async prepareLogin(){
           
            // let im_login = await this.logined(this.form);
            // console.log('[กำลัง login นะจ๊ะ]',im_login);
            this.test_data = await this.getData();  
            await this.$router.push('/')
        },
        /******* Methods default run ******/
        load: async function () {
            
        }
    },
}
</script>

<style lang='postcss' scoped>

</style>
