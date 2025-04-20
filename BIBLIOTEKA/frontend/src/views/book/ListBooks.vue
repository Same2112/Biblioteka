<template>
  <div class="container mt-5">
    <h3 class="text-center">Список доступных для обмена книг</h3>

    <div v-if="books.length > 0" class="row g-3 mt-4">
      <div v-for="book in books" :key="book.id" class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch">
        <div class="card shadow-sm w-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text mb-1"><strong>Автор:</strong> {{ book.author }}</p>
            <p class="card-text mb-1"><strong>Количество:</strong> {{ book.count }}</p>
            <p class="card-text flex-grow-1">
              <strong>Описание:</strong> {{ book.description }}
            </p>
            <router-link :to="{ name: 'bookTrade', params: { id: book.id } }" class="btn btn-primary mt-auto">
              Предложить обмен
            </router-link>
          </div>
        </div>
      </div>
      <div v-for="n in 6" :key="'empty-' + n" class="col-12 col-sm-6 col-lg-4 d-flex">
        <div class="card invisible w-100"></div>
      </div>
    </div>

    <div v-else class="text-center mt-4">
      <p class="text-muted">Нет доступных книг для обмена.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";

export default defineComponent({
  name: "ListBooks",
  setup() {
    const books = ref([]);

    const getBooks = () => {
      http
        .get("/availablebooks")
        .then((response) => {
          books.value = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    onMounted(() => {
      getBooks();
    });

    return {
      books,
      getBooks,
    };
  },
});
</script>

<style scoped>
.card {
  border-radius: 10px;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.03);
}

.card-title {
  font-weight: bold;
  color: #2c3e50;
}

.btn-primary {
  background-color: #007bff;
  border: 1px solid #007bff;
}

.text-muted {
  font-size: 1.2rem;
  color: #6c757d;
}
</style>
