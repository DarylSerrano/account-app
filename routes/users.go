package routes

import (
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/DarylSerrano/gin-gonic-test/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type CreateUserInput struct {
	Name string `json:"name" binding:"required"`
}

func GetUsersEndpoint(c *gin.Context) {
	users, err := models.GetAllUser()
	if err != nil {
		log.Println(err)
		c.JSON(http.StatusInternalServerError, gin.H{})
	} else {
		c.JSON(http.StatusOK, gin.H{"data": users})
	}
}

func GetUserEndpoint(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 32)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	user, err := models.GetUser(int(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{})
		}
		log.Println(err)
	} else {
		c.JSON(http.StatusOK, gin.H{"data": *user})
	}
}

func PostUserEndpoint(c *gin.Context) {
	var userInput CreateUserInput
	err := c.ShouldBindJSON(&userInput)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = models.CreateUser(userInput.Name)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func PutUserEndpoint(c *gin.Context) {
	var userInput CreateUserInput
	if err := c.ShouldBindJSON(&userInput); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	}

	id, err := strconv.ParseInt(c.Param("id"), 10, 32)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	_, err = models.GetUser(int(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// Create user
			models.CreateUser(userInput.Name)
			c.JSON(http.StatusOK, gin.H{})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{})
		}
		log.Println(err)
	} else {
		// Update user
		err := models.UpdateUser(int(id), userInput.Name)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{})
		} else {
			c.JSON(http.StatusOK, gin.H{})
		}
	}
}

func DeleteUserEndpoint(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 32)

	if err != nil {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}

	err = models.DeleteUser(int(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{})
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}