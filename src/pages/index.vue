<template>
    <div class="main">
        <div class="main-content">
            <div class="title-box">
                <div class="title-col">
111
                </div>
                <div class="logo" >
222
                </div>
                <div class="title-col">
333
                </div>
            </div>
        <div class="list flex">
            <div class="flex-item list-col">
                <div>
                    <span>本期投注开始时间：</span>
                    <span>{{lotteryStartTime}}</span>
                </div>
                <div>
                    <span>本期投注结束时间：</span>
                    <span>{{lotteryEndTime}}</span>
                </div>
            </div>
            <div class="flex-item  list-col">
                <div>开奖日期列表</div>
                <div v-for='item in lotteryDateList' :key="item.ticket">
                    <span>{{item.lotteryTime}}</span>
                    <span>开奖号：{{item.ticket}}</span>
                </div>
            </div>
        </div>   
        <div class="list flex">
            <div class="flex-item list-col">
                <div>我的投注记录</div>
                <div v-for='item in myLotteryDateList' :key="item.id">
                    <span>{{item.lotteryTime}}</span>
                    <span>开奖号：{{item.ticket}}</span>
                </div>
            </div>
            <div class="flex-item  list-col">
                <div>往期中将列表</div>
                <div v-for='item in lotteryList' :key="item.id">
                    <span>{{item.lotteryTime}}</span>
                    <span>开奖号：{{item.ticket}}</span>
                    <span>已中奖</span>
                </div>
            </div>
        </div>    
        <div class="clearfix">
            <div class="fl rules-title">
                中奖规则
            </div>
            <div class="fl">
                1<br>
                1<br>
                1<br>
            </div>
        </div>              
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import {api} from '../assets/js/api'
export default {
    data(){
        return{
            lotteryStartTime:'08:00:00',
            lotteryEndTime:'13:00:00',
            lotteryDateList:[],
            myLotteryDateList:[],
            lotteryList:[]
        }
    },
    methods:{
        getLotteryDateList(){
            let param={
                current:1,
                pageSize:10
            }
            axios.get(api.lotteryDateList,{params:param}).then(res => {
                if(res.data.status.code == 200){
                    this.lotteryDateList = res.data.data.records; 
                }
            })             
        },
        getLotteryList(){
            let date = '2019-09-10';
            let param={
                current:1,
                pageSize:10,
                lotteryTime:date
            }
            axios.get(api.lotteryList,{params:param}).then(res => {
                if(res.data.status.code == 200){
                    this.lotteryList = res.data.data.records; 
                }
            })             
        }        
    },
    created(){
        this.getLotteryDateList();
        this.getLotteryList();
        // this.getMyLotteryDateList();
    }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
