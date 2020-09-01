# User connections
## Requirements
* Nodejs
* yarn
* golang

## Deployment instructions
* Linux
```bash
$ ./build.sh
$ ./gin-gonic-test
```
* Windows
```powershell
.\build.bat
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