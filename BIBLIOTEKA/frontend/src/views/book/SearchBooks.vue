<template>
  <div class="container mt-5">
    <!-- Поле ввода для поиска -->
    <div class="row mb-4">
      <div class="col-md-8 mx-auto">
        <input
          v-model="searchQuery"
          @input="filterBooks"
          placeholder="Введите название книги"
          class="form-control"
        />
      </div>
    </div>

    <!-- Список книг -->
    <div class="row g-3">
      <div
        v-for="book in filteredBooks"
        :key="book.id"
        class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
      >
        <div class="card shadow-sm w-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text mb-1"><strong>Автор:</strong> {{ book.author }}</p>
            <p class="card-text mb-1"><strong>Количество:</strong> {{ book.count }}</p>
            <p class="card-text flex-grow-1">
              <strong>Описание:</strong> {{ book.description }}
            </p>
            <router-link
              :to="{ name: 'bookTrade', params: { id: book.id } }"
              class="btn btn-primary mt-auto"
            >
              Предложить обмен
            </router-link>
          </div>
        </div>
      </div>

      <div v-for="n in 6" :key="'empty-' + n" class="col-12 col-sm-6 col-lg-4 d-flex">
        <div class="card invisible w-100"></div>
      </div>
    </div>

    <div v-if="filteredBooks.length === 0" class="text-center mt-4">
      <p class="text-muted">Книги не найдены.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "@/http-common";

export default defineComponent({
  name: "ListBooks",
  setup() {
    const books = ref([]);
    const filteredBooks = ref([]);
    const searchQuery = ref("");

    const getBooks = () => {
      http
        .get("/availablebooks")
        .then((response) => {
          books.value = response.data;
          filterBooks();
        })
        .catch((e) => {
          console.error("Ошибка получения книг:", e);
        });
    };

    const filterBooks = () => {
      filteredBooks.value = books.value.filter((book) =>
        book.name &&
        book.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    };

    onMounted(() => {
      getBooks();
    });

    return {
      books,
      filteredBooks,
      searchQuery,
      filterBooks,
    };
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  min-height: 100%;
  transition: transform 0.2s ease;
}

.card:hover {
  transform: scale(1.03);
}

.card-title {
  font-weight: bold;
  color: #2c3e50;
}

.card.invisible {
  visibility: hidden;
}
</style>
