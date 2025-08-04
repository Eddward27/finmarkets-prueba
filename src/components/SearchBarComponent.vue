<script setup>
import { onMounted, watch } from 'vue'
import { useConstituyentesStore } from '@/stores/constituensStore'
import { useHistoryStore } from '@/stores/historyStore'
import { useResumenStore } from '@/stores/resumenStore'

const constituensStore = useConstituyentesStore()
const historyStore = useHistoryStore()
const resumenStore = useResumenStore()

onMounted(() => {
  constituensStore.loadConstituyentes()
})
const updateSearch = () => {
  if (constituensStore.search == null)
    return;
  historyStore.loadDataFromJson(constituensStore.search)
  resumenStore.loadResumenBySymbol(constituensStore.search)
}
watch(
  () => constituensStore.itemsSearch,
  (newItems) => {
    if (newItems.length > 0 && !constituensStore.search) {
      constituensStore.search = newItems[0].id
      historyStore.loadDataFromJson(constituensStore.search)
      resumenStore.loadResumenBySymbol(constituensStore.search)
    }
  },
  { immediate: true, deep: true }
)
</script>
<template>
  <div v-if="constituensStore.loading">Cargando...</div>
  <div v-else class="flex justify-center w-auto ma-5">
    <v-autocomplete
    :items="constituensStore.itemsSearch"
    v-model="constituensStore.search"
    placeholder="Busca un instrumento"
    item-title="name"
    item-value="id"
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    clearable
    @update:model-value="updateSearch"
    ></v-autocomplete>
  </div>
</template>