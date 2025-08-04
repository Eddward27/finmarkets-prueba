import { defineStore } from 'pinia'

export const useResumenStore = defineStore('resumen', {
  state: () => ({
    resumen: {
      info: {
        name: '',
        shortName: '',
        countryName: '',
        currencyName: '',
        currencySymbol: '',
        codeInstrument: '',
        marketName: '',
        hourOpen: '',
        hourClose: '',
        trading: true,
        exchangeRate: 0
      },
      price: {
        lastPrice: 0,
        datetimeLastPrice: '',
        openPrice: 0,
        closePrice: 0,
        datetimeClosePrice: '',
        performanceAbsolute: 0,
        performanceRelative: 0,
        bid: 0,
        bidVolume: 0,
        bidDatetime: '',
        ask: 0,
        askVolume: 0,
        askDatetime: '',
        volumeMoney: 0,
        accumulatedVolumeMoney: 0,
        volumeInstrument: 0,
        accumulatedVolumeInstrument: 0,
        tend: '',
        maxDay: 0,
        minDay: 0,
        min52W: 0,
        max52W: 0,
        pct30D: 0,
        pctRelW52: 0,
        pctRelCY: 0
      }
    },
    loading: false,
    error: null,
  }),

  actions: {
    async loadResumenBySymbol(symbol) {
      this.loading = true
      this.error = null
      this.resumen = null

      try {
        const response = await fetch(`/data/resumen/${symbol}.json`)

        if (!response.ok) {
          throw new Error(`Archivo ${symbol}.json no encontrado`)
        }
        const json = await response.json()
        this.resumen = json.data;
        if (this.resumen.price.performanceRelative < 0) {
          this.icon_indicator = "mdi-arrow-down";
          this.colortendencia = "#F76970";
        } else if (this.resumen.price.performanceRelative > 0) {
          this.icon_indicator = "mdi-arrow-up";
          this.colortendencia = "#00E175";
        } else {
          this.icon_indicator = "mdi-minus";
          this.colortendencia = "white";
        }
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
  },
})
