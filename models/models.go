package models

import (
	"log"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Setup model error: %v", err)
	}
	database.AutoMigrate(&User{})
	db = database
	log.Println("Dabase initializated")
}

func SeedDB() {
}
