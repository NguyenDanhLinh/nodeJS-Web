module.exports = {
  up: async (QueryInterface, Sequelize) => {
    await QueryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      productName: {
        type: Sequelize.STRING(255),
        field: 'product_name',
        allowNull: false,
      },

      img: {
        type: Sequelize.STRING(255),
        field: 'img',
        allowNull: false,
      },

      price: {
        type: Sequelize.INTEGER,
        field: 'price',
        allowNull: false,
      },

      type: {
        type: Sequelize.STRING(255),
        field: 'type',
        allowNull: false,
      },

      des: {
        type: Sequelize.STRING(255),
        field: 'des',
        allowNull: false,
      },

      categoryId: {
        type: Sequelize.INTEGER,
        field: 'category_id',
        allowNull: true,
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        references: {
          model: 'categories',
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

  down: async (queryInterface) => queryInterface.dropTable('products'),
}
