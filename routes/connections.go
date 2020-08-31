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

type connectionInput struct {
	ID uint `json:"id" binding:"required"`
}

func GetAllConnectionsEndpoint(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}
	users, err := models.GetAllConnections(uint(id))
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": *users})
}

func CreateConnectionEndpoint(c *gin.Context) {
	var connectionInfo connectionInput
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		log.Println(err)
		return
	}

	// Connection Info, check if exists
	err = c.ShouldBindJSON(&connectionInfo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = models.CreateConnection(uint(id), connectionInfo.ID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}

func DeleteConnectionEndpoint(c *gin.Context) {
	var connectionInfo connectionInput
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 32)
	if err != nil {
		c.JSON(http.StatusNoContent, gin.H{})
		log.Println(err)
		return
	}

	// Connection Info, check if exists
	err = c.ShouldBindJSON(&connectionInfo)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = models.DeleteConnection(uint(id), connectionInfo.ID)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			c.JSON(http.StatusNoContent, gin.H{})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		log.Println(err)
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
