import Vue from 'vue';
import VueRouter from 'vue-router';
import NumberBaseball from '../숫자야구/NumberBaseball';
import RockScissorsPaper from '../가위바위보/RockScissorsPaper';
import LottoGenerator from '../로또추첨기/LottoGenerator';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path : '/number-baseball', component: NumberBaseball },
        { path : '/rock-scissors-paper', component: RockScissorsPaper },
        { path : '/lotto-generator', component: LottoGenerator },
    ]
});