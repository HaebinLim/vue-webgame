<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td v-for="(cellData, cellIndex) in rowData" :key="cellIndex" 
                :style="cellDataStyle(rowIndex, cellIndex)" 
                @click="onClickTd(rowIndex, cellIndex)"
                @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)">
                {{cellDataText(rowIndex, cellIndex)}}
            </td>
        </tr>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import { CODE, OPEN_CELL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './store';
import { CLICK_MINE } from './store';

export default {
    components : {

    },
    computed : {
        ...mapState(['tableData', 'halted']),
        // cell Data를 기반으로 다시 계산하기 때문에 computed에 넣는다
        cellDataStyle(state){
            return (row, cell) => {
                switch(this.$store.state.tableData[row][cell]){
                    case CODE.NORMAL:
                    case CODE.MINE:
                        return {
                            background:'#444',
                        };
                    case CODE.CLICKED_MINE:
                    case CODE.OPENED:
                        return {
                            background:'#fff',
                        };
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return {
                            background:'red',
                        }
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return {
                            background:'yellow',
                        }
                    default:
                        return {};
                }
            }
        },
        cellDataText(state){
            return (row, cell) => {
                switch(this.$store.state.tableData[row][cell]){
                    case CODE.MINE:
                        return 'X';
                    case CODE.NORMAL:
                        return '';
                    case CODE.FLAG:
                    case CODE.FLAG_MINE:
                        return '!';
                    case CODE.QUESTION:
                    case CODE.QUESTION_MINE:
                        return '?';
                    case CODE.CLICKED_MINE:
                        return '펑';
                    default:
                        return this.$store.state.tableData[row][cell] || '';
                }
            }
        }
    },
    methods : {
        onClickTd(row, cell){
            if(this.halted){
                return;
            }
            switch( this.tableData[row][cell]){
                case CODE.NORMAL:
                    return this.$store.commit(OPEN_CELL, {row, cell});
                case CODE.MINE:
                    return this.$store.commit(CLICK_MINE, {row, cell});
                default:
                    return;
            }
        },
        onRightClickTd(row, cell){
            if(this.halted){
                return;
            }
            switch(this.tableData[row][cell]){
                case CODE.NORMAL:
                case CODE.MINE:
                    this.$store.commit(FLAG_CELL, {row, cell});
                    return;
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    this.$store.commit(QUESTION_CELL, {row, cell});
                    return;
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    this.$store.commit(NORMALIZE_CELL, {row, cell});
                    return;
                default:
                    return;
            }
        }
    }
}
</script>