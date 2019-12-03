<template>
    <transition name="view" enter-active-class="animated flipInX delay" leave-active-class="animated fadeOutLeft">
        <router-view></router-view>
    </transition>
</template>

<script>
    export default {}
</script>

<style>
.delay {
    animation-delay: .8s;
}
</style>
