# KymppitonniNoppapeli
Kymppitonni-noppapelin web-versio. Hessun muistolle.

# Requirements 

- NodeJs 
- npm (usually installed with NodeJs)

# Installation
Clone the repository and install dependencies:
```
git clone https://github.com/thetravis/KymppitonniNoppapeli.git
cd KymppitonniNoppapeli
npm install 
```
# Build 

Run build by:
```
npm run build
```

You may need to install Angular Client and TypeScript Compiler globally:
```
sudo npm install -g @angular/cli tsc
```

# Run

Start running the server by:
```
npm start
```

and see http://localhost:3000

# Development 

Build client and server and start watching changes in code:
```
npm run build:dev
```
You may want to install `nodemon` and run the server with it
```
sudo npm install -g nodemon
nodemon ./dist/server/server.js
```