package models

func GetAllConnections(id uint) (*[]User, error) {
	var user User
	var usersConnected []User

	err := db.First(&user, id).Error

	if err != nil {
		return nil, err
	}

	err = db.Model(&user).Association("Connections").Find(&usersConnected)
	if err != nil {
		return nil, err
	}

	return &usersConnected, nil
}

func CreateConnection(idFrom uint, idTo uint) error {
	var user User
	var userConnectTo User

	err := db.First(&user, idFrom).Error
	if err != nil {
		return err
	}

	// Check exists
	err = db.First(&userConnectTo, idTo).Error
	if err != nil {
		return err
	}

	// Two way association
	asso := db.Model(&user).Association("Connections")
	if asso.Error != nil {
		return asso.Error
	}

	err = asso.Append([]User{userConnectTo})
	if err != nil {
		return err
	}

	asso = db.Model(&userConnectTo).Association("Connections")
	if asso.Error != nil {
		return asso.Error
	}

	err = asso.Append([]User{user})
	if err != nil {
		return err
	}

	return nil
}

func DeleteConnection(idFrom uint, idTo uint) error {
	var user User
	var userConnectedTo User

	err := db.First(&user, idFrom).Error
	if err != nil {
		return err
	}

	// Check it exists
	err = db.First(&userConnectedTo, idTo).Error
	if err != nil {
		return err
	}

	// Delete 2way relationships
	asso := db.Model(&user).Association("Connections")
	if asso.Error != nil {
		return asso.Error
	}
	err = asso.Delete([]User{userConnectedTo})
	if err != nil {
		return err
	}

	asso = db.Model(&userConnectedTo).Association("Connections")
	if asso.Error != nil {
		return asso.Error
	}
	err = asso.Delete([]User{user})
	if err != nil {
		return err
	}

	return nil
}
