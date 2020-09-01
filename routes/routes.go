package routes

import (
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	router := gin.Default()

	// Cors
	router.Use(cors.Default())

	// Client static folder serving
	router.Use(static.Serve("/", static.LocalFile("./client/build", true)))

	// Ping test
	router.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	// Users router
	usersRoute := router.Group("/api/users")
	{
		usersRoute.GET("/", GetUsersEndpoint)
		usersRoute.POST("/", PostUserEndpoint)

		usersRoute.GET("/:id/connections", GetAllConnectionsEndpoint)
		usersRoute.POST("/:id/connections", CreateConnectionEndpoint)
		usersRoute.DELETE("/:id/connections", DeleteConnectionEndpoint)

		usersRoute.GET("/:id", GetUserEndpoint)
		usersRoute.PUT("/:id", PutUserEndpoint)
		usersRoute.DELETE("/:id", DeleteUserEndpoint)

	}

	return router
}
