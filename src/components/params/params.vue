<template>
    <div class="parent">
        <h1>函数式组件练习，手写一个高性能通用对话框</h1>
        <button class="btn" @click="btn1()">点击按钮1</button>
        <button class="btn" @click="btn2()">点击按钮2</button>
        {{isShow}}
        <!-- <MessageBox :value="isShow" @input="(val)=>{isShow = val}"/> -->
            <!-- key为了避免框架认为是相同得一个组件，就地复用，不改变任何值
            保证每次得到得key都不相同，diff算法对比key不同，就会重新创建 -->
        <MessageBox 
            :key="Math.random()" 
            v-model="isShow"
            :title="conf.title"
            :message="conf.message"
            @submit="onsubmit"
            @cancel="oncancel"/>
    </div>

</template>

<script>
import MessageBox from '@/componentsCommon/MessageBox.vue'
export default {
    name: "Params",
    components:{
                MessageBox
            },
    data(){
        return{  
            isShow: false,
            conf:{
                title: "",
                message: ""
            }
        }
    },
    methods:{
        onsubmit(){
            console.log("onsubmit");
        },
        oncancel(){
            console.log("ononcancelsubmit");
        },
        btn1(){
            this.isShow = true,
            this.conf.title = "温馨提示11111"
            this.conf.message = "确认关闭吗111111"
        },
        btn2(){
            this.isShow = true,
            this.conf.title = "温馨提示22222222"
            this.conf.message = "确认关闭吗2222222222222"
        },
    }
    
}
</script>

<style scoped>
    .parent{
        width: 100%;
        height: 100%;
        text-align: center;
    }
</style>