<template>
    <div class="main">
        <!-- <div class="main-content" 
        v-if="accountInfo!=''"
        > 暂时不加限制，可以测试页面-->
        <div class="main-content">
            <div class="title-box title clearfix">
                <div class="title-col">
                    当前奖池{{lotteryBalance}}
                </div>
                <div class="logo" >
                    <img>
                </div>
                <div class="title-col" @click='toExchange'>
                    1:100众筹  SERO兑换LOTTREY
                </div>
            </div>
            <div >
                <div class="rules-title" style='margin-bottom:0;cursor:pointer' @click="toBet">
                    点击投注
                </div>
            </div>
            <div class="list flex">
                <div class="flex-item list-col">
                    <div>
                        <span class="title">本期投注开始时间：</span>
                        <span>{{lotteryStartTime}}</span>
                    </div>
                    <div>
                        <span class="title">本期投注结束时间：</span>
                        <span>{{lotteryEndTime}}</span>
                    </div>
                </div>
                <!-- <div class="sep-line"></div> -->
                <div class="flex-item  list-col">
                    <div class="title">开奖日期列表</div>
                    <div v-for='item in lotteryDateList' class="list-item" :key="item.ticket">
                        <span>{{item.lotteryTime}}</span>
                        <span>开奖号：{{item.ticket}}</span>
                    </div>
                </div>
            </div>   
            <div class="list flex">
                <div class="flex-item list-col">
                    <div class="title">我的投注记录</div>
                    <div v-for='item in myLotteryDateList' :key="item.id"  class="list-item">
                        <span>{{item.lotteryTime}}</span>
                        <span>我的投注号码：{{item.ticket}}</span>
                    </div>
                </div>
                <div class="flex-item  list-col">
                    <div class="title">往期中将列表</div>
                    <div v-for='item in lotteryList' :key="item.id"  class="list-item">
                        <span>{{item.lotteryTime}}</span>
                        <span>开奖号：{{item.ticket}}</span>
                        <span>已中奖</span>
                    </div>
                </div>
            </div>    
            <div style="margin-top:15px;">
                <div class="rules-title">
                    中奖规则
                </div>
                <div class="">
                    1.规则1111<br>
                    2.规则222<br>
                    3.规则333<br>
                </div>
            </div> 

    </div>
    <el-dialog :close-on-click-modal="clickClose"
        title="Select Account"
        :visible.sync="selectAccountDialogVisible"
        width="20%"
        >
        <el-select v-model="accountInfo.accountId" placeholder="Select Account">
            <el-option style="width:100%"
            v-for="item in accountList"
            :key="item.accountId"
            :label="item.accountName"
            :value="item.accountId">
            </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
            <el-button @click="selectAccountDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectAccountConfirm">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog :close-on-click-modal="clickClose"
        title="兑换LOTTERY"
        :visible.sync="exchangeDialogVisible"
        width="30%">
        <el-form :v-model="exchangeForm" lable-width='100px'>
            <el-form-item label="数量（SERO）" required >
                <el-input v-model="exchangeForm.num"></el-input>
            </el-form-item>
            <div>Rate:*****.Exchange*******</div>
            <el-form-item label="密码"  required>
                <el-input type='password' v-model="exchangeForm.passW"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="selectAccountDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="selectAccountConfirm">确 定</el-button>
        </span>
    </el-dialog>    
        <el-dialog :close-on-click-modal="clickClose"
        title="投注"
        :visible.sync="bettingDialogVisible"
        width="30%">
        <el-form :model="bettingForm" lable-width='100px' >
            <el-form-item label="投注金额" required prop='num'>
                <el-input v-model.number="bettingForm.num" @change='bettingNumChange'></el-input>
            </el-form-item>
            <el-form-item>
                <div slot='label'>号码</div>
                <div v-for="item in bettingFormCodeList" :key='item'>
                    <el-input v-model="item.code1" class='input-code'></el-input>
                    <el-input v-model="item.code2" class='input-code'></el-input>
                    <el-input v-model="item.code3" class='input-code'></el-input>
                    <el-input v-model="item.code4" class='input-code'></el-input>
                    <el-button @click="randomCode">机选</el-button>
                </div>
            </el-form-item>
            
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="bettingDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="bettingConfirm">确 定</el-button>
        </span>
    </el-dialog>  
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
            lotteryDateList:[],//开奖日期列表
            myLotteryDateList:[],//我的投注记录
            lotteryList:[],//往期中将列表
            currentCount:'',
            selectAccountDialogVisible:true,
            accountList:[],
            accountInfo:'',
            lotteryBalance:'',
            seroBalance:'',
            exchangeDialogVisible:false,
            bettingDialogVisible:false,
            exchangeForm:{
                num:0,//数量
                passW:''
            },
            bettingForm:{
               num:0
            },
            bettingFormCodeList:[],
            clickClose:false
        }
    },
    methods:{
        getLotteryDateList(){
            let param={
                current:1,
                pageSize:50
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
                pageSize:50,
                lotteryTime:date
            }
            axios.get(api.lotteryList,{params:param}).then(res => {
                if(res.data.status.code == 200){
                    this.lotteryList = res.data.data.records; 
                }
            })             
        } ,
        getAccountList(){
            let url='';
             return axios.get(url).then(res => {
                if(res.data.status.code == 200){
                    this.accountList = res.data.data.records; 
                    
                }
            }) 
        } ,
        getMyLotteryDateList(){
            let param={
                current:1,
                pageSize:50
            }
            axios.get(api.myLotteryList+'').then(res => {
                if(res.data.status.code == 200){
                    this.myLotteryDateList = res.data.data.records; 
                }
            }) 
        },
        getBalance(){
            axios.get(api.balance).then(res => {
                if(res.data.status.code == 200){
                    this.lotteryBalance = res.data.data.lotteryBalance; 
                    this.seroBalance = res.data.data.seroBalance; 
                }
            }) 
        },
        selectAccountConfirm(){
            //选择了一个帐号
            this.selectAccountDialogVisible = false;
            this.getLotteryDateList();
            this.getLotteryList();
            this.getMyLotteryDateList();
            this.getBalance();
        } ,
        toExchange(){
            this.exchangeDialogVisible = true;
        },
        randomCode(){
            let len = 4;
            this.exchangeForm.code1 = this.randomString(len);
            this.exchangeForm.code2 = this.randomString(len);
            this.exchangeForm.code3 = this.randomString(len);
            this.exchangeForm.code4 = this.randomString(len);
        },
        randomString(len){
            let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890'
            let maxPos = chars.length;
            
            let str = ''
            for (let i = 0; i < len; i++) {
                str += chars.charAt(Math.floor(Math.random() * maxPos))
            }
            return str
        } ,
        toBet(){
            this.bettingFormCodeList = [];
            this.bettingForm.num = 0;
            this.bettingDialogVisible = true;
        }  ,
        bettingNumChange(val){
            console.log(val);
            this.bettingFormCodeList = [];
            let num = parseInt(val);
            for(let i=0;i<num;i++){
                console.log(i);
                let obj={
                    code1:'',code2:'',code3:'',code4:'',
                }
                this.bettingFormCodeList.push(obj);
            }
        }  ,
        bettingConfirm(){
            this.bettingDialogVisible = true;
        }
    },
    created(){
        // this.getAccountList().then(()=>{
            
        // });

    }
}
</script>
<style lang="less" scoped>
@import url('./index.less');
</style>
