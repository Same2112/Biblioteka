module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        password: {
            type: Sequelize.STRING(150),
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM('АДМИНИСТРАТОР', 'ПОЛЬЗОВАТЕЛЬ'),
            allowNull: false,
        },
        firstname: {
            type: Sequelize.STRING(50),
        },
        lastname: {
            type: Sequelize.STRING(50),
        },
        middlename: {
            type: Sequelize.STRING(50),
        },
        count: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
    });

    User.associate = (models) => {
        User.hasMany(models.book, {
            foreignKey: 'user_id',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id'
        });

        User.hasMany(models.trade, {
            foreignKey: 'user_1_id', // связь с первым пользователем
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id',
        });

        User.hasMany(models.trade, {
            foreignKey: 'user_2_id', // связь со вторым пользователем
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
            sourceKey: 'id',
        });
    };

    return User;
};
