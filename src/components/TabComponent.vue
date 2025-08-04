<template>
  <v-container fluid>
    <v-progress-linear
      v-if="loading"
      indeterminate
      color="primary"
      class="mb-4"
    />

    <v-tabs v-model="tab" show-arrows v-if="!loading && data.length">
      <v-tab v-for="(index, i) in data" :key="i">
        {{ index.info.shortName }}
      </v-tab>
    </v-tabs>

    <v-window v-model="tab" v-if="!loading && data.length">
      <v-window-item
        v-for="(index, i) in data"
        :key="i"
        :value="i"
      >
        <v-row>
          <v-col cols="12" md="6">
            <v-data-table
              :headers="headers"
              :items="leftItems(index.constituents)"
              item-value="shortName"
              class="elevation-1"
              density="compact"
              items-per-page="-1"
              hide-default-footer
              @click:row="handleRowClick"
            >
              <template #item.pctDay="{ item }">
                <span :class="colorClass(item.pctDay)">{{ formatPct(item.pctDay) }}</span>
              </template>
              <template #item.pct30D="{ item }">
                <span :class="colorClass(item.pct30D)">{{ formatPct(item.pct30D) }}</span>
              </template>
              <template #item.pctCY="{ item }">
                <span :class="colorClass(item.pctCY)">{{ formatPct(item.pctCY) }}</span>
              </template>
              <template #item.pct1Y="{ item }">
                <span :class="colorClass(item.pct1Y)">{{ formatPct(item.pct1Y) }}</span>
              </template>
              <template #item.volumeMoney="{ item }">
                {{ formatNumber(item.volumeMoney) }}
              </template>
            </v-data-table>
          </v-col>

          <v-col cols="12" md="6">
            <v-data-table
              :headers="headers"
              :items="rightItems(index.constituents)"
              item-value="shortName"
              class="elevation-1"
              density="compact"
              items-per-page="-1"
              hide-default-footer
              @click:row="handleRowClick"
            >
              <template #item.pctDay="{ item }">
                <span :class="colorClass(item.pctDay)">{{ formatPct(item.pctDay) }}</span>
              </template>
              <template #item.pct30D="{ item }">
                <span :class="colorClass(item.pct30D)">{{ formatPct(item.pct30D) }}</span>
              </template>
              <template #item.pctCY="{ item }">
                <span :class="colorClass(item.pctCY)">{{ formatPct(item.pctCY) }}</span>
              </template>
              <template #item.pct1Y="{ item }">
                <span :class="colorClass(item.pct1Y)">{{ formatPct(item.pct1Y) }}</span>
              </template>
              <template #item.volumeMoney="{ item }">
                {{ formatNumber(item.volumeMoney) }}
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConstituyentesStore } from '@/stores/constituensStore'
import { useHistoryStore } from '@/stores/historyStore'
import { useResumenStore } from '@/stores/resumenStore'

const constituensStore = useConstituyentesStore()
const historyStore = useHistoryStore()
const resumenStore = useResumenStore()

function handleRowClick(click, row) {
  constituensStore.search = row.item.shortName
  historyStore.loadDataFromJson(row.item.shortName)
  resumenStore.loadResumenBySymbol(constituensStore.search)
}

const tab = ref(0)
const data = computed(() => [constituensStore.constituyentes])
const loading = computed(() => constituensStore.loading)

const headers = [
  { title: 'Nombre', key: 'shortName' },
  { title: 'Último', key: 'lastPrice' },
  { title: 'Monto (MM)', key: 'volumeMoney' },
  { title: 'Var día', key: 'pctDay' },
  { title: 'Var 30d', key: 'pct30D' },
  { title: 'Año Actual', key: 'pctCY' },
  { title: '12 Meses', key: 'pct1Y' },
]

function formatPct(val) {
  const num = parseFloat(val)
  return (num >= 0 ? '+' : '') + num.toFixed(2) + '%'
}

function formatNumber(num) {
  return Number(num).toLocaleString('es-CL', { maximumFractionDigits: 0 })
}

function colorClass(value) {
  if (value > 0) return 'text-success'
  if (value < 0) return 'text-error'
  return ''
}

function leftItems(items) {
  const half = Math.ceil(items.length / 2)
  return items.slice(0, half)
}

function rightItems(items) {
  const half = Math.ceil(items.length / 2)
  return items.slice(half)
}
</script>

<style scoped>
.text-success {
  color: #00e676;
}
.text-error {
  color: #ff1744;
}
</style>
