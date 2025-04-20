<template>
    <div class="container mt-4">
      <h3 class="text-center">Добавить новую книгу</h3>
      <form @submit.prevent="addBook">
        <div class="form-group mb-3">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Название книги" 
            v-model="book.name" 
            required 
          />
        </div>
        <div class="form-group mb-3">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Автор" 
            v-model="book.author" 
            required 
          />
        </div>
        <div class="form-group mb-3">
          <input 
            type="number" 
            class="form-control" 
            placeholder="Количество" 
            v-model="book.count" 
            required 
          />
        </div>
        <div class="form-group mb-3">
          <textarea 
            class="form-control" 
            placeholder="Описание" 
            v-model="book.description">
          </textarea>
        </div>
        <div class="form-group text-center">
          <button type="submit" class="btn btn-primary">Добавить книгу</button>
        </div>
      </form>
      <div v-if="message" class="alert mt-3" :class="messageType">{{ message }}</div>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import http from "../../http-common";
  
  export default {
    name: "AddBooks",
    setup() {
      const book = ref({ name: "", author: "", count: 0, description: "" });
      const message = ref("");
      const messageType = ref("");
  
      const addBook = (e) => {
        e.preventDefault();
        const data = {
          name: book.value.name,
          author: book.value.author, 
          count: book.value.count,
          description: book.value.description
        };
  
        http
          .post("/addBooks", data)
          .then(response => {
            book.value.id = response.data.id;
            message.value = "Книга успешно добавлена!";
            messageType.value = "alert-success";
            book.value = { name: "", author: "", count: 0, description: "" };
          })
          .catch(e => {
            message.value = "Ошибка добавления книги.";
            messageType.value = "alert-danger";
            console.log(e);
          });
      };
  
      return { book, message, messageType, addBook };
    }
  };
  </script>
  