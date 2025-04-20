module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('Book', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        author: {
            type: Sequelize.STRING(50),
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 1,
        },
        description: {
            type: Sequelize.STRING(300),
        },
    });

    Book.associate = (models) => {
        Book.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
        Book.hasMany(models.trade, {
            foreignKey: 'book_1_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id',
        });

        Book.hasMany(models.trade, {
            foreignKey: 'book_2_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id',
        });
    };

    return Book;
};
