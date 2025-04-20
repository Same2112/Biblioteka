<template>
  <div class="container mt-4">
    <h3 class="text-center">Ваши книги</h3>
      <h5 class="text-center">Количество: {{ user && user.user && user.user.count ? user.user.count : '0' }}</h5>

    <div v-if="books.length" class="row g-3 mt-4">
      <div
        v-for="book in books"
        :key="book.id"
        class="col-12 col-sm-6 col-lg-4 d-flex align-items-stretch"
      >
        <div class="card shadow-sm w-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ book.name }}</h5>
            <p class="card-text mb-1"><strong>Автор:</strong> {{ book.author }}</p>
            <p class="card-text mb-1"><strong>Количество:</strong> {{ book.count }}</p>
            <router-link
              :to="`/book/${book.id}`"
              class="btn btn-link mt-auto"
            >
              Изменить
            </router-link>
          </div>
        </div>
      </div>
      <div v-for="n in 6" :key="'empty-' + n" class="col-12 col-sm-6 col-lg-4 d-flex">
        <div class="card invisible w-100"></div>
      </div>
    </div>

    <div v-else class="text-center mt-4">
      <p class="text-muted">Нет доступных книг.</p>
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
    const user = ref(null);
    const getBooks = () => {
      http
        .get("/mybooks")
        .then((response) => {
          books.value = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    };

    const getUser = () => {
      http
        .get("count/user")
        .then((response) => {
          user.value = response.data;
          console.log(user.value);
        })
        .catch((e) => {
          console.error("Ошибка при получении пользователя:", e);
        });
    };

    onMounted(() => {
      getBooks();
      getUser();
    });

    return {
      books,
      user,
      getBooks,
      getUser
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

.btn-link {
  text-decoration: none;
  color: #007bff;
}

.btn-link:hover {
  text-decoration: underline;
}

.text-muted {
  font-size: 1.2rem;
  color: #6c757d;
}
</style>
