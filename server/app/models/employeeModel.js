const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db");
// const Role = require("./roleModel");
// const Client = require("./clientModel");
// const Task = require("./Task");
// const Attendance = require("./Attendance");
// const Leave = require("./Leave");
// const Review = require("./Review");

// Name done,
// mobNo done,
// emailid done,
// alternateno done,
// designation,
// address,
// DOB,
// Date of Joining,
// probation date,
// Training period,
// Date of Increment
// Reference Contact Enum ( Cont 1,cont 2)
// BloodGroup,
// Anniversay Date,
// Attachments : files ( pdf )- PanCard / adharCard/ bank details
//             - If any ( last exp letter/appointment letter/education certificate)
// 	    - Report Card :
//                  - - -- - -
//                  - - - -- -

// Attendance : monthly wise/ yearly wise

// Authority For HR :

// 	- Can view
// 	- Can modify
// 	- Can Edit
// 	- Can Download emp Data

const Employee = sequelize.define(
  "Employee",
  {
    employee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    alternate_phone: {
      type: DataTypes.STRING(15),
    },
    designation: {
      type: DataTypes.STRING(50),
    },
    department: {
      type: DataTypes.ENUM,
      values: [
        "Development Team",
        "HR Team",
        "Marketing Team",
        "Interns",
        "Sales Team",
        "Support Team",
      ],
    },
    dob: {
      type: DataTypes.DATE,
    },
    joining_date: {
      type: DataTypes.DATE,
    },
    probation_end_date: {
      type: DataTypes.DATE,
    },
    training_end_date: {
      type: DataTypes.DATE,
    },
    increment_date: {
      type: DataTypes.DATE,
    },
    anniversary_date: {
      type: DataTypes.DATE,
    },
    address: {
      type: DataTypes.TEXT,
    },
    blood_group: {
      type: DataTypes.STRING(5),
    },
    reference_contacts: {
      type: DataTypes.JSONB,
    },
    attachments: {
      type: DataTypes.JSONB,
    },
    // role_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "roles",
    //     key: "role_id",
    //   },
    // },
    // assigned_clients: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: {
    //     model: "clients",
    //     key: "client_id",
    //   },
    // },
    // assigned_tasks: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: {
    //     model: "tasks",
    //     key: "task_id",
    //   },
    // },
    // kpi: {
    //   type: DataTypes.JSONB,
    // },
    // attendance: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: {
    //     model: "attendance",
    //     key: "attendance_id",
    //   },
    // },
    // leave_history: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: {
    //     model: "leaves",
    //     key: "leave_id",
    //   },
    // },
    // performance_reviews: {
    //   type: DataTypes.ARRAY(DataTypes.INTEGER),
    //   references: {
    //     model: "reviews",
    //     key: "review_id",
    //   },
    // },
  },
  {
    tableName: "employees",
    timestamps: true,
    underscored: true,
  }
);

// Associations
Employee.associate = (models) => {
  // Employee.belongsTo(models.Role, { foreignKey: "role_id", as: "Role" });
  // Employee.hasMany(models.Task, { foreignKey: "assigned_to", as: "Tasks" });
  // Employee.hasMany(models.Attendance, {
  //   foreignKey: "employee_id",
  //   as: "AttendanceRecords",
  // });
  // Employee.hasMany(models.Leave, { foreignKey: "employee_id", as: "Leaves" });
  // Employee.hasMany(models.Review, { foreignKey: "employee_id", as: "Reviews" });
};

module.exports = Employee;

// Define associations

// Employee.associate = (models) => {};
// Employee.belongsTo(Role, { foreignKey: "role_id", as: "role" });
// Employee.belongsToMany(Client, {
//   through: "EmployeeClients",
//   foreignKey: "employee_id",
//   otherKey: "client_id",
//   as: "clients",
// });
// Employee.belongsToMany(Task, {
//   through: "EmployeeTasks",
//   foreignKey: "employee_id",
//   otherKey: "task_id",
//   as: "tasks",
// });
// Employee.belongsToMany(Attendance, {
//   through: "EmployeeAttendance",
//   foreignKey: "employee_id",
//   otherKey: "attendance_id",
//   as: "attendanceRecords",
// });
// Employee.belongsToMany(Leave, {
//   through: "EmployeeLeaves",
//   foreignKey: "employee_id",
//   otherKey: "leave_id",
//   as: "leaves",
// });
// Employee.belongsToMany(Review, {
//   through: "EmployeeReviews",
//   foreignKey: "employee_id",
//   otherKey: "review_id",
//   as: "reviews",
// });

// module.exports = Employee;

// Table Schema -Employee
// CREATE TABLE employees (
//     employee_id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     phone VARCHAR(15) UNIQUE NOT NULL,
//     alternate_phone VARCHAR(15),
//     designation VARCHAR(50),
//     employee_type VARCHAR(50),
//     department VARCHAR(50),
//     dob DATE,
//     joining_date DATE,
//     probation_end_date DATE,
//     training_end_date DATE,
//     increment_date DATE,
//     anniversary_date DATE,
//     address TEXT,
//     blood_group VARCHAR(5),
//     reference_contacts JSONB,
//     attachments JSONB,
//     role_id INTEGER REFERENCES roles(role_id),  -- Reference to the roles table
//     assigned_clients INTEGER[] REFERENCES clients(client_id),  -- Reference to assigned clients
//     assigned_tasks INTEGER[] REFERENCES tasks(task_id),  -- Reference to assigned tasks
//     kpi JSONB,  -- Key performance indicators for tracking work
//     attendance INTEGER[] REFERENCES attendance(attendance_id),  -- Reference to attendance table
//     leave_history INTEGER[] REFERENCES leaves(leave_id),  -- Reference to leave table
//     performance_reviews INTEGER[] REFERENCES reviews(review_id),  -- Reference to performance reviews table
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
