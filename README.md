Clone this repository.

```
git clone https://github.com/zalias9/short-backend.git
cd short-backend
```

You must add a .env file in the root folder (Where this README.md file is located). The .env file should contain the following environment variables to connect to the postgres database.

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
```

Then,

```
npm i
npm start
```

**If the postgres database connection is successful, the appropriate table will be created when the backend server is run for the first time.** (You can check the TypeORM Entity for the table in /src/entities/url.entity.ts)

By default, the backend server will run on http://localhost:8080.
