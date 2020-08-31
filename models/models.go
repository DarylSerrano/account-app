package models

import (
	"log"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func InitDB() {
	shouldSeed := false
	if !fileExists("./test.db") {
		createDB()
		shouldSeed = true
	}

	database, err := gorm.Open(sqlite.Open("test.db"), &gorm.Config{})
	if err != nil {
		log.Fatalf("Setup model error: %v", err)
	}
	database.AutoMigrate(&User{})
	db = database

	if shouldSeed {
		seedDB()
	}

	log.Println("Dabase initializated")
}

func createDB() {
	f, err := os.Create("./test.db")
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()
}

func seedDB() {
	user1 := User{Name: "Test"}
	user2 := User{Name: "Test2"}

	err := db.Create(&user1).Error
	if err != nil {
		log.Fatal(err)
	}

	err = db.Create(&user2).Error
	if err != nil {
		log.Fatal(err)
	}

	// CRUD With assosiactions
	userAsso := db.Model(&user1).Association("Connections")
	if userAsso.Error != nil {
		log.Fatal(userAsso.Error)
	}
	err = userAsso.Append([]User{user2})
	if err != nil {
		log.Fatal(err)
	}
	user2Asso := db.Model(&user2).Association("Connections")
	if user2Asso.Error != nil {
		log.Fatal(user2Asso.Error)
	}
	err = user2Asso.Append([]User{user1})
	if err != nil {
		log.Fatal(err)
	}

	log.Println("Finish db seeding")
}

func fileExists(path string) bool {
	info, err := os.Stat(path)
	if err != nil {
		if os.IsNotExist(err) {
			return false
		}
		log.Fatal(err)
	}
	return !info.IsDir()
}
