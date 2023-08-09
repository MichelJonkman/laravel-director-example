<template>
    <a class="nav-link ms-3" aria-current="page">
        {{ element.text }}
    </a>
</template>

<script lang="ts" setup async>

import {TextElementInterface} from "@micheljonkman/laravel-director/js/Interfaces/Menu/Elements/TextElementInterface";

const {element} = defineProps<{
    element: TextElementInterface;
}>();
</script>


<style lang="scss" scoped>

</style>
