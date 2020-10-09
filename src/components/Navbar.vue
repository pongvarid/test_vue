<template>
<nav id="header" class="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-blue-400 ">
    <div class="w-full flex items-center justify-between mt-0 px-6 py-2 flex-wrap">
        <label @click="menu = !menu" for="menu-toggle" class="cursor-pointer md:hidden block">
            <svg class="fill-current text-blue-600" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
        </label>   
        <input class="hidden" type="checkbox" id="menu-toggle">

        <div class=" md:flex md:items-center md:w-auto w-full order-3 md:order-1" 
        id="menu"  v-if="menu">
            <nav>
                <ul class="md:flex items-center justify-between text-base text-blue-600 pt-4 md:pt-0">
                    <li><button @click="changePage('/')" class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >Home</button></li>
                    <li><button @click="changePage('/bluetooth')" class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >Bluetooth</button></li>
                    <li><button @click="changePage('/about')" class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >About</button></li>
               <li><button @click="changePage('/graph')" class="inline-block no-underline hover:text-black font-medium text-lg py-2 px-4 lg:-ml-2" >Graph</button></li>
               
                </ul>
            </nav>
        </div>

        <!-- <div class="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
            <div class="auth flex items-center w-full md:w-full">
                <button class="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Sign in</button>
                <button class="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100">Sign up</button>
            </div>
        </div> -->
    </div>
</nav>
</template>

<script>
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
            menu:false,
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

    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        async changePage(page){
            this.$router.push(page);
            this.menu = false;
        },
        /******* Methods default run ******/
        load: async function () {}
    },
}
</script>

<style lang='postcss' scoped>

</style>
