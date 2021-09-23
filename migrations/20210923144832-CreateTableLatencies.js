const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("latencies", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      proxy: {
        type: DataTypes.INTEGER,
      },
      kong: {
        type: DataTypes.INTEGER,
      },
      request: {
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
    });
  },

  down: async (queryInterface) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("latencies");
  },
};
