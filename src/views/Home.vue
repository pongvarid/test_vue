<template>
<div>
    <div class="text-center mt-24">
        <div class="flex items-center justify-center">
            <svg fill="none" viewBox="0 0 24 24" class="w-12 h-12 text-blue-500" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        </div>
        <!-- <i :class="`em em-hearts text-4xl`" aria-role="presentation" aria-label="BLACK HEART SUIT"></i> -->
        <h2 class="text-4xl tracking-tight ">
            Sign in into your account
        </h2>
        <span @click="dialogRegister = !dialogRegister" class="text-sm">or <a href="#" class="text-blue-500">
                register a new account
            </a>
        </span>
    </div>
    <div class="flex justify-center my-2 mx-4 md:mx-0">
        <form @submit.prevent="login" class="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
            <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Username</label>
                    <input v-model="form.username" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' required>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Password</label>
                    <input v-model="form.password" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required>
                </div>
                <div class="w-full flex items-center justify-between px-3 mb-3 ">
                    <label for="remember" class="flex items-center w-1/2">
                        <input type="checkbox" name="" id="" class="mr-1 bg-white shadow">
                        <span class="text-sm text-gray-700 pt-1">Remember Me</span>
                    </label>
                    <div class="w-1/2 text-right">
                        <a href="#" class="text-blue-500 text-sm tracking-tight">Forget your password?</a>
                    </div>
                </div>
                <div class="w-full md:w-full px-3 mb-6">
                    <button type="submit" class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Sign in</button>
                </div>
            </div>
        </form>
    </div>

    <div v-if="dialogRegister" class="modal absolute  fixed  w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
        <div class="modal-container bg-white w-full h-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto p-2">
            <h1></h1>
            <h2 class="text-4xl tracking-tight ">
                Register
            </h2>
            <form @submit.prevent="register()" class="w-full max-w-xl bg-white rounded-lg shadow-md p-6">
                <div class="flex flex-wrap -mx-3 mb-6">
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Username</label>
                        <input v-model="formRegister.username" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Email</label>
                        <input v-model="formRegister.email" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='email' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Password</label>
                        <input v-model="formRegister.password" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>Confirm Password</label>
                        <input v-model="formRegister.password2" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='password' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>ชื่อ</label>
                        <input v-model="formRegister.firstname" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for='Password'>สกุล</label>
                        <input v-model="formRegister.lastname" class="appearance-none block w-full bg-white text-gray-900 font-medium border border-gray-400 rounded-lg py-3 px-3 leading-tight focus:outline-none" type='text' required>
                    </div>
                    <div class="w-full md:w-full px-3 mb-6">
                        <button type="submit" class="appearance-none block w-full bg-blue-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-blue-500 focus:outline-none focus:bg-white focus:border-gray-500">Register</button>
                    </div>
                     <div class="w-full md:w-full px-3 mb-6">
                        <button @click="dialogRegister = !dialogRegister" 
                        class="appearance-none block w-full bg-orange-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 
                        leading-tight hover:bg-orange-500 focus:outline-none focus:bg-white focus:border-gray-500">Back To Login</button>
                    </div>
                </div>
            </form>

        </div>
    </div>

</div>
</template>

<script>
import {
    sync,
    call
} from 'vuex-pathify';
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
            heart: false,
            txt: 'Hello World',
            form: {
                username: null,
                password: null
            },
            formRegister: {
                username: null,
                password: null,
                firstname: null,
                lastname: null,
                email: null
            },
            dialogRegister:false,

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
        LOGIN: call('authen/login'),
        async login() {
            await this.LOGIN(this.form)
        },

        REGISTER:call('authen/register'),
        async register(){
            await this.REGISTER(this.formRegister);
        },

        load: async function () {

        }
    },
}
</script>

<style lang='postcss' scoped>

</style>
