<template>
<div>
    <table>
        <slot>
            <tr><td colspan="3" style="width:126px">메롱 컴포넌트 사이에 태그 안넣었을때 보이는 기본값</td></tr>
        </slot>
        <!--
        <tr-component 
            v-for="(rowData, index) in tableData" 
            :key="index"
            :row-index="index"></tr-component> -->
    </table>
     <Aaa :rowData="list" />
</div>
</template>

<script>
    import Aaa from './Aaa';
    import TrComponent from './TrComponent';
    export default {
        components : {
            TrComponent, 
            Aaa,
        },
        data(){
            return {
                list : [
                    {
                        a : `test1`,
                        b : `우아아아앙`,
                        c : true,
                    },
                    {
                        a : `test2`,
                        b : `ㅌㅌㅌㅌㅌ`,
                        c : true,
                    },
                ]
            }
        },
        computed : {
            tableData(){
                return this.$store.state.tableData;
            },
            turnMessage(){ //getters도 가져올 수 있다 mapGetters
                return this.$store.getters.turnMessage;
            }
        }
    }
</script>