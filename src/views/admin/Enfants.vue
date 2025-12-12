<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-100">

        <!-- En-tête -->
        <div class="bg-gray-200 shadow-xl">
            <div class="container mx-auto px-4 md:px-8 py-6">
                <div class="flex flex-col md:flex-row items-center justify-between gap-4">

                    <!-- Titre -->
                    <div class="flex items-center gap-3 text-black">
                        <div class="bg-gray-400 bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                            </svg>
                        </div>
                        <div>
                            <h1 class="text-3xl md:text-4xl font-bold">Gestion des Enfants</h1>
                            <p class="text-black text-sm">Administration et suivi des plus petits de l'église</p>
                        </div>
                    </div>

                    <!-- Recherche -->
                    <div class="w-full md:w-auto">
                        <div class="relative">
                            <input v-model="search" type="text" placeholder="Rechercher un enfant..."
                                class="w-full md:w-80 px-4 py-3 pl-10 rounded-xl border-2 border-white border-opacity-30 bg-white bg-opacity-90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:bg-white transition-all" />
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-3.5" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="container mx-auto px-4 md:px-8 py-8">

            <!-- ********** FILTRES ********** -->
            <div class="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap gap-3 items-center justify-between">

                <button @click="setAgeFilter(null)"
                    :class="ageFilter === null ? activeBtn : normalBtn"
                    class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    Tous
                </button>

                <button @click="setAgeFilter('0-13')"
                    :class="ageFilter === '0-13' ? activeBtn : normalBtn"
                    class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    0 - 13 ans
                </button>

                <button @click="setAgeFilter('>13')"
                    :class="ageFilter === '>13' ? activeBtn : normalBtn"
                    class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition">
                    > 13 ans
                </button>

                <!--MODAL) -->
                <button
                    @click="openModalForCreate"
                    class="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 hover:scale-105 transition font-semibold flex items-center gap-2">
                    <span></span> Nouvel enfant
                </button>

                <!-- EXPORT EXCEL -->
                <button @click="exportCSV"
                    class="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-xl ml-auto hover:scale-105 transition font-semibold">
                    📤 Export CSV
                </button>
            </div>

            <!--LISTE-->
            <div class="bg-white rounded-xl shadow-lg overflow-hidden">
                <div class="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
                    <h2 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Liste des enfants
                    </h2>

                    <span class="text-sm text-gray-600 bg-white px-3 py-1 rounded-full font-semibold">
                        {{ filteredEnfants.length }} enfant(s)
                    </span>
                </div>

                <div class="hidden md:block overflow-x-auto">
                    <table v-if="filteredEnfants.length" class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-4 text-left text-xs font-bold uppercase">Nom et Prénoms</th>
                                <th class="px-6 py-4 text-left text-xs font-bold uppercase">Âge</th>
                                <th class="px-6 py-4 text-right text-xs font-bold uppercase">Actions</th>
                            </tr>
                        </thead>

                        <tbody class="bg-white divide-y divide-gray-100">
                            <tr v-for="e in filteredEnfants" :key="e.id" class="hover:bg-blue-50 transition">
                                <td class="px-6 py-4">
                                    <div class="flex items-center gap-4">
                                        <div class="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold"
                                            :class="!e.photo ? 'bg-gradient-to-br from-blue-400 to-indigo-500' : ''">
                                            <img v-if="e.photo" :src="e.photo" alt="Photo" class="h-10 w-10 rounded-full object-cover"/>
                                            <span v-else>{{ getInitials(e.nom, e.prenom) }}</span>
                                        </div>


                                        <div class="text-sm font-semibold text-gray-900">
                                            {{ e.nom }} {{ e.prenom }}
                                        </div>
                                    </div>
                                </td>

                                <td class="px-6 py-4">{{ e.age }} ans</td>

                                <td class="px-6 py-4 text-right">
                                    <div class="flex gap-2 justify-end">
                                        <button @click="openModalForEdit(e)"
                                            class="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 hover:scale-110 transition">
                                           <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                                            </svg>
                                        </button>

                                        <button @click="deleteEnfant(e.id)"
                                            class="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 hover:scale-110 transition">
                                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div v-else class="text-center py-16">
                        <div class="inline-block p-6 bg-gray-100 rounded-full mb-4">
                            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-gray-800 mb-2">Aucun enfant trouvé</h3>
                        <p class="text-gray-600 mb-6">Ajoutez un enfant pour commencer.</p>
                    </div>
                </div>
            </div>

        </div>

        <!--MODAL-->
        <div v-if="showModal"
             class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">

            <div class="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">

                <button @click="closeModal"
                    class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
                    ✖
                </button>

                <h2 class="text-2xl font-bold mb-4 text-center">
                    {{ editMode ? "Modifier un enfant" : "Ajouter un enfant" }}
                </h2>

                <div class="grid grid-cols-1 gap-4">

                    <input v-model="form.nom" type="text" placeholder="Nom"
                        class="px-4 py-3 border rounded-lg w-full" />

                    <input v-model="form.prenom" type="text" placeholder="Prénom"
                        class="px-4 py-3 border rounded-lg w-full" />

                    <input v-model="form.age" type="number" placeholder="Âge"
                        class="px-4 py-3 border rounded-lg w-full" />
                
                    <label class="block text-sm font-medium text-gray-700">Photo (optionnel)</label>
                    <input type="file" accept="image/*" @change="handlePhotoUpload" class="mt-1 w-full"/>



                </div>

                <button @click="saveEnfant"
                    class="mt-6 bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                    {{ editMode ? "Enregistrer" : "Ajouter" }}
                </button>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDataStore } from '../../stores/data.js'
import { useNotification } from '../../composables/useNotification.js'

const dataStore = useDataStore()
const { success, error } = useNotification()

// Utiliser les données du store
const enfants = computed(() => dataStore.children)

/* Recherche + Filtres */
const search = ref("")
const ageFilter = ref(null)

const activeBtn = "bg-blue-600 text-white shadow-md"
const normalBtn = "bg-gray-100 text-gray-700"

const showModal = ref(false)

const form = ref({ id: null, nom: "", prenom: "", age: "", photo: "" })
const editMode = ref(false)

function handlePhotoUpload(event) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
        form.value.photo = e.target.result // Base64
    }
    reader.readAsDataURL(file)
}

function openModalForCreate() {
    form.value = { id: null, nom: "", prenom: "", age: "", photo: "" }
    editMode.value = false
    showModal.value = true
}

function openModalForEdit(e) {
    form.value = { ...e }
    editMode.value = true
    showModal.value = true
}

function closeModal() {
    showModal.value = false
}

function saveEnfant() {
    if (!form.value.nom || !form.value.prenom || !form.value.age || !form.value.photo)
        return alert("Veuillez remplir tous les champs")

    if (editMode.value) {
        const idx = enfants.value.findIndex(e => e.id === form.value.id)
        enfants.value[idx] = { ...form.value }
    } else {
        enfants.value.push({
            id: Date.now(),
            nom: form.value.nom,
            prenom: form.value.prenom,
            age: Number(form.value.age),
            photo: form.value.photo ||""
        })
    }

    closeModal()
}

/* Actions */
function deleteEnfant(id) {
    enfants.value = enfants.value.filter(e => e.id !== id)
}

function setAgeFilter(t) {
    ageFilter.value = t
}

/* Filtres */
const filteredEnfants = computed(() => {
    return enfants.value
        .filter(e => {
            if (!ageFilter.value) return true
            if (ageFilter.value === "0-13") return e.age <= 13
            if (ageFilter.value === ">13") return e.age > 13
        })
        .filter(e =>
            e.nom.toLowerCase().includes(search.value.toLowerCase()) ||
            e.prenom.toLowerCase().includes(search.value.toLowerCase())
        )
})

function getInitials(n, p) {
    return (n[0] + p[0]).toUpperCase()
}

/* Export CSV */
function exportCSV() {

    const sortedEnfants = [...filteredEnfants.value].sort((a, b) => a.age - b.age)

    let csv = "nom;prenom;age\n"
     sortedEnfants.forEach(e => {
        csv += `${e.nom};${e.prenom};${e.age}\n`
    })
  

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "liste_enfants.csv"
    a.click()
}
</script>

<style>
@keyframes fadeIn {
    from { transform: scale(0.95); opacity: 0 }
    to { transform: scale(1); opacity: 1 }
}
.animate-fadeIn {
    animation: fadeIn .25s ease-out;
}
</style>
