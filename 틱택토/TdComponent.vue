<template>
    <td @click="onClickTd">{{cellData}}</td>
</template>

<script>
    import EventBus from './EventBus';
    export default {
        props : {
            cellData : String,
            rowIndex : Number,
            cellIndex : Number
        },
        methods :{
            /*
            onClickTd(){
                if(this.cellData) return;

                const rootData = this.$root.$data;
                
            //  rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn; 
            //  배열 인덱스로 값 변경 안됨. set 사용
                this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

                let win = false;
                if( rootData.tableData[this.rowIndex][0] === rootData.turn &&
                    rootData.tableData[this.rowIndex][1] === rootData.turn && 
                    rootData.tableData[this.rowIndex][2] === rootData.turn ){
                    win = true;
                }
                if( rootData.tableData[0][this.cellIndex] === rootData.turn &&
                    rootData.tableData[1][this.cellIndex] === rootData.turn && 
                    rootData.tableData[2][this.cellIndex] === rootData.turn ){
                    win = true;
                }
                if( rootData.tableData[0][0] === rootData.turn &&
                    rootData.tableData[1][1] === rootData.turn && 
                    rootData.tableData[2][2] === rootData.turn ){
                    win = true;
                }
                if( rootData.tableData[0][2] === rootData.turn &&
                    rootData.tableData[1][1] === rootData.turn && 
                    rootData.tableData[2][0] === rootData.turn ){
                    win = true;
                }

                if(win){
                    rootData.winner = rootData.turn;
                    rootData.turn = 'O';
                    rootData.tableData = [['','',''],['','',''],['','','']];
                }else{
                    let all = true;
                    rootData.tableData.forEach(row => {
                        row.forEach(cell=>{
                            if(!cell){
                                all = false;
                            }
                        });
                    });
                    if(all){
                        rootData.winner = '';
                        rootData.turn = 'O';
                        rootData.tableData = [['','',''],['','',''],['','','']];
                    }else{
                        rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                    }
                }
                
            }*/


            /*  this.$parent.$parent
                큰 프로젝트시에는 구조가 복잡해져 $parent 가 어느 파일인지 찾기 어려워짐
                그래서 vuex 씀 (데이터를 중앙에서 관리하기 위해)
                EventBus : 이벤트를 중앙에서 통제
            */
            onClickTd(){
                if (this.cellData) return;
                EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
            }
           
        }
    }
</script>