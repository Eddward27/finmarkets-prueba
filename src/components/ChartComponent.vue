<script setup>
import { useHistoryStore } from '@/stores/historyStore'

import LineChart from './LineChart.vue'

const historyStore = useHistoryStore()

</script>
<template>
    <v-alert v-if="historyStore.error" v-model="error" border="start" color="error" variant="tonal" closable>
        {{ historyStore.error }}
    </v-alert>
    <div v-if="historyStore.loading" class="d-flex align-center justify-center h-100">
        <v-progress-circular indeterminate color="primary" size="40" />
    </div>
    <div v-else class="flex justify-center w-auto ma-5">
        <v-row>
            <v-col cols="12" class="pa-0">
                <div class="chart-container">
                    <LineChart :chart-data="historyStore.filteredData" />
                </div>
            </v-col>
            <v-col cols="12" class="d-flex justify-left">
                <v-btn-toggle v-model="historyStore.selectedRange" mandatory>
                    <v-btn v-for="(label, key) in historyStore.rangeOptions" :key="label" :value="key">{{ key }}</v-btn>
                </v-btn-toggle>
            </v-col>
        </v-row>
    </div>
</template>
<style scoped>
.chart-container {
    width: 100vw;
    height: 300px;
    max-width: 100%;
}
</style>