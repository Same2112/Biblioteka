<template>
  <div id="trade-page">
    <h2>Предложения</h2>

    <div v-if="trades.length">
      <div v-for="trade in trades" :key="trade.id" class="trade-item">
        <div class="trade-details">
          Предлагает: <br /><strong>{{ trade.book2.name }} - {{ trade.book2.author }}</strong> <br />
          Обменять на: <br /><strong> {{ trade.book1.name }} - {{ trade.book1.author }} </strong><br />
        </div>
        <div class="trade-actions">
          <button @click="updateStatus(trade.id, 'СОСТОЯЛСЯ')" class="accept-btn">
            Принять 
          </button>
          <button @click="updateStatus(trade.id, 'ОТКЛОНЕНО')" class="reject-btn">
            Отклонить 
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>У вас пока нет активных обменов.</p>
    </div>

    <h2>Отправленные</h2>

    <div v-if="trades2.length">
      <div v-for="trade in trades2" :key="trade.id" class="trade-item">
        <div class="trade-details">
          Вы предложили:<br /> <strong>{{ trade.book1.name }} - {{ trade.book1.author }}</strong> <br />
          Обменять на:<br /> <strong>{{ trade.book2.name }} - {{ trade.book2.author }}</strong> <br />
        </div>
        <div class="trade-actions">
          <button @click="deleteTrade(trade.id)" class="delete-btn">Удалить трейд</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>У вас пока нет отправленных обменов.</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import http from "../../http-common";

export default defineComponent({
  name: "Trade",
  setup() {
    const trades = ref([]);
    const trades2 = ref([]);

    const getTrades = () => {
      http
        .get("/usertrade")
        .then((response) => {
          trades.value = response.data;
        })
        .catch((e) => {
          console.error("Ошибка при получении трейдов:", e);
        });
    };

    const getTrades2 = () => {
      http
        .get("/usertrade2")
        .then((response) => {
          trades2.value = response.data;
        })
        .catch((e) => {
          console.error("Ошибка при получении отправленных трейдов:", e);
        });
    };

    const deleteTrade = (tradeId) => {
      http
        .delete(`/trade/${tradeId}`)
        .then(() => {
          console.log("Трейд удалён успешно");
          getTrades();
          getTrades2();
        })
        .catch((e) => {
          console.error("Ошибка при удалении трейда:", e);
        });
    };

    const updateStatus = (tradeId, status) => {
      http
        .post("/trade/status", { tradeId, status })
        .then(() => {
          console.log("Статус успешно обновлён");
          getTrades();
          getTrades2();
        })
        .catch((e) => console.error("Ошибка при обновлении статуса трейда:", e));
    };

    onMounted(() => {
      getTrades();
      getTrades2();
    });

    return {
      trades,
      trades2,
      deleteTrade,
      updateStatus,
    };
  },
});
</script>

<style scoped>
#trade-page {
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.trade-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f9f9f9;
}

.trade-details {
  margin-bottom: 10px;
}

.trade-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

button.delete-btn,
button.accept-btn,
button.reject-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

button.accept-btn {
  background-color: #4caf50;
  color: white;
}

button.accept-btn:hover {
  background-color: #45a049;
}

button.reject-btn {
  background-color: #f44336;
  color: white;
}

button.reject-btn:hover {
  background-color: #e53935;
}

button.delete-btn {
  background-color: #f44336;
  color: white;
}

button.delete-btn:hover {
  background-color: #e53935;
}

button i {
  font-size: 16px;
}

strong {
  color: #333;
}
</style>
