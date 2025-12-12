<template>
    <div class="min-h-full p-4 ">
     <!-- En-tête-->
        <div class="bg-white rounded-xl shadow-xl px-0.5 py-0.5 md:px-5 md:py-5 flex items-center justify-between flex-col md:flex-row gap-2 ">
            <h1 class="font-semibold text-gray-800 tracking-wide flex items-center gap-2 text-lg">  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none"  viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"  class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
                TABLEAU DE VUE GÉNÉRAL
            </h1>
        </div>

        <!-- Vue globale --> 
        <div class="bg-white rounded-xl shadow-xl px-2 py-2 mt-3.5 h-auto text-black">

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div class="bg-gray-100 rounded-xl p-4 flex items-center text-left h-20 space-x-4 border-x border-transparent hover:border-amber-300 hover:shadow-lg hover:-translate-x-2 transition transform duration-300">                    
                    <div class="bg-blue-600 w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10" color="white">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-semibold">{{ membersByCategory.jeunes }}</span>
                        <p class="font-light text-xl">Jeunes</p>
                    </div>
                </div>

                <div class="bg-gray-100 rounded-xl p-4 flex items-center text-left h-20 space-x-4 border-x border-transparent hover:border-pink-700 hover:shadow-lg hover:-translate-x-2 transition transform duration-300">                    
                    <div class="bg-pink-600 w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10" color="white">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-semibold">{{ totalChildren }}</span>
                        <p class="font-light text-xl">Enfants</p>
                    </div>
                </div>

                <div class="bg-gray-100 rounded-xl p-4 flex items-center text-left h-20 space-x-4 border-x border-transparent hover:border-red-700 hover:shadow-lg hover:-translate-x-2 transition transform duration-300">                    
                    <div class="bg-red-600 w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10" color="white">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-semibold">{{ membersByCategory.femmes }}</span>
                        <p class="font-light text-xl">Femmes</p>
                    </div>
                </div>

                <div class="bg-gray-100 rounded-xl p-4 flex items-center text-left h-20 space-x-4 border-x border-transparent hover:border-green-700 hover:shadow-lg hover:-translate-x-2 transition transform duration-300">                    
                    <div class="bg-green-600 w-16 h-16 flex items-center justify-center rounded-lg flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10" color="white">
                            <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                            <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                        </svg>
                    </div>
                    <div class="flex flex-col">
                        <span class="text-3xl font-semibold">{{ membersByCategory.hommes }}</span>
                        <p class="font-light text-xl">Hommes</p>
                    </div>
                </div>
            </div>
        </div>

            <!-- Statistiques en histogramme -->

        <div class="bg-white rounded-2xl">
            <h2 class="font-semibold text-gray-800 tracking-wide flex items-center gap-2 text-lg mt-6 mb-2 justify-center">  
                <!-- ton icône -->
                STATISTIQUES
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                <!-- Histogramme -->
                <div class="rounded-2xl">
                    <h1 class="text-black font-medium text-center">Evènements</h1>
                    <Chart 
                        type="bar" 
                        :data="chartDataEvents" 
                        :options="chartOptionsEvents" 
                        class="h-[25rem] w-full" 
                    />
                </div>

                <!-- Pie chart -->
                <div class="bg-white rounded-2xl flex flex-col items-center">
                    <h1 class="text-black font-medium text-center">Membres</h1>
                    <Chart 
                        type="pie" 
                        :data="chartDataMembers" 
                        :options="chartOptionsMembers" 
                        class="w-full md:w-[20rem]"
                    />
                </div>

        </div>

        </div>

    </div>
</template>

<script setup>
import Chart from 'primevue/chart';
import { ref, onMounted, computed } from "vue";
import { useDataStore } from '../../stores/data.js'
import { useEventsStore } from '../../stores/events.js'

const dataStore = useDataStore()
const eventsStore = useEventsStore()

const chartDataEvents = ref();
const chartOptionsEvents = ref();

const chartDataMembers = ref();
const chartOptionsMembers = ref();

// Statistiques calculées
const totalMembers = computed(() => dataStore.totalUsers)
const totalChildren = computed(() => dataStore.totalChildren)
const totalEvents = computed(() => eventsStore.totalEvents)
const totalActivities = computed(() => dataStore.totalActivities)

// Statistiques par catégorie
const membersByCategory = computed(() => {
  const users = dataStore.users
  return {
    jeunes: users.filter(u => u.role === 'user' && calculateAge(u.createdAt) < 35).length,
    femmes: users.filter(u => u.name && u.name.toLowerCase().includes('marie') || u.name?.toLowerCase().includes('sophie')).length || 180,
    hommes: users.filter(u => u.name && (u.name.toLowerCase().includes('jean') || u.name.toLowerCase().includes('pierre'))).length || 150,
    enfants: dataStore.children.length
  }
})

function calculateAge(dateString) {
  const today = new Date()
  const birthDate = new Date(dateString)
  return today.getFullYear() - birthDate.getFullYear()
}

onMounted(() => {
    chartDataEvents.value = setChartDataEvents();
    chartOptionsEvents.value = setChartOptionsEvents();

    chartDataMembers.value = setChartDataMembers();
    chartOptionsMembers.value = setChartOptionsMembers();
});

/* CHART 1 : STATISTIQUES ÉVÈNEMENTS */
const setChartDataEvents = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: [
            'Janvier','Février','Mars','Avril','Mai','Juin',
            'Juillet','Août','Septembre','Octobre','Novembre','Décembre'
        ],
        datasets: [
            {
                type: 'line',
                label: 'Tendance',
                borderColor: documentStyle.getPropertyValue('--p-orange-500'),
                borderWidth: 2,
                fill: false,
                tension: 0.4,
                data: [50,25,12,48,56,76,42,33,75,37,65,34]
            },
            {
                type: 'bar',
                label: 'Évènements',
                backgroundColor: documentStyle.getPropertyValue('--p-blue-500'),
                data: [21,84,24,75,37,65,34,75,37,65,34,39],
                borderColor: 'transparent',
                borderWidth: 2
            }
        ]
    };
};

const setChartOptionsEvents = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-black');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-translucent');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: { labels: { color: textColor } }
        },
        scales: {
            x: {
                ticks: { color: '#000' },
                grid: { 
                    display: false,
                    drawTicks: false
                }
            },
            y: {
                ticks: { color:'#000' },
                grid: { 
                    display: false,
                    drawTicks: false
                }
            }
        }
    };
};

/*CHART 2 : MEMBRES (PIE) */
const setChartDataMembers = () => {
    const documentStyle = getComputedStyle(document.body);
    const stats = membersByCategory.value;

    return {
        labels: ['Femmes', 'Hommes', 'Jeunes','Enfants'],
        datasets: [
            {
                data: [stats.femmes, stats.hommes, stats.jeunes, stats.enfants],
                backgroundColor: [
                    documentStyle.getPropertyValue('--p-cyan-500'),
                    documentStyle.getPropertyValue('--p-orange-500'),
                    documentStyle.getPropertyValue('--p-gray-500'),
                    documentStyle.getPropertyValue('--p-red-500')

                ],
                hoverBackgroundColor: [
                    documentStyle.getPropertyValue('--p-cyan-400'),
                    documentStyle.getPropertyValue('--p-orange-400'),
                    documentStyle.getPropertyValue('--p-gray-400'),
                    documentStyle.getPropertyValue('--p-red-400')

                ]
            }
        ]
    };
};

const setChartOptionsMembers = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-black');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};
</script>


<style>
</style>
