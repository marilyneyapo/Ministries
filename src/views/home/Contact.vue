<template>
  <section id="contact" class="p-8 bg-gray-50">
    <h2 class="text-4xl font-bold text-center mb-12 text-gray-900">Contactez le Ministère</h2>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

      <!-- Formulaire de contact -->
      <div class="bg-white p-8 rounded-3xl shadow-lg">
        <h3 class="text-2xl font-semibold mb-6">Envoyez-nous un message</h3>
        <form @submit.prevent="submitForm" class="space-y-4">
          <div>
            <label class="block text-gray-700 mb-1">Nom</label>
            <input v-model="form.name" type="text" required
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Email</label>
            <input v-model="form.email" type="email" required
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"/>
          </div>
          <div>
            <label class="block text-gray-700 mb-1">Message</label>
            <textarea v-model="form.message" rows="5" required
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
          </div>
          <button type="submit" 
            class="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
            Envoyer
          </button>
        </form>
      </div>

      <!-- Informations & localisation -->
      <div class="space-y-8">
        <!-- Numéros & Email -->
        <div class="bg-white p-8 rounded-3xl shadow-lg">
          <h3 class="text-2xl font-semibold mb-4">Nos contacts</h3>
          <ul class="space-y-3 text-gray-700">
            <li><span class="font-semibold">Téléphone:</span> +225 01 23 45 67 89</li>
            <li><span class="font-semibold">Fax:</span> +225 01 23 45 67 90</li>
            <li><span class="font-semibold">Email:</span> contact@ministere.ci</li>
          </ul>
        </div>

        <!-- Localisation -->
        <div class="bg-white p-8 rounded-3xl shadow-lg">
          <h3 class="text-2xl font-semibold mb-4">Localisation</h3>
          <div class="w-full h-64 rounded-xl overflow-hidden">
           <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4028.06969585192!2d-4.076548364430577!3d5.3227303402708595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfc1c1001a2d8c5b%3A0x4675ded0bb0bdaa7!2sPetit%20Paris!5e0!3m2!1sfr!2sci!4v1763035201693!5m2!1sfr!2sci" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const submitForm = () => {
  // Ici tu peux connecter à ton API ou service d'email
  console.log('Formulaire soumis', form)
  alert('Merci pour votre message !')
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>

<style>
/* Pour un léger effet hover sur les cartes */
section#contact .shadow-lg:hover {
  transform: translateY(-4px);
  transition: transform 0.3s ease;
}
</style>
