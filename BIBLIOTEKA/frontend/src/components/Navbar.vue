<template>
  <!-- Навигационная панель -->
  <nav class="navbar navbar-light bg-light fixed-top w-100">
    <div class="container-fluid d-flex justify-content-between">

      <!-- Ссылки навигации -->
      <ul class="navbar-nav d-flex flex-row justify-content-around w-100">
        <li class="nav-item">
          <router-link class="nav-link" to="/searchbook" active-class="active">Поиск</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/listMyBooks" active-class="active">Мои Книги</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/listBooks" active-class="active">Книги</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/addBooks" active-class="active">Добавить Книги</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/Trade" active-class="active">Обмены</router-link>
        </li>
        <div v-if="currentUser">
          <router-link v-if="currentUser.role === 'АДМИНИСТРАТОР'" to="/RegisterAdmin" class="btn btn-outline-primary me-2">
          {{ currentUser.username }}
          </router-link>
          <div v-else class="user-name-box me-2">
          {{ currentUser.username }}
          </div>
          <a href @click.prevent="logOut" class="btn btn-outline-danger">
            Выйти
          </a>
        </div>
        <div v-else>
          <router-link to="/login" class="btn btn-outline-success">
            Войти
          </router-link>
        </div>
      </ul>

    </div>
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'NavBar',
  setup() {
    const store = useStore();

    const currentUser = computed(() => store.state.auth.user);

    const logOut = () => {
      store
        .dispatch('auth/logout')
        .then(() => {
          window.location.href = '/login';
        })
        .catch((err) => {
          console.error('Ошибка выхода:', err);
        });
    };

    return {
      currentUser,
      logOut,
    };
  },
};
</script>

<style>
.navbar-nav {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-name-box {
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.navbar-nav .nav-link {
  text-align: center;
  font-weight: 500;
  color: #000000;
  padding: 3px 10px;
  transition: border 0.3s ease; /* Плавный переход для изменения рамки */
}

.navbar-nav .nav-link.active {
  text-align: center;
  color: #000000; /* Изменить цвет текста для активной ссылки */
  padding: 3px 20px;
  border: 2px solid #000000; /* Добавить черную рамку */
  border-radius: 10px; /* Сделать углы рамки немного округлыми */
  display: inline-block;
}

.navbar-nav .nav-item {
  flex: 1;
}

.pt-5 {
  padding-top: 5px;
}
</style>
