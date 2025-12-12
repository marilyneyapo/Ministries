<template>
  <section class="footer bg-gray-900 text-white py-12">
    <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
      
      <!-- Logo / Nom du ministère -->
      <div class="text-center md:text-left">
        <h2 class="text-2xl font-bold mb-2">Ministère MERCV</h2>
        <p class="text-gray-400">Un ministère dédié à la prière et au salut</p>
      </div>

      <!-- Liens réseaux sociaux -->
      <div class="flex space-x-6 text-2xl">
        <!-- Facebook -->
        <a href="https://www.facebook.com/EgliseMERCV/" target="_blank" class="hover:text-blue-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8 h-8" viewBox="0 0 24 24">
            <path d="M22 12.07C22 6.49 17.52 2 12 2S2 6.49 2 12.07c0 5.03 3.66 9.19 8.44 9.88v-6.99H7.9v-2.89h2.54V9.66c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.26 22 17.1 22 12.07z"/>
          </svg>
        </a>

        <!-- WhatsApp -->
        <a href="https://wa.me/2250123456789" target="_blank" class="hover:text-green-500 transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-8 h-8" viewBox="0 0 24 24">
            <path d="M20.52 3.48A11.87 11.87 0 0012 0C5.37 0 0 5.37 0 12c0 2.12.55 4.16 1.6 5.95L0 24l6.22-1.62A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.21-3.48-8.52zM12 22.08c-1.95 0-3.88-.5-5.54-1.44l-.4-.24-3.7.96.99-3.6-.26-.42A9.86 9.86 0 012.08 12c0-5.47 4.45-9.92 9.92-9.92 2.64 0 5.13 1.03 7 2.88a9.854 9.854 0 012.92 7c0 5.48-4.45 9.92-9.92 9.92z"/>
            <path d="M17.27 14.92c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.36.22-.66.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.63-.93-2.22-.25-.58-.5-.5-.68-.51-.18-.01-.37-.01-.56-.01s-.52.08-.79.37c-.27.29-1.04 1.02-1.04 2.49s1.07 2.88 1.22 3.08c.15.2 2.11 3.22 5.11 4.51.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.1 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.07-.12-.25-.2-.56-.35z"/>
          </svg>
        </a>
      </div>

    </div>

    <!-- Copyright -->
    <div class="mt-12 text-center text-gray-500 text-sm">
      &copy; 2025 Eglise MERCV. Tous droits réservés.
    </div>
  </section>
</template>

<script setup>
</script>

<style>
.footer svg {
  transition: transform 0.3s ease;
}
.footer svg:hover {
  transform: scale(1.2);
}
</style>
