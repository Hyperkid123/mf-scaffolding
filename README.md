# This is a prototype for chrome 2.0

## How to run
this project is using yarn workspaces to link all packages so **use yarn to install dependencies**

### Install
```bash
$ yarn
```

### Build core functions package
```bash
$ cd packages/core-functions
$ yarn build # or yarn build --watch if you want to make changes inside this package
```

### Make sure nothing is running on localhost 8080, 8081 and 8082

### Start applications
```bash
# Applet ONE 
$ cd packages/app-1
$ yarn start
```
```bash
# Applet TWO
$ cd packages/app-2
$ yarn start
```

### Start scaffolding

```bash
# Applet ONE 
$ cd packages/scaffolding
$ yarn start
```
