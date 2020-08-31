package models

import "log"

type User struct {
	ID   uint   `json:"id" gorm:"primaryKey"`
	Name string `json:"name"`
}

func GetAllUser() (*[]User, error) {
	var users []User
	result := db.Find(&users)
	log.Printf("Get all user  RowsAffected: %v ", result.RowsAffected)
	err := result.Error
	if err != nil {
		return nil, err
	}
	return &users, nil

}

func GetUser(id string) (*User, error) {
	var user User
	err := db.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func CreateUser(name string) error {
	err := db.Create(&User{Name: name}).Error
	if err != nil {
		return err
	}
	return nil
}

func UpdateUser(id string, name string) error {
	err := db.Model(&User{}).Where("ID = ?", id).Update("Name", name).Error
	if err != nil {
		return err
	}
	return nil
}

func DeleteUser(id string) error {
	err := db.Delete(&User{}, id).Error
	if err != nil {
		return err
	}
	return nil
}
