<template>
<div>
    <h1>{{bluetooth}}</h1>
    <button class="bg-green-700 text-white p-4 border-b-4 border-green-700" @click="scanBle()">Scan Bluetooth</button>
    <div v-for="list,index in bleList" :key="index">
        <pre>{{list}}</pre>
        <button class="bg-blue-700 text-white p-2 border-b-4 border-green-700" v-if="list" @click="connect(list)">Connect</button>

    </div>
    <hr>
    <pre>{{err}}</pre>
    <hr>
    <div v-if="current">
        <pre>{{current}}</pre>
        <button class="bg-red-700 text-white p-2 border-b-4 border-green-700" @click="disconnect()">Disconnect</button>
        <hr>

        <button class="bg-green-700 text-white p-2 border-b-4 border-green-900" @click="readData()">Read Data</button> &nbsp; &nbsp;
        <button class="bg-red-700 text-white p-2 border-b-4 border-green-700" @click="stopData()">Stop Data</button>
    </div>
</div>
</template>

<script>
const serviceUUID = '1816'
const characteristicUUID = '2a5b'
const readCharacteristicUUID = '2a5c'
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

            txt: 'Hello World',
            ble: ble,
            bleList: [],
            err: null,
            current: null,

            data:null,
            time:null,
            lastData:null,
            lastTime:null,
            rpm:null,

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
        bluetooth: sync('test/BLUETOOTH'),
        userProfile: sync('test/RAW_DATA'),
    },
    /*-------------------------Methods------------------------------------------*/
    methods: {
        async switchBluetooth() {
            this.bluetooth = !this.bluetooth
        },
        async scanBle() {
            console.log('scanning...')
            this.ble.startScan([serviceUUID],
                (device) => {
                    console.log(JSON.stringify(device))
                    this.bleList.push(device)

                },
                (error) => {
                    console.log(error)
                    this.err = error
                })
        },
        async connect(device) {
            this.current = device
            this.ble.connect(device.id, () => {
                this.ble.read(device.id, serviceUUID, readCharacteristicUUID,
                    (r) => {
                        let data = new Uint16Array(r)
                        console.log(data)
                    },
                    (e) => {
                        console.log(e);
                    })

            }, () => {
                console.log('disconnected')
            })

        },
        async disconnect() {
            this.ble.disconnect
            this.ble.disconnect(this.current.id,
                (r) => {
                    console.log(r);
                },
                (e) => {
                    console.log(e)
                }
            )
        },
        async readData() {
            this.ble.startNotification(this.current.id, serviceUUID, characteristicUUID,
                (r) => {
                    let data = new Uint8Array(r)
                    console.log('[READ]', data); 
                },
                (e) => {
                    console.log('[ERROR]', e)
                }
            )
        },    
        async stopData() {
            this.ble.stopNotification(this.current.id, serviceUUID, characteristicUUID,
                (r) => {
                    console.log('[READ]', r);
                },
                (e) => {
                    console.log('[ERROR]', e)
                }
            )
        },
     
       
        load: async function () {
           
        }
    },
}
</script>

<style lang='postcss' scoped>

</style>
