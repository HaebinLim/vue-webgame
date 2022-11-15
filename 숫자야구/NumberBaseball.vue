<template>
    <div>
        <h1>{{result}}</h1>
        <form v-on:submit="onSubmitForm">
   <!-- <form @submit.prevent="onSubmitForm"> 이렇게 써도된다 -->
            <input ref="answer" minlength="4" maxlength="4" v-model="value">
            <button type="submit">입력</button>
        </form>
        <div>시도 : {{tries.length}}</div>
        <ul>
            <li v-for="t in tries" :key="t.try"><!-- key 필수 -->
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1,2,3,4,5,6,7,8,9];
        const array = [];
        for(let i=0; i<4; i+=1){
            const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0];
            array.push(chosen);
        }
        return array;
    };

    export default {
        data(){
            return {
                answer : getNumbers(), // ex) [1,4,3,2]
            //  answer : this.getNumbers(), 메소드에 넣었을 때 접근
                tries : [],
                value : '',
                result : '',
            }
        },
        methods : {
            /* 메소드에 넣어도 되지만 컴포넌트, 즉 화면과 관련이 없기 때문에 분리한다
            getNumbers : () => {
                const candidates = [1,2,3,4,5,6,7,8,9];
                const array = [];
                for(let i=0; i<4; i+=1){
                    const chosen = candidates.splice(Math.floor(Math.random() * (9-i)), 1)[0];
                    array.push(chosen);
                }
                return array;
            },  */
            onSubmitForm(e){
                e.preventDefault();
                
                if(this.value === this.answer.join('')){ // 정답이면
                    this.tries.push({
                        try : this.value,
                        result : '홈런',
                    });
                    this.result = '홈런';
                    alert('게임을 다시 실행합니다.');
                    thos.answer=getNumbers();
                    this.value='';
                    this.tries=[];
                    this.$$refs.answer.focus();
                }else{
                    if(this.tries.length >= 9){ // 10번째 시도
                        this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer.join(',')} 입니다.`;
                        this.value='';
                        thos.answer=getNumbers();
                        this.tries=[];
                        this.$$refs.answer.focus();
                    }
                    let strike = 0; // 값이 변하면 data로, 단지 계산을 위한 것은 변수로
                    let ball = 0;   
                    const answerArray = this.value.split('').map(v => parseInt(v)); // 문자열을 숫자배열로 바꾸는 코드
                    for(let i=0;i<4; i+=1){
                        if( answerArray[i] === this.answer[i] ){ // 숫자가 자릿수까지 모두 정답
                            strike++;
                        }else if( this.answer.includes(answerArray[i]) ){ // 숫자만 정답
                            ball++;
                        }
                    }
                    this.tries.push({
                        try : this.value,
                        result : `${strike} 스트라이크, ${ball} 볼입니다.`,
                    });
                }
                this.value='';
                this.$refs.answer.focus();
            }

        }
    } 
</script>

<style>

</style>