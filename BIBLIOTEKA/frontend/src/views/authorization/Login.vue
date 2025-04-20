<template>
    <div class="col-md-12 col-lg-12 mx-auto mx-1">
      <h4 class="text-center mb-4">Вход в систему</h4>
      <form @submit.prevent="handleLogin" class="bg-light p-4 rounded shadow-sm">
        <div class="form-group mb-3">
          <input type="text" class="form-control" placeholder="Логин" v-model="user.username" required />
        </div>
        <div class="form-group mb-3">
          <input type="password" class="form-control" placeholder="Пароль" v-model="user.password" required />
        </div>
        <div class="form-group text-center mb-3">
          <button class="btn btn-primary w-100" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            <span>Войти</span>
          </button>
        </div>
        <div class="text-center mb-3">
          <router-link to="/register" class="text-decoration-none">Зарегистрироваться</router-link>
        </div>
        <div v-if="message" class="alert alert-danger text-center" role="alert">{{ message }}</div>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'LoginUser',
    setup() {
      const store = useStore();
      const user = ref({ username: '', password: '' });
      const loading = ref(false);
      const message = ref('');
  
      const handleLogin = async () => {
        loading.value = true;
        message.value = ''; 
  
        try {
          await store.dispatch('auth/login', user.value); 
          window.location.href = '/listBooks'; 
        } catch (error) {
          loading.value = false;
          message.value = error.response.data.message; 
        }
      };
  
      return {
        user, 
        loading,
        message,
        handleLogin
      };
    }
  };
  </script>

  