import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex); // vue랑 vuex 연결 store 쓰려면 해야함

// mutations 이름을 다 변수로 빼주고, export를 붙여 모듈로 만든다(다른 파일에서 쓸 수 있게)
export const SET_WINNER = 'SET_WINNER'; 
export const CLICK_CELL = 'CLICK_CELL'; 
export const CHANGE_TURN = 'CHANGE_TURN'; 
export const RESET_GAME = 'RESET_GAME'; 
export const NO_WINNER = 'NO_WINNER'; 

/* 
    export default는 import 할 때 이름을 마음대로 쓸 수 있다. 가장 중요한 것만
    export 는 가져올때 {} 중괄호로 묶어 동시에 여러개 가져올 수 있고, 이름이 같아야 함. 자잘한 뮤테이션
*/

export default new Vuex.Store({
    state : { // vue의 data와 비슷
        tableData : [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ],
        turn : 'O',
        winner : '',
    },
    getters : { // vue의 computed와 비슷, 캐싱된다!
        turnMessage(state){
            return state.turn + '님 승리!!';
        }
    },
    mutations : { // state를 수정할 때 사용 동기적으로
        [SET_WINNER](state, winner){ // 대문자로 해야함 약속
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }){
            Vue.set(state.tableData[row], cell , state.turn);
        //  Vuex는 this.$set 안됨
        },
        [CHANGE_TURN](state){
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state){
            state.turn = 'O';
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];
        },
        [NO_WINNER](state){
            state.winner = '';
        }
    },
    actions : { // 비동기 사용할때, 여러 뮤테이션을 연달아 실행할때

    },
});