module.exports = (sequelize, Sequelize) => {
    const Trade = sequelize.define('Trade', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_1_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        user_2_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        book_1_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        book_2_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.ENUM('ОТПРАВКА', 'СОСТОЯЛСЯ', 'ОТКЛОНЕНО'),
            allowNull: false,
        },
    });

    Trade.associate = (models) => {
        // Связь с первым пользователем (1:N)
        Trade.belongsTo(models.user, {
            foreignKey: 'user_1_id',
             as: 'user1'
        });

        // Связь со вторым пользователем (1:N)
        Trade.belongsTo(models.user, {
            foreignKey: 'user_2_id',
            as: 'user2'
        });

        // Связь с первой книгой (1:N)
        Trade.belongsTo(models.book, {
            foreignKey: 'book_1_id',
             as: 'book1'
        });

        // Связь со второй книгой (1:N)
        Trade.belongsTo(models.book, {
            foreignKey: 'book_2_id',
            as: 'book2'
        });
    };
    

    return Trade;
};
