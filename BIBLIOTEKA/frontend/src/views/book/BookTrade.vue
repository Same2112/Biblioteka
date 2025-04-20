<template>
    <div>
      <div v-if="book">
        <h1>{{ book.name }}</h1>
        <p><strong>Автор:</strong> {{ book.author }}</p>
        <p><strong>Описание:</strong> {{ book.description }}</p>
        <p><strong>Количество:</strong> {{ book.count }}</p>
      </div>
      <div v-else>
        <p>Загрузка...</p>
      </div>
  
      <div>
        <h3>Выберите книгу для обмена</h3>
        <select v-model="selectedBookForExchange">
          <option disabled value="">Выберите книгу</option>
          <option
            v-if="userBooks.length"
            v-for="userBook in userBooks"
            :key="userBook.id"
            :value="userBook.id"
          >
            {{ userBook.name }} - {{ userBook.author }}
          </option>
          <option v-else disabled>У вас нет книг для обмена</option>
        </select>
      </div>
  
      <div>
        <button @click="requestTrade" :disabled="!selectedBookForExchange">
          Отправить запрос на обмен
        </button>
      </div>
  
      <div v-if="message" :class="{ 'success-message': success, 'error-message': !success }">
        {{ message }}
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import http from "../../http-common";
  
  export default defineComponent({
    name: "BookTrade",
    setup() {
      const route = useRoute();
      const bookId = route.params.id;
      const book = ref(null);
      const userBooks = ref([]);
      const selectedBookForExchange = ref("");
      const message = ref("");
      const success = ref(false);
  
      const getBook = () => {
        http
          .get(`/availablebooks/${bookId}`)
          .then((response) => {
            book.value = response.data;
          })
          .catch((error) => {
            console.error("Ошибка получения книги:", error);
          });
      };
  
      const getUserBooks = () => {
        http
          .get("/mybooks")
          .then((response) => {
            userBooks.value = response.data;
          })
          .catch((error) => {
            console.error("Ошибка получения книг пользователя:", error);
          });
      };
  
      const requestTrade = (e) => {
  e.preventDefault();

  const tradeData = {
    user_2_id: book.value.user_id,
    book_1_id: selectedBookForExchange.value,
    book_2_id: bookId,
  };

  http
    .post("/request", tradeData)
    .then(response => {
      message.value = "Запрос на обмен успешно отправлен!"; 
      success.value = true; 
    })
    .catch(e => {
      message.value = "Ошибка при отправке запроса на обмен.";
      success.value = false;
      console.log(e);
    });
};

  
      onMounted(() => {
        getBook();
        getUserBooks();
      });
  
      return {
        book,
        userBooks,
        selectedBookForExchange,
        message,
        success,
        requestTrade,
      };
    },
  });
  </script>
  
  <style>
  .success-message {
    color: green;
  }
  
  .error-message {
    color: red;
  }
  </style>
  