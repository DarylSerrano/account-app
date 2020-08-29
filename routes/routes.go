package routes

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	router := gin.Default()

	// Ping test
	router.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	// Users router
	usersRoute := router.Group("/api/users")
	{
		usersRoute.GET("/", GetUsersEndpoint)
		usersRoute.POST("/", PostUserEndpoint)
		usersRoute.GET("/:id", GetUserEndpoint)
		usersRoute.PUT("/:id", PutUserEndpoint)
		usersRoute.DELETE("/:id", DeleteUserEndpoint)
	}

	return router
}
