<script setup>
import { Line } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler
} from 'chart.js'
import { computed } from 'vue'

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler)

const props = defineProps({
    chartData: {
        type: Array,
        required: true
    }
})

const chartDataComputed = computed(() => ({
    labels: props.chartData.map(d => d.time.toLocaleString()),
    datasets: [{
        label: 'Last Price',
        data: props.chartData.map(d => d.value),
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.1)',
        tension: 0.3,
        fill: true
    }]
}))
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
        duration: 500,
        easing: 'easeInOutQuint',
    },
    normalized: true,
    plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false },
    },
    scales: {
        x: {
        display: false,
        reverse: false,
        },
        y: {
            display: true,
            ticks: {
                callback: function (value) {
                    return value.toLocaleString()
                }
            },
            grid: {
                color: 'gray',
                drawBorder: false,
                drawTicks: false,
            },
        }
    }
}
</script>
<template>
    <div class="line-chart-wrapper">
        <Line :data="chartDataComputed" :options="chartOptions" />
    </div>
</template>

<style scoped>
.line-chart-wrapper {
    width: 100%;
    height: 100%;
}
</style>