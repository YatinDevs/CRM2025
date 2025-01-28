## Setting up a Node.js environment :

1.  Install Node.js and npm

    - Download and Install Node.js:

                Visit Node.js official website and download the latest LTS version. https://nodejs.org/en
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

2.  Install PostgreSQL

    - Download and Install PostgreSQL:

          Visit PostgreSQL official website and install the latest version.

    - Setup PostgreSQL:

            During installation, set up a password for the postgres user.
            Use pgAdmin or CLI to manage your database.

## Setup Backend (Server) :

- Tech Stack : Nodejs + Expressjs + Postgres + Docker

> Setup Node App with PostgresSQL ORM

1.  Create Node Project :

    - Install Dependencies :

            npm init or npm init -y
            npm install
            npm i express
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

3.  Creating Model :
