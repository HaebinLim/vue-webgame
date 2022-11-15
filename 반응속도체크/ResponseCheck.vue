<template>
    <div>
        <div id="screen" v-bind:class="state" @click="onClickScreen">{{message}}</div>
        <!-- 
            <div>평균시간: {{result.reduce((a,c) => a+c,0)/result.length || 0}}ms</div>
            reduce 배열의 값을 모두 더할때 쓰는 것 
            값에서 바로 계산하는건 별로 (message만 바꿔도 같이 계산함) 성능상 문제로 computed에 넣는다
        -->
        <div v-show="result.length"><!-- v-show="false" 태그는 존재 style display:none -->
            <div>평균시간: {{average}}ms</div>
            <button @click="onReset">리셋</button>
        </div>
        <template v-if="result.length"><!-- v-if는 false일때 태그 자체가 존재하지 않는다/쓸데없는 div안쓰려면 template 사용하기 -->
            <div>메롱</div>
        </template>
    </div>
</template>

<script>
    let startTime = 0;
    let endTime = 0;
    let timeout = null;
    export default {
        data(){
            return {
                result : [],
                state : 'waiting',
                message : '클릭해서 시작하세요.'
            }
        },
        computed : {// data를 가공해서 쓸 때 사용. 쓰는 이유-> 캐싱이 된다
            average(){
                return this.result.reduce( (a,c) => a+c,0) / this.result.length || 0;
            }
        },
        methods : {
            onReset(){
                this.result = [];
            },
            onClickScreen(){
                if( this.state === 'waiting' ){
                    this.state = 'ready';
                    this.message = '초록색이 되면 클릭하세요';
                    timeout = setTimeout( ()=> {
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        startTime = new Date();
                    }, Math.floor(Math.random()*1000)+2000); // 2~3초

                }else if( this.state === 'ready'){
                    this.state = 'waiting';
                    this.message = '너무 성급하시군요';
                    clearTimeout(timeout);

                }else if( this.state === 'now' ){
                    endTime = new Date();
                    this.state = 'waiting';
                    this.message = '클릭해서 시작하세요';
                    this.result.push(endTime - startTime);
                }
            }
        }
    } 
</script>

<style scoped>
    #screen {width:300px;height:200px;text-align:center;line-height:200px;font-size:24px;cursor:pointer}
    .waiting {background:skyblue}
    .ready {background:hotpink}
    .now {background:yellowgreen}
</style>