# User connections
## Requirements
* Nodejs >=v12.13.0
* yarn
* go 1.15

## Deployment instructions
* Linux
```bash
$ ./build.sh
$ ./gin-gonic-test
```


* Windows (since [yarn quits after the command install on a bat script](https://github.com/yarnpkg/yarn/issues/2809) the process is a little bit different from linux build)
```powershell
cd client
yarn install
yarn build
cd ..
go build
.\gin-gonic-test.exe
```


Then visit `http://localhost:8080`

## Development
```bash
# Run backend on one terminal
go run main.go
# Start frontend on another terminal
yarn start
# Visit localhost:3000
```