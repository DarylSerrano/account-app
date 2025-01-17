package routes

import (
	"errors"
	"log"
	"net/http"

	"github.com/DarylSerrano/account-app/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type createUserInput struct {
	Name string `json:"name" binding:"required"`
}

func GetUsersEndpoint(c *gin.Context) {
	users, err := models.GetAllUser()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": users})
	}
}

func GetUserEndpoint(c *gin.Context) {
	id := c.Param("id")

	user, err := models.GetUser(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
	} else {
		c.JSON(http.StatusOK, gin.H{"data": *user})
	}
}

func PostUserEndpoint(c *gin.Context) {
	var userInput createUserInput
	err := c.ShouldBindJSON(&userInput)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	err = models.CreateUser(userInput.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func PutUserEndpoint(c *gin.Context) {
	var userInput createUserInput
	if err := c.ShouldBindJSON(&userInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	id := c.Param("id")

	_, err := models.GetUser(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Create user
			models.CreateUser(userInput.Name)
			c.JSON(http.StatusOK, gin.H{})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
	} else {
		// Update user
		err := models.UpdateUser(id, userInput.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusOK, gin.H{})
		}
	}
}

func DeleteUserEndpoint(c *gin.Context) {
	id := c.Param("id")

	err := models.DeleteUser(id)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNoContent, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
