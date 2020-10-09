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

        <h2>Rpm : {{rpm}}</h2>

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

            data: null,
            time: null,
            lastData: null,
            lastTime: null,
            rpm: null,

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
        cadence :sync('test/CADENCE')
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
        STORE_DEVICE:call('test/storeDevice'),
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
            await this.STORE_DEVICE({
                device_id: device.id,
                name : device.name
            });

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
                    this.convertData(data)
                    this.cadence.push(this.rpm)
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

        convertData(data) {
            let flag = data[0];
            if (flag >= 2) {
                this.data = data[1] + data[2] * Math.pow(256, 1)
                this.time = data[3] + data[4] * Math.pow(256, 1)

                if (this.data == null) {
                    this.lastData = this.data;
                    this.lastTime = this.time
                } else {

                    if (this.time != this.lastTime) {
                        let diffTime = 0;
                        if (this.time >= this.lastTime) {
                            diffTime = this.time - this.lastTime
                        } else {
                            diffTime = (65535 - this.lastTime) + this.time
                        }

                        let diffCount = 0
                        if (this.data >= this.lastData) {
                            diffCount = this.data - this.lastData
                        } else {
                            diffCount = (4294967295 - this.lastData) + this.data;
                        }

                        let rpm = diffCount / (diffTime / 1000) * 60
                        this.rpm = (!isNaN(rpm)) ? rpm.toFixed(2) : 0;

                        this.lastData = this.data;
                        this.lastTime = this.time;
                    }
                }

            }

            this.data = data[1];
        },

        load: async function () {

        }
    },
}
</script>

<style lang='postcss' scoped>

</style>
