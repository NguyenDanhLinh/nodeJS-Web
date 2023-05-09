module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('bills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      date: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'date',
      },

      paymentMethod: {
        type: Sequelize.STRING(255),
        field: 'payment_method',
        allowNull: false,
      },

      totalPrice: {
        type: Sequelize.INTEGER,
        field: 'total_price',
        allowNull: false,
      },

      shipMent: {
        type: Sequelize.STRING(255),
        field: 'ship_ment',
        allowNull: false,
      },

      status: {
        type: Sequelize.ENUM('pending', 'delivering', 'delivered', 'cancel'),
        field: 'status',
        allowNull: false,
        defaultValue: 'pending',
      },

      cardId: {
        type: Sequelize.INTEGER,
        field: 'card_id',
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'cards',
          key: 'id',
        },
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
  },

  down: async (queryInterface) => queryInterface.dropTable('bills'),
}
