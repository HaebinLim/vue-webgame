<template>
    <div>
        <div>{{turn}}님의 턴입니다.</div>
        <table-component>
            <!-- 컴포넌트 안에 다른 태그를 넣을 수 있음 slot에 렌더링 된다
                 slot을 통해 컴포넌트는 다른파일이지만 데이터를 여기에서 사용할 수 있게 된다 -->
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex+Math.random()">
                <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" 
                @click="onClickTd(rowIndex, cellIndex)">{{cellData}}</td>
            </tr>
        </table-component>
        <table>
            <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
                <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" 
                @click="onClickTd(rowIndex, cellIndex)">{{cellData}}</td>
            </tr>
        </table>
        <!--
        :key 를 index로 쓰는건 안좋음
        중간에 값이 없어지면 없어진 값 다음을 다시 그림 (index가 땡겨짐)

        key를 index로 사용해도 괜찮은 경우는 
        배열이 계속 증가하거나 중간 값이 수정되는 경우 (index가 추가만 되는 경우, index가 안바뀌는 경우)
        배열 [0, 1, 2, 3, 4, 5]
        인덱스 0, 1, 2, 3, 4, 5
        -->
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import store from './store';
    import TableComponent from './TableComponent';
    import { CLICK_CELL, SET_WINNER, RESET_GAME, NO_WINNER, CHANGE_TURN } from './store'; // 변수명을 불러오기 때문에 오타 걱정없어요!!

    export default {
        store,
        components : {
            TableComponent,
        },
        computed : {
        /*  사용하는 데이터를 아래처럼 만들어서 사용해야함
            데이터가 많아지면 소스 길어짐 많아짐 
            winner(){
                return this.$store.state.winner;
            }, 
            turn(){
                return this.$store.state.turn;
            } 
            그래서 mapState 사용 */
            ...mapState(['winner', 'turn', 'tableData'])

            /* 요렇게도 쓸수있다..
            ...mapState({
                winner : state => state.winner,
                winner(state){
                    return state.winner
                },
                turnState : 'turn',
            }) */
        },
        methods : {
            onClickTd(rowIndex, cellIndex){
                if(this.cellData) return;
                
                this.$store.commit(CLICK_CELL, { row : rowIndex, cell : cellIndex }); 
                // mutations 부를 때 commit 사용

                let win = false;
                if( this.tableData[rowIndex][0] === this.turn &&
                    this.tableData[rowIndex][1] === this.turn && 
                    this.tableData[rowIndex][2] === this.turn ){
                    win = true;
                }
                if( this.tableData[0][cellIndex] === this.turn &&
                    this.tableData[1][cellIndex] === this.turn && 
                    this.tableData[2][cellIndex] === this.turn ){
                    win = true;
                }
                if( this.tableData[0][0] === this.turn &&
                    this.tableData[1][1] === this.turn && 
                    this.tableData[2][2] === this.turn ){
                    win = true;
                }
                if( this.tableData[0][2] === this.turn &&
                    this.tableData[1][1] === this.turn && 
                    this.tableData[2][0] === this.turn ){
                    win = true;
                }

                if(win){
                    this.$store.commit(SET_WINNER, this.turn);
                    this.$store.commit(RESET_GAME);
                }else{
                    let all = true;
                    this.tableData.forEach(row => {
                        row.forEach(cell=>{
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){
                        this.$store.commit(NO_WINNER);
                        this.$store.commit(RESET_GAME);
                    }else{
                        this.$store.commit(CHANGE_TURN);
                    }
                }
                
            }
        }
    } 
</script>

<style>
    table {border-collapse:collapse}
    td {border:1px solid #000;width:40px;height:40px;text-align:center}
</style>