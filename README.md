# exercise-insideboard
Repo for the development of the Insideboard selection process exercise

## Overview and prerequisites
This is a web application linked to a local MongoDB database, so such a database must be present on the user's machine. To see the application working, it's recommended that the database be populated beforehand. To do so, first activate the database. Next, open a terminal on the project's backend folder and enter:
```
npm run dbinit
```

## Start script
Before start executing the application, it's necessary to install the dependencies. For both the frontend and backend folders, simply enter the command:
```
npm install
```

To execute the program on dev mode (Unix systems only), enter command in both the frontend and backend folders:
```
npm run start:dev
```

For prod (Unix systems only), the command for both the frontend and backend is:
```
npm start
```

For non-Unix systems, the commands for bundling and running the application in frontend must be done separately in different terminals. For dev:
```
npm run dev:bundler
```
```
npm run dev:server
```

Finally, for prod:
```
npm run prod:bundler
```
```
npm run prod:server
```

Once the bundled script is generated and the server is running, you can access the page on:
http://localhost:4000/

