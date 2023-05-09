module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('product_card', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      amount: {
        type: Sequelize.INTEGER,
        field: 'amount',
        allowNull: false,
      },

      cardID: {
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

      productId: {
        type: Sequelize.INTEGER,
        field: 'product_id',
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'products',
          key: 'id',
        },
      },

      billId: {
        type: Sequelize.INTEGER,
        field: 'bill_id',
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'bills',
          key: 'id',
        },
      },

      status: {
        type: Sequelize.BOOLEAN,
        field: 'status',
        allowNull: false,
        defaultValue: true,
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

  down: async (queryInterface) => queryInterface.dropTable('product_card'),
}
