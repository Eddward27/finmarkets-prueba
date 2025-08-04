import { defineStore } from 'pinia'

export const useConstituyentesStore = defineStore('constituyentes', {
    state: () => ({
        search: null,
        itemsSearch: [{
            id: '',
            name: '',
        }],
        constituyentes: {
            info: {
                name: '',
                shortName: '',
                countryName: '',
                codeInstrument: ''
            },
            constituents: [{
                codeInstrument: '',
                name: '',
                shortName: '',
                pctDay: 0,
                pct30D: 0,
                pctCY: 0,
                pct1Y: 0,
                lastPrice: 0,
                datetimeLastPrice: '',
                volumeMoney: 0,
                accumulatedVolumeMoney: 0,
                tend: '',
                performanceAbsolute: 0,
                performanceRelative: 0,
            }]
        },
        loading: false,
        error: null,
    }),

    actions: {
        async loadConstituyentes() {
            this.loading = true
            this.error = null
            this.constituyentes = null

            try {
                const response = await fetch(`/data/constituyentes/constituensList.json`)

                if (!response.ok) {
                    throw new Error(`Archivo constituensList.json no encontrado`)
                }

                const json = await response.json()
                this.constituyentes = json.data
                // Rellena itemsSearch con los datos de los constituyentes
                this.itemsSearch = this.constituyentes.constituents.map(item => ({
                    id: item.shortName,
                    name: `${item.name} - ${item.shortName}`
                }))
            } catch (err) {
                this.error = err.message
            } finally {
                this.loading = false
            }
        },
    },
})
