import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useHistoryStore = defineStore('history', () => {
  const rawData = ref([])
  const selectedRange = ref('1D')
  const loading = ref(false)
  const error = ref(null)

  const rangeOptions = {
    '1D': 1,
    '1S': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1A': 365,
    '5A': 1825
  }

  const loadDataFromJson = async (code) => {
    try {
      loading.value = true
      error.value = null
      rawData.value = []
      const response = await fetch(`/data/history/history-${code}.json`)
      if (!response.ok) {
        throw new Error(`Archivo history-${code}.json no encontrado`)
      }
      const json = await response.json();
      let jsonData = json.data
      rawData.value = jsonData.chart
        .map((item) => {
          const [date, time] = item.datetimeLastPrice.split(' ')
          const [day, month, year] = date.split('-')
          const isoString = `${year}-${month}-${day}T${time}`
          return {
            time: new Date(isoString),
            value: item.lastPrice
          }
        }).sort((a, b) => a.time - b.time)
    } catch (err) {
      console.error(err.message);      
      error.value = 'No se encontraron datos para este indicador: ' + code;
    } finally {
      loading.value = false;
    }
  }

  const filteredData = computed(() => {
    const now = new Date()
    const cutoff = new Date()
    cutoff.setDate(now.getDate() - rangeOptions[selectedRange.value])

    return rawData.value.filter((d) => d.time >= cutoff)
  })

  return {
    rawData,
    selectedRange,
    rangeOptions,
    filteredData,
    loadDataFromJson,
    loading,
    error
  }
})
