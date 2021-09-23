const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("requests", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      fk_service_id: {
        type: DataTypes.UUID,
        references: {
          model: "services",
          key: "service_id",
        },
        onDelete: "cascade",
      },
      fk_consumer_authenticated_entity: {
        type: DataTypes.UUID,
        references: {
          model: "consumers",
          key: "authenticated_entity",
        },
        onDelete: "cascade",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("requests");
  },
};
