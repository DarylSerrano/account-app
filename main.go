package main

import (
	"github.com/DarylSerrano/account-app/models"
	"github.com/DarylSerrano/account-app/routes"
)

func main() {
	models.InitDB()
	r := routes.SetupRouter()
	// Listen and Serve in 0.0.0.0:8080
	r.Run(":8080")
}
