<script setup>
import { useResumenStore } from '@/stores/resumenStore'

const resumenStore = useResumenStore()

</script>
<template>
    <div v-if="resumenStore.loading"></div>
    <div v-else class="flex justify-center w-auto ma-5">
        <h1>{{ resumenStore.resumen.info.name }}, {{ resumenStore.resumen.info.countryName }}</h1>
        <br>
        <p>Índice.</p>
        <br>
        <v-divider :thickness="3"></v-divider>
        <br>
        <p>Valor actual: <v-icon color="#fff">{{ resumenStore.icon_indicator }}</v-icon> {{ resumenStore.resumen.price.lastPrice }} <v-divider vertical></v-divider> Var.% Actual: <span :style="{ color: resumenStore.colortendencia }">{{ resumenStore.resumen.price.performanceRelative }}</span> <v-divider vertical></v-divider> Var. Puntos Actual: <span :style="{ color: resumenStore.colortendencia }">{{ resumenStore.resumen.price.performanceAbsolute }}</span></p>
        <br>
        <v-divider :thickness="3"></v-divider>
        <br>
    </div>
</template>
