const db = require('../config/db.config.js');
const { sendResult, sendError } = require('../config/global.functions.js');

const User = db.user;

exports.getUserCount = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).send({ message: 'Пользователь не найден' });
        }
        sendResult(res, { user });
    } catch (err) {
        sendError(res, err);
    }
};