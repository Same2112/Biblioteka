import tradeService from "../services/trade.service";

export const REQUEST_TRADE = "REQUEST_TRADE";
export const SET_USER_TRADES = "SET_USER_TRADES";

const state = {
    trades: [],
    currentTrade: null,
};

const mutations = {
    [SET_USER_TRADES](state, trades) {
        state.trades = trades;
    }
};

const actions = {
    async requestTrade({ commit }, tradeData) {
        try {
            const response = await tradeService.requestTrade(tradeData);
            console.log("Запрос на обмен отправлен", response.data);
            return response.data;
        } catch (error) {
            console.error("Ошибка при отправке запроса на обмен:", error);
            throw error;
        }
    },
};

const getters = {
    trades: (state) => state.trades,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};