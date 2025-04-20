<template>
  <div class="container mt-4">
    <div v-if="book">
      <h2>Редактирование книги</h2>
      <form @submit.prevent="saveBook">
        <div class="mb-3">
          <label for="name" class="form-label">Название</label>
          <input v-model="book.name" type="text" id="name" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="author" class="form-label">Автор</label>
          <input v-model="book.author" type="text" id="author" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="description" class="form-label">Описание</label>
          <textarea v-model="book.description" id="description" class="form-control"></textarea>
        </div>
        <div class="mb-3">
          <label for="count" class="form-label">Количество</label>
          <input v-model="book.count" type="number" id="count" class="form-control" />
        </div>
        <button type="submit" class="btn btn-primary">Сохранить</button>
      </form>
      <button @click="deleteBook" class="btn btn-danger mt-2">Удалить книгу</button><br>
      <button @click="goBack" class="btn btn-secondary mt-2">Назад</button>
    </div>
    <div v-else>
      <p>Книга не найдена.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import http from '../../http-common';
import { useRouter } from 'vue-router'; 

export default defineComponent({
  name: 'BookDetails',
  props: ['id'],
  setup(props) {
    const book = ref(null);
    const router = useRouter(); 

    const getBookById = () => {
      http
        .get(`/books/${props.id}`)
        .then(response => {
          book.value = response.data;
        })
        .catch(e => {
          console.error('Ошибка при загрузке книги:', e);
        });
    };

    const saveBook = () => {
      http
        .put(`/books/${props.id}`, book.value)
        .then(() => {
          alert('Книга успешно сохранена');
          router.push({ name: 'listMyBooks' });
        })
        .catch(e => {
          console.error('Ошибка при сохранении книги:', e);
        });
    };

    const deleteBook = () => {
      console.log("dsds")
    http
      .delete(`/books/${props.id}`, book.value)
      .then(() => {
        alert('Книга успешно удалена');
        router.push({ name: 'listMyBooks' });
      })
      .catch((error) => {
        console.error('Ошибка при удалении книги:', error);
        alert('Произошла ошибка при удалении книги');
      });
};

    const goBack = () => {
      router.back();
    };

    onMounted(() => {
      getBookById();
    });

    return {
      book,
      saveBook,
      goBack,
      deleteBook
    };
  }
});
</script>
