const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Admin = sequelize.define(
  "Admin",
  {
    admin_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    tableName: "Admins",
    timestamps: false,
    // underscored: true,
  }
);

Admin.associate = (models) => {};

module.exports = Admin;

// admin_id SERIAL PRIMARY KEY,
// name VARCHAR(100) NOT NULL,
// email VARCHAR(100) UNIQUE NOT NULL,
// password TEXT NOT NULL,
// role_id INTEGER REFERENCES roles(role_id),  -- Reference to roles table
// assigned_permissions JSONB,  -- List of permissions that this admin can override, if applicable
// manage_users INTEGER[] REFERENCES employees(employee_id),  -- List of users (employees) the admin can manage
// manage_clients INTEGER[] REFERENCES clients(client_id),  -- List of clients the admin manages
// view_reports INTEGER[] REFERENCES reports(report_id),  -- Reports the admin can view
// manage_settings JSONB,  -- Admin's ability to manage system settings
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
