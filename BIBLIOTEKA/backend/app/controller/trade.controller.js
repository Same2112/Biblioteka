const db = require('../config/db.config.js');
const { sendResult, sendError } = require('../config/global.functions.js');

const Trade = db.trade;
const Book = db.book
const User = db.user;

exports.requestTrade = async (req, res) => {
    try {
        const { user_2_id, book_1_id, book_2_id } = req.body;
        const user_1_id = req.userId;

        const trade = await Trade.create({
            user_1_id,
            user_2_id,
            book_1_id,
            book_2_id,
            status: 'ОТПРАВКА',
        });

        sendResult(res, { message: 'Запрос на обмен отправлен', trade });
    } catch (err) {
        sendError(res, err);
    }
};

exports.getTradesForUser = async (req, res) => {
    try {
    const userId = req.userId;
      const trades = await Trade.findAll( { where: { user_2_id: userId },
        include: [
            { 
                model: db.book, 
                as: 'book1',
                attributes: ['id', 'name', 'author']
            },
            { 
                model: db.book, 
                as: 'book2',
                attributes: ['id', 'name', 'author'] 
            }
        ]
    });
      sendResult(res, trades);
    } catch (err) {
        sendError(res, err);;
    }
  };

  exports.getTradesForUser2 = async (req, res) => {
    try {
    const userId = req.userId;
      const trades = await Trade.findAll( { where: { user_1_id: userId },
        include: [
            { 
                model: db.book, 
                as: 'book1',
                attributes: ['id', 'name', 'author'] 
            },
            { 
                model: db.book, 
                as: 'book2',
                attributes: ['id', 'name', 'author']
            }
        ]
    });
      sendResult(res, trades);
    } catch (err) {
        sendError(res, err);;
    }
  };

  exports.deleteTrade = async (req, res) => {
    try {
        const tradeId = req.params.id;

        const trade = await Trade.findByPk(tradeId);
        if (!trade) {
            return sendError(res, { message: "Трейд не найден" });
        }

        await Trade.destroy({ where: { id: tradeId } });
        sendResult(res, { message: "Трейд успешно удалён" });
    } catch (err) {
        console.error("Ошибка при удалении трейда:", err);
        sendError(res, err);
    }
};

exports.updateTradeStatus = async (req, res) => {
    try {
        const { tradeId, status } = req.body;
        const trade = await Trade.findByPk(tradeId);
        if (!trade) {
            return sendError(res, { message: "Обмен не найден" });
        }
        trade.status = status;
        await trade.save();


        if (status === 'СОСТОЯЛСЯ') {
            const book1 = await Book.findByPk(trade.book_1_id);
            const book2 = await Book.findByPk(trade.book_2_id);

            if (book1) {
                const owner1 = await User.findByPk(book1.user_id);
                await book1.update({ count: book1.count - 1 });
                if (owner1) {
                    await owner1.update({ count: owner1.count - 1 });
                }
                if (book1.count <= 0) {
                    await book1.destroy();
                } else {
                    await book1.save();
                }
            }

            if (book2) {
                const owner2 = await User.findByPk(book2.user_id);
                await book2.update({ count: book2.count - 1 });
                if (owner2) {
                    await owner2.update({ count: owner2.count - 1 });
                }
                if (book2.count <= 0) {
                    await book2.destroy();
                } else {
                    await book2.save();
                }
            }
        }

        await Trade.destroy({ where: { id: tradeId } });

        sendResult(res, { message: "Статус обмена обновлён", trade });
    } catch (err) {
        console.error("Ошибка при обновлении статуса трейда:", err);
        sendError(res, err);
    }
};

