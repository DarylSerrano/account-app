package main

import (
	"github.com/DarylSerrano/gin-gonic-test/models"
	"github.com/DarylSerrano/gin-gonic-test/routes"
)

func main() {
	models.InitDB()
	r := routes.SetupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
