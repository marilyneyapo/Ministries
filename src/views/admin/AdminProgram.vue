<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
    <div class="max-w-7xl mx-auto">

      <!-- Header -->
      <div class="bg-gray-200 shadow-xl">
        <div class="container mx-auto px-4 md:px-8 py-6">
          <div class="flex flex-col md:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-3 text-white">
              <div class="bg-gray-400 bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z">
                  </path>
                </svg>
              </div>
              <div>
                <h1 class="text-3xl md:text-4xl font-bold text-black">Gestion des Programmes</h1>
                <p class="text-black text-sm">Publiez les programmes de l'église</p>
              </div>
            </div>

            <button @click="openForm()"
              class="bg-white text-blue-600 px-6 py-3 rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold flex items-center gap-2">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Nouveau Programme
            </button>
          </div>
        </div>
      </div>

      <!-- STATS -->
      <div class="container mx-auto px-4 md:px-8 py-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          
          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 slide-up">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-semibold">Programmes Actifs</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">{{ programmesActifs }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 slide-up">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-semibold">Programmes Inactifs</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">{{ programmesInactifs }}</p>
              </div>
              <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M10 14l2-2m2-2l-2-2m0 4l-2 2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 slide-up">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-500 text-sm font-semibold">Total Programmes</p>
                <p class="text-3xl font-bold text-gray-800 mt-1">{{ programmes.length }}</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- LISTE DES PROGRAMMES -->
      <div class="container mx-auto px-4 md:px-8 py-8">
        <h1 class="mb-5 font-bold text-3xl hover:text-blue-400">LISTE DES PROGRAMMES</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div v-for="(programme, index) in programmes" :key="programme.id"
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden slide-up"
            :style="{ animationDelay: (index * 0.05) + 's' }">

            <div class="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white relative overflow-hidden">
              <div class="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>

              <div class="relative z-10">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    {{ programme.id }}
                  </span>

                  <svg v-if="programme.actif" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>

                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 14l2-2m2-2l-2-2m0 4l-2 2m9-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 class="text-xl font-bold mt-4">{{ programme.nom }}</h3>
              </div>
            </div>

            <div class="p-6">
              <div class="mb-4">
                <p class="text-xs text-gray-500 mb-1 flex items-center gap-1">
                  Responsable
                </p>
                <p class="text-gray-800 font-semibold">{{ programme.responsable }}</p>
              </div>

              <div class="mb-4 text-gray-700 font-medium">
                📅 {{ programme.date }}
              </div>

              <div class="mb-6">
                <span :class="programme.actif ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'"
                  class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold">
                  <span :class="programme.actif ? 'bg-green-500' : 'bg-red-400'" class="w-2 h-2 rounded-full"></span>
                  {{ programme.actif ? 'Actif' : 'Inactif' }}
                </span>
              </div>

              <div class="flex gap-3">
                <button @click="editProgramme(programme)"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  Modifier
                </button>

                <button @click="deleteProgramme(programme.id)"
                  class="px-4 py-2 bg-red-300 text-white rounded-lg hover:bg-red-600">
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FORMULAIRE -->
      <div v-if="showForm" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
        <div class="bg-white rounded-2xl shadow-2xl w-full max-w-lg slide-up">

          <div class="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-t-2xl">
            <h3 class="text-2xl font-bold text-white">
              {{ isEditing ? 'Modifier le Programme' : 'Créer un Programme' }}
            </h3>
          </div>

          <div class="p-6">
            <div class="mb-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Nom *</label>
              <input v-model="programmeForm.nom" type="text"
                class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Responsable *</label>
              <input v-model="programmeForm.responsable" type="text"
                class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-cyan-500" />
            </div>

            <div class="mb-4">
              <label class="block text-sm font-bold text-gray-700 mb-2">Date *</label>
              <input v-model="programmeForm.date" type="date"
                class="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-cyan-500" />
            </div>

            <div class="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-xl">
              <input id="actif" type="checkbox" v-model="programmeForm.actif" class="w-5 h-5" />
              <label for="actif" class="text-sm font-semibold text-gray-700">Programme actif</label>
            </div>

            <div class="flex gap-3">
              <button @click="closeForm"
                class="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300">
                Annuler
              </button>

              <button @click="saveProgramme"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl">
                Enregistrer
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      programmes: [
        {
          id: 1,
          date: "2025-01-14",
          nom: "École du Dimanche",
          responsable: "Pasteur Jean Kouassi",
          actif: true
        }
      ],

      showForm: false,
      isEditing: false,

      programmeForm: {
        id: null,
        nom: "",
        responsable: "",
        date: "",
        actif: true
      }
    };
  },

  computed: {
    programmesActifs() {
      return this.programmes.filter(p => p.actif).length;
    },
    programmesInactifs() {
      return this.programmes.filter(p => !p.actif).length;
    }
  },

  methods: {
    openForm() {
      this.resetForm();
      this.showForm = true;
      this.isEditing = false;
    },

    closeForm() {
      this.showForm = false;
    },

    resetForm() {
      this.programmeForm = {
        id: null,
        nom: "",
        responsable: "",
        date: "",
        actif: true
      };
    },

    editProgramme(programme) {
      this.programmeForm = { ...programme };
      this.showForm = true;
      this.isEditing = true;
    },

    saveProgramme() {
      if (!this.programmeForm.nom || !this.programmeForm.responsable || !this.programmeForm.date) {
        alert("Veuillez remplir tous les champs obligatoires");
        return;
      }

      if (this.isEditing) {
        const index = this.programmes.findIndex(p => p.id === this.programmeForm.id);
        if (index !== -1) {
          this.programmes.splice(index, 1, { ...this.programmeForm });
        }
      } else {
        this.programmes.push({
          id: Date.now(),
          ...this.programmeForm
        });
      }

      this.closeForm();
    },

    deleteProgramme(id) {
      if (confirm("Supprimer ce programme ?")) {
        this.programmes = this.programmes.filter(p => p.id !== id);
      }
    }
  }
};
</script>


<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.3s ease-in;
}

.slide-up {
  animation: slideUp 0.3s ease-out;
}
</style>
