<template>
    <div>
        <div id="computer" :style="computedStyleObject"></div>
        <!-- border-bottom -> borderBottom -->
        <div>
            <button type="button" @click="onClickButton('바위')">바위</button>
            <button type="button" @click="onClickButton('가위')">가위</button>
            <button type="button" @click="onClickButton('보')">보</button>
        </div>
        <div>{{result}}</div>
        <div>현재 {{score}}점</div>
    </div>
</template>

<script>
    const rspCords = {
        '바위' : '0',
        '가위' : '-137px',
        '보' : '-284px',
    };
    const scores = {
        '바위' : 0,
        '가위' : 1,
        '보' : -1,
    };
    const computedChoice = (posX)=> {
        return Object.entries(rspCords).find(function(v){
            return v[1] === posX;
        })[0];
    };

    let interval;
    export default {
        data(){
            return {
                result : '',
                score : 0,
                posX : rspCords.바위,
            }
        },
        computed : {
            // 캐싱을 활용하기 위해
            computedStyleObject(){
                return {
                    background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.posX} 0`,    
                }
            }
        },
        methods : {
            changeHand(){
                interval = setInterval(()=>{
                    if( this.posX === rspCords.바위 ){
                        this.posX = rspCords.가위;
                    }else if( this.posX === rspCords.가위 ){
                        this.posX = rspCords.보;
                    }else if( this.posX === rspCords.보 ){
                        this.posX = rspCords.바위;
                    }
                }, 100);
            },
            onClickButton(choice){
                clearInterval(interval);
                const myScore = scores[choice];
                const cpuScore = scores[computedChoice(this.posX)];
                const diff = myScore - cpuScore;

                if( diff === 0 ){
                    this.result = '비김';
                }else if( [-1, 2].includes(diff) ){
                    this.result = '이김';
                    this.score += 1;
                }else {
                    this.result = '짐';
                    this.score -= 1;
                }

                setTimeout( ()=>{
                    this.changeHand();
                }, 1000 )
                
            }
        },
        beforeCreate(){
            console.log('beforeCreate');
        },
        created(){
            console.log('create');
        },
        beforeMount(){
            console.log('beforeMount');  
        },
        mounted(){
            console.log('mounted'); 
            this.changeHand();
        },
        beforeUpdate(){
            console.log('beforeUpdate');  
        },
        updated(){
            console.log('updated');  
        },
        beforeDestroy(){
            console.log('beforeDestroy');  
            clearInterval(interval);
        },
        destroyed(){
            console.log('destroyed');  
        },
        /* 
            async mounted(){
                await new Promise()
            }
            async는 await을 쓰기 위해서, 비동기 깔끔하게 쓰려고 함수 앞에 붙인다
            await은 promise 처리를 위해서
        */
    } 
</script>

<style scoped>
    #computer {width:147.5px;height:200px}
</style>