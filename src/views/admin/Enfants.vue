<template>
    <div class="min-h-screen bg-gray-50">
        <!-- En-tête commun -->
        <AdminHeader
            title="Gestion des Enfants"
            description="Administration et suivi des plus petits de l'église"
            :show-search="true"
            v-model:search-value="search"
            search-placeholder="Rechercher un enfant..."
        />

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
                <button @click="handleDirectExport"
                    class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl ml-auto hover:scale-105 transition font-semibold flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    Exporter Excel
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
                    <table v-if="filteredEnfants.length" class="min-w-full divide-y divide-gray-200 text-black">
                        <thead class="bg-gray-50 text-black">
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
             class="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 text-black">

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
import { useExport } from '../../composables/useExport.js'
import AdminHeader from '../../components/layout/AdminHeader.vue'

const dataStore = useDataStore()
const { success, error } = useNotification()

// Utiliser seulement les fonctions nécessaires du composable d'exportation
const { generateExcelData, downloadExcel } = useExport()

/* LISTE */
const enfants = computed(() => dataStore.children)

onMounted(async () => {
  await dataStore.getChildren()
})

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
    if (!form.value.nom || !form.value.prenom || !form.value.age)
        return error("Veuillez remplir tous les champs obligatoires")

    try {
        const childData = {
            nom: form.value.nom,
            prenom: form.value.prenom,
            age: Number(form.value.age),
            photo: form.value.photo || "",
            isActive: true
        }

        if (editMode.value) {
            dataStore.updateChild(form.value.id, childData)
            success('Enfant mis à jour avec succès!')
        } else {
            dataStore.addChild(childData)
            success('Nouvel enfant ajouté avec succès!')
        }

        closeModal()
    } catch (err) {
        error('Erreur lors de la sauvegarde')
        console.error(err)
    }
}

/* Actions */
function deleteEnfant(id) {
    if (confirm('Voulez-vous vraiment supprimer cet enfant ?')) {
        try {
            dataStore.deleteChild(id)
            success('Enfant supprimé avec succès!')
        } catch (err) {
            error('Erreur lors de la suppression')
            console.error(err)
        }
    }
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

/* Export direct Excel */
function handleDirectExport() {
  try {
    // Créer les données Excel directement pour les enfants
    const workbook = [{
      name: 'Enfants',
      data: [
        ['Nom', 'Prénom', 'Âge', 'Date d\'inscription'],
        ...filteredEnfants.value.map(enfant => [
          enfant.nom || '',
          enfant.prenom || '',
          enfant.age || '',
          enfant.createdAt ? new Date(enfant.createdAt).toLocaleDateString('fr-FR') : new Date().toLocaleDateString('fr-FR')
        ])
      ]
    }]

    // Créer le fichier Excel avec formatage professionnel
    let excelContent = ''
    
    // En-tête du fichier Excel
    excelContent += '<?xml version="1.0"?>\n'
    excelContent += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n'
    excelContent += ' xmlns:o="urn:schemas-microsoft-com:office:office"\n'
    excelContent += ' xmlns:x="urn:schemas-microsoft-com:office:excel"\n'
    excelContent += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n'
    excelContent += ' xmlns:html="http://www.w3.org/TR/REC-html40">\n'
    
    // Styles Excel
    excelContent += '<Styles>\n'
    excelContent += '<Style ss:ID="HeaderStyle">\n'
    excelContent += '<Font ss:Bold="1" ss:Size="12" ss:Color="#FFFFFF"/>\n'
    excelContent += '<Interior ss:Color="#4472C4" ss:Pattern="Solid"/>\n'
    excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
    excelContent += '<Borders>\n'
    excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1"/>\n'
    excelContent += '</Borders>\n'
    excelContent += '</Style>\n'
    excelContent += '<Style ss:ID="DataStyle">\n'
    excelContent += '<Font ss:Size="10"/>\n'
    excelContent += '<Alignment ss:Horizontal="Left" ss:Vertical="Center"/>\n'
    excelContent += '<Borders>\n'
    excelContent += '<Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Left" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Right" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '<Border ss:Position="Top" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#E1E5E9"/>\n'
    excelContent += '</Borders>\n'
    excelContent += '</Style>\n'
    excelContent += '<Style ss:ID="TitleStyle">\n'
    excelContent += '<Font ss:Bold="1" ss:Size="16" ss:Color="#2F5597"/>\n'
    excelContent += '<Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n'
    excelContent += '</Style>\n'
    excelContent += '</Styles>\n'
    
    // Créer la feuille
    const sheet = workbook[0]
    excelContent += `<Worksheet ss:Name="${sheet.name}">\n`
    excelContent += '<Table>\n'
    
    // Définir les colonnes
    const maxCols = Math.max(...sheet.data.map(row => row.length))
    for (let i = 0; i < maxCols; i++) {
      excelContent += '<Column ss:AutoFitWidth="1" ss:Width="120"/>\n'
    }
    
    // Titre
    excelContent += '<Row ss:Height="30">\n'
    excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="TitleStyle">\n`
    excelContent += `<Data ss:Type="String">👶 Liste des Enfants - MERCV</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    // Date d'export
    const exportDate = new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
    excelContent += '<Row ss:Height="20">\n'
    excelContent += `<Cell ss:MergeAcross="${maxCols - 1}" ss:StyleID="DataStyle">\n`
    excelContent += `<Data ss:Type="String">Exporté le ${exportDate}</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    // Ligne vide
    excelContent += '<Row ss:Height="10"></Row>\n'
    
    // Données
    sheet.data.forEach((row, rowIndex) => {
      const isHeader = rowIndex === 0
      const rowHeight = isHeader ? '25' : '20'
      
      excelContent += `<Row ss:Height="${rowHeight}">\n`
      
      row.forEach((cell) => {
        const cellStyle = isHeader ? 'HeaderStyle' : 'DataStyle'
        const cellValue = String(cell || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        
        excelContent += `<Cell ss:StyleID="${cellStyle}">\n`
        excelContent += `<Data ss:Type="String">${cellValue}</Data>\n`
        excelContent += '</Cell>\n'
      })
      
      excelContent += '</Row>\n'
    })
    
    // Total
    excelContent += '<Row ss:Height="10"></Row>\n'
    excelContent += '<Row>\n'
    excelContent += '<Cell ss:StyleID="DataStyle">\n'
    excelContent += `<Data ss:Type="String">📊 Total: ${filteredEnfants.value.length} enfants</Data>\n`
    excelContent += '</Cell>\n'
    excelContent += '</Row>\n'
    
    excelContent += '</Table>\n'
    excelContent += '</Worksheet>\n'
    excelContent += '</Workbook>\n'
    
    // Télécharger le fichier
    const blob = new Blob([excelContent], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    
    const filename = `Liste_Enfants_MERCV_${new Date().toISOString().split('T')[0]}.xls`
    link.download = filename
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    success(`Export réussi ! ${filteredEnfants.value.length} enfants exportés.`)
    
  } catch (err) {
    error('Erreur lors de l\'exportation')
    console.error(err)
  }
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
