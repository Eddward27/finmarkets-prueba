<script setup>
import { useResumenStore } from '@/stores/resumenStore'
import { ref } from 'vue'

const percentageFormat = (num) => {
    let stringNumber = Number(num/100)
        .toLocaleString(undefined,
            {
                style: 'percent',
                minimumFractionDigits:2,
                maximumFractionDigits: 2
        });
    return stringNumber
}

function colorClass(value) {
  if (value > 0) return 'text-success'
  if (value < 0) return 'text-error'
  return ''
}

const resumenStore = useResumenStore()
const tab = ref(1)

</script>
<template>
    <div v-if="resumenStore.loading"></div>
    <v-container v-else>
        <v-tabs show-arrows v-model="tab" fixed-tabs>
            <v-tab>Resumen</v-tab>
            <v-tab>Detalles</v-tab>
        </v-tabs>
        <v-window v-model="tab">
            <v-window-item key="0">
                No se indicó que mostrar en este espacio
            </v-window-item>
            <v-window-item key="1">
                <div class="d-flex justify-space-between mt-1">
                    <div>Cotizacion</div>
                    <div>{{ resumenStore.resumen.price.datetimeLastPrice }}</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between mt-1">
                    <div>MERCADO</div>
                    <div>{{ resumenStore.resumen.info.marketName }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>APERTURA</div>
                    <div>{{ resumenStore.resumen.price.openPrice }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>CIERRE ANTERIOR</div>
                    <div>{{ resumenStore.resumen.price.closePrice }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>MÁXIMO DIARIO</div>
                    <div>{{ resumenStore.resumen.price.maxDay }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>MÍNIMO DIARIO</div>
                    <div>{{ resumenStore.resumen.price.minDay }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>MÁXIMO 52 SEMANAS</div>
                    <div>{{ resumenStore.resumen.price.max52W }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>MÍNIMO 52 SEMANAS</div>
                    <div>{{ resumenStore.resumen.price.min52W }}</div>
                </div>
                <br>
                <div class="d-flex justify-space-between mt-1">
                    <div>Variación**</div>
                    <div>%</div>
                </div>
                <v-divider></v-divider>
                <div class="d-flex justify-space-between mt-1">
                    <div>1 MES</div>
                    <div :class="colorClass(resumenStore.resumen.price.pct30D)">{{ percentageFormat(resumenStore.resumen.price.pct30D) }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>1 AÑO</div>
                    <div :class="colorClass(resumenStore.resumen.price.pctRelW52)">{{ percentageFormat(resumenStore.resumen.price.pctRelW52) }}</div>
                </div>
                <div class="d-flex justify-space-between mt-1">
                    <div>AÑO A LA FECHA</div>
                    <div :class="colorClass(resumenStore.resumen.price.pctRelCY)">{{ percentageFormat(resumenStore.resumen.price.pctRelCY) }}</div>
                </div>
            </v-window-item>
        </v-window>
    </v-container>
</template>
<style scoped>
.text-success {
  color: #00e676;
}
.text-error {
  color: #ff1744;
}
</style>