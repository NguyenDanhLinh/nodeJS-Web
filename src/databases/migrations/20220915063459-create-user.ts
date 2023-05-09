module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      email: {
        type: Sequelize.STRING(255),
        field: 'email',
        allowNull: false,
      },

      username: {
        type: Sequelize.STRING(255),
        field: 'user_name',
        allowNull: false,
      },

      password: {
        type: Sequelize.STRING(255),
        field: 'password',
        allowNull: false,
      },

      fullName: {
        type: Sequelize.STRING(255),
        field: 'full_name',
        allowNull: false,
      },

      role: {
        type: Sequelize.STRING(255),
        field: 'role',
        allowNull: false,
        defaultValue: 'user',
      },

      cardNum: {
        type: Sequelize.INTEGER,
        field: 'card_num',
        allowNull: true,
      },

      cardType: {
        type: Sequelize.STRING(255),
        field: 'card_type',
        allowNull: true,
      },

      address: {
        type: Sequelize.STRING(255),
        field: 'address',
        allowNull: false,
      },

      tel: {
        type: Sequelize.INTEGER,
        field: 'tel',
        allowNull: false,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
    })

    await Promise.all([
      QueryInterface.addIndex('users', ['email'], {
        name: ['users', 'email', 'unique'].join('_'),
        indicesType: 'unique',
        type: 'unique',
      }),
    ])
  },

  down: async (queryInterface) => queryInterface.dropTable('users'),
}
