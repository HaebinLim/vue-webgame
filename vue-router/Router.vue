<template>
    <div>
        <div>
            <router-link to="/number-baseball">1</router-link>
            <router-link to="/rock-scissors-paper">3</router-link>
            <router-link to="/lotto-generator">4</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import router from './routes';
export default {
    router,
}
</script>