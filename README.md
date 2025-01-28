## Setting up a Node.js environment :

1.  Install Node.js and npm

    - Download and Install Node.js:

              Visit Node.js official website and download the latest LTS version.

      - https://nodejs.org/en

             The installation includes npm (Node Package Manager).

    - Verify Installation:

                node -v
                npm -v

    - Manually Add Node.js to PATH (if needed) :

          Locate the Node.js installation directory. By default, it’s something like:

                C:\Program Files\nodejs

    - Add this directory to the PATH:

      - Press Win + R, type sysdm.cpl, and press Enter.
      - Go to the Advanced tab and click Environment Variables.
      - Under System variables, find Path and click Edit.
      - Add the path to the Node.js installation directory
        (e.g., C:\Program Files\nodejs).
      - Click OK to save.

    - Restart your terminal and try running node -v and npm -v again.

    1.  Bypass Execution Policy

        To fix this issue temporarily, you can bypass the execution policy for the current PowerShell session by running:

                Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

        After running this command, try executing npm -v again:

                 npm -v

    2.  Set Execution Policy for the Current User (Recommended)

        If you want a more permanent solution for your user account, change the execution policy to RemoteSigned, which allows locally created scripts to run while requiring remote scripts to be signed:

                Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

        Explanation:

        RemoteSigned: Allows running locally created scripts but requires remote scripts to be signed.

        CurrentUser: Applies the change only to the current user's account.

                    npm -v again to verify.

2.  Install PostgreSQL 16 and PGAdmin4

    - Download and Install PostgreSQL:

          Visit PostgreSQL official website and install the latest version.

      - https://www.postgresql.org/download/
      - https://www.enterprisedb.com/downloads/postgres-postgresql-downloads

    - Setup PostgreSQL:

            During installation, set up a password for the postgres user.
            Use pgAdmin or CLI to manage your database.

3.  Setting Up github repository :

        echo "# CRM2025" >> README.md
        git init
        git add README.md
        git commit -m "first commit"
        git branch -M main
        git remote add origin https://github.com/YatinDevs/CRM2025.git
        git push -u origin main

## Setup Backend (Server) :

- Tech Stack : Nodejs + Expressjs + Postgres + Docker

> Setup Node App with PostgresSQL ORM

1.  Create Node Project :

    - Install Dependencies :

            npm init or npm init -y
            npm install
            npm i express cors morgan body-parser
            npm i nodemon
            npm i dotenv
            npm run dev or npm start

    - Folder Structuring :

            Add .gitignore
            Add App folder
            - config
            - controller
            - middleware
            - models
            - routes
            - index.js

    - create server script and run it

2.  Setup Database to Node server :

            npm i pg
            npm i sequelize

    - created config folder -> db.config.js -> configuration with env

            # Postgres - Docker Configuration env
            POSTGRESDB_USER=postgres
            POSTGRESDB_ROOT_PASSWORD=12345
            POSTGRESDB_DATABASE=lite-server_db
            POSTGRESDB_LOCAL_PORT=5433
            POSTGRESDB_DOCKER_PORT=5432

            # Hosted db / Local db - Configuration env
            DB_HOST=localhost
            DB_USER=postgres
            DB_PASSWORD=root
            DB_NAME=rich-crm
            DB_PORT=5433

    - created utils folder -> db.js -> configured db with sequelize

    - index.js -> dotenv config for env

    - sequelize -> authentication -> synchronization with models -> port connection

3.  Db Schema Design :

Tables:
Employee Table (Contains employee details and their roles)
Client Table (Contains client details)
Role Table (Contains roles and permissions for each role)
Service Table (Contains information about the services provided to clients)
Ticket Table (Contains ticket details raised by clients)
Payments Table (Contains payment details)

1. Employee Table
   The Employee table stores information about employees along with their assigned roles (HR, Sales, Admin, Support, etc.).

Fields:
sql
Copy
Edit
CREATE TABLE Employee (
employee_id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
phone VARCHAR(20) UNIQUE NOT NULL,
alternate_phone VARCHAR(20),
designation VARCHAR(50) CHECK (designation IN ('HR', 'Accounts', 'Sales', 'Marketing', 'Support', 'Development', 'Digital')),
department VARCHAR(100),
dob DATE,
joining_date DATE,
probation_end_date DATE,
training_end_date DATE,
increment_date DATE,
anniversary_date DATE,
address TEXT,
blood_group VARCHAR(10),
reference_contacts JSONB,
attachments JSONB,
authority JSONB,
role_id INTEGER REFERENCES Role(role_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 2. Client Table
The Client table stores the client data, including their services and purchased products.

Fields:
sql
Copy
Edit
CREATE TABLE Client (
client_id SERIAL PRIMARY KEY,
company_name VARCHAR(255) NOT NULL,
address TEXT NOT NULL,
owner_name VARCHAR(255) NOT NULL,
owner_phone VARCHAR(20) NOT NULL,
coordinator_name VARCHAR(255),
coordinator_phone VARCHAR(20),
gst_number VARCHAR(50),
purchased_products JSONB,
user_id VARCHAR(50),
password VARCHAR(255) NOT NULL,
panel_name VARCHAR(255),
service_type VARCHAR(50) CHECK (service_type IN ('GST', 'Non-GST')),
recharge_date DATE,
validity_expire_date DATE,
last_recharge_date DATE,
status VARCHAR(20) CHECK (status IN ('active', 'inactive')),
notes TEXT,
priority_level VARCHAR(50) CHECK (priority_level IN ('Normal', 'High', 'Critical')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 3. Role Table
The Role table defines the roles in the system (HR, Sales, Admin, Support, etc.) and their permissions.

Fields:
sql
Copy
Edit
CREATE TABLE Role (
role_id SERIAL PRIMARY KEY,
role_name VARCHAR(50) NOT NULL,
permissions JSONB NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Example Permissions JSON for Roles:
Support:
json
Copy
Edit
{
"can_create_client": false,
"can_edit_client": false,
"can_view_client": true,
"can_delete_client": false,
"can_manage_services": false,
"can_create_task": false,
"can_manage_task": true,
"can_view_service_details": true,
"can_manage_tickets": true,
"can_resolve_tickets": true,
"can_download_reports": false,
"can_download_employee_data": false
}
Admin:
json
Copy
Edit
{
"can_create_client": true,
"can_edit_client": true,
"can_view_client": true,
"can_delete_client": true,
"can_manage_services": true,
"can_create_task": true,
"can_manage_task": true,
"can_view_service_details": true,
"can_manage_tickets": true,
"can_resolve_tickets": true,
"can_download_reports": true,
"can_download_employee_data": true
}
SuperAdmin:
json
Copy
Edit
{
"can_create_client": true,
"can_edit_client": true,
"can_view_client": true,
"can_delete_client": true,
"can_manage_services": true,
"can_create_task": true,
"can_manage_task": true,
"can_view_service_details": true,
"can_manage_tickets": true,
"can_resolve_tickets": true,
"can_download_reports": true,
"can_download_employee_data": true,
"can_manage_roles": true,
"can_manage_admins": true,
"can_manage_settings": true
} 4. Service Table
The Service table contains information about the services provided to clients.

Fields:
sql
Copy
Edit
CREATE TABLE Service (
service_id SERIAL PRIMARY KEY,
service_name VARCHAR(255) CHECK (service_name IN ('Website Development', 'Mobile App Development', 'Software Development', 'Digital Marketing', 'WhatsApp Tool Marketing', 'Bulk SMS')),
description TEXT,
validity INTEGER, -- Validity in days
price DECIMAL(10, 2),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 5. Ticket Table
The Ticket table contains support tickets raised by clients.

Fields:
sql
Copy
Edit
CREATE TABLE Ticket (
ticket_id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES Client(client_id),
description TEXT NOT NULL,
status VARCHAR(50) CHECK (status IN ('open', 'in-progress', 'closed')),
assigned_to INTEGER REFERENCES Employee(employee_id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 6. Payments Table
The Payments table tracks payment information for clients.

Fields:
sql
Copy
Edit
CREATE TABLE Payment (
payment_id SERIAL PRIMARY KEY,
client_id INTEGER REFERENCES Client(client_id),
amount DECIMAL(10, 2) NOT NULL,
payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
payment_method VARCHAR(50) CHECK (payment_method IN ('Credit Card', 'Debit Card', 'Net Banking', 'UPI', 'Cash')),
payment_status VARCHAR(50) CHECK (payment_status IN ('Pending', 'Completed', 'Failed')),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Model Definitions (Node.js + PostgreSQL ORM)
Here's how you can define the models in Sequelize (PostgreSQL ORM):

javascript
Copy
Edit
// models/Employee.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Role = require('./Role');

class Employee extends Model {}

Employee.init({
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, unique: true, allowNull: false },
phone: { type: DataTypes.STRING, unique: true, allowNull: false },
alternate_phone: { type: DataTypes.STRING },
designation: {
type: DataTypes.STRING,
allowNull: false,
validate: { isIn: [['HR', 'Accounts', 'Sales', 'Support', 'Development', 'Admin']] }
},
department: { type: DataTypes.STRING },
dob: { type: DataTypes.DATE },
joining_date: { type: DataTypes.DATE },
probation_end_date: { type: DataTypes.DATE },
training_end_date: { type: DataTypes.DATE },
increment_date: { type: DataTypes.DATE },
anniversary_date: { type: DataTypes.DATE },
address: { type: DataTypes.TEXT },
blood_group: { type: DataTypes.STRING },
reference_contacts: { type: DataTypes.JSONB },
attachments: { type: DataTypes.JSONB },
authority: { type: DataTypes.JSONB },
}, {
sequelize,
modelName: 'Employee',
timestamps: true,
});

Employee.belongsTo(Role, { foreignKey: 'role_id' });

module.exports = Employee;
javascript
Copy
Edit
// models/Role.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Role extends Model {}

Role.init({
role_name: { type: DataTypes.STRING, allowNull: false },
permissions: { type: DataTypes.JSONB, allowNull: false },
}, {
sequelize,
modelName: 'Role',
timestamps: true,
});

module.exports = Role;
Role-Based Access in Backend (Express)
You can apply role-based checks in your routes using middleware, as shown earlier.

Route Example:
javascript
Copy
Edit
// routes/clientRoutes.js
const express = require('express');
const { createClient } = require('../controllers/clientController');
const checkPermissions = require('../middleware/authorize');

const router = express.Router();

router.post('/create', checkPermissions(['can_create_client']), createClient);

module.exports = router;
Documentation for End Users
Role Management:

HR: Can view, manage, and download employee data.
Accounts: Can manage payments, view bills, and download bills.
Sales: Manages client relationships, and tracks deals until they are closed.
Support: Manages client tickets.
Admin: Has full access to all client, service, and employee data.
SuperAdmin: Has administrative access, including role management and system configurations.
Client Management:

Clients are managed by Sales and Admin.
Tickets raised by clients can be managed by Support.
Payments:

Payments are tracked for clients. Payment records include amounts, methods, and statuses.

RBAC Implementation: This approach is a standard and widely-used method for implementing role-based access control (RBAC) where you define granular permissions (like "can_create_client", "can_manage_services") in a role object.

Controller Logic: Controllers handle the actual data processing logic (CRUD operations), and middleware handles the authorization check for each action based on the user's assigned role.

Scalability: This method scales well because you can easily add more roles and permissions without major changes to the controller logic—just extend the middleware and role definitions.

## Setting Up Authentication Endpoint and API Gateway

- Install Required Dependencies :

                npm i jsonwebtoken
                npm i bcrypt
