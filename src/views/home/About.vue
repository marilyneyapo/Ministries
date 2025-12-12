<template>
  <section id="apropos" class="min-h-screen bg-gray-50 py-16 px-8 text-gray-800">
    <!-- Titre principal -->
    <h1 class="text-4xl font-bold text-center text-green-700 mb-12">
      À PROPOS DE NOTRE STRUCTURE CHRÉTIENNE
    </h1>

    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="(item, index) in cards"
        :key="index"
        class="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-300"
      >
        <img :src="item.image" alt="illustration" class="w-full h-48 object-cover" />
        <div class="p-6">
          <h2 class="text-xl font-semibold text-green-600 mb-2">{{ item.title }}</h2>
          <p class="text-gray-600 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const cards = [
  {
    title: "Notre Mission",
    image: "https://jesavaispas.com/wp-content/uploads/2016/04/Chr%C3%A9tien-qui-prie.jpg",
    description:
      "Notre mission est de répandre l’amour du Christ et de bâtir une communauté fondée sur la foi, l’espérance et la charité.",
  },
  {
    title: "L’Équipe Pastorale",
    image: "https://images.unsplash.com/photo-1531379410502-63bfe8cdaf6f?auto=format&fit=crop&w=800&q=80",
    description:
      "Dirigée par le Pasteur Jean-David Koffi, notre équipe s'engage à accompagner spirituellement chaque membre de l’église.",
  },
  {
    title: "Les Dirigeants",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    description:
      "Notre comité dirigeant veille au bon fonctionnement des activités et au développement de la vision chrétienne de l’église.",
  },
  {
    title: "Les Départements",
    image: "https://th.bing.com/th/id/R.88f0cf5bea44bcec7b34662173d137ca?rik=u0yAi8MPtMGhMA&pid=ImgRaw&r=0",
    description:
      "Nous avons plusieurs départements actifs : louange, jeunesse, intercession, évangélisation, et plus encore.",
  },
  {
    title: "Nos Valeurs",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    description:
      "L’amour, la foi, la prière, la communion fraternelle et le service sont les piliers de notre structure chrétienne.",
  },
  {
    title: "Notre Histoire",
    image: "https://images.unsplash.com/photo-1504164996022-09080787b6b3?auto=format&fit=crop&w=800&q=80",
    description:
      "Fondée en 2005, notre église a grandi grâce à la grâce divine et l’engagement de ses membres fidèles.",
  },
];
</script>

<style scoped>

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.grid > div {
  animation: fadeInUp 0.8s ease forwards;
}
</style>
