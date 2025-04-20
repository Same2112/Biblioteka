import http from "../http-common";

function deleteTrade(tradeId) {
    return http.delete(`/api/trade/${tradeId}`);
}

function updateTradeStatus(tradeId, status) {
    return http.post("/api/trade/status", { tradeId, status });
}

const tradeService = {
    deleteTrade,
    updateTradeStatus,
};

export default tradeService;