const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags = ['Users']
    const result = await mongodb.getDatabase().collection('contacts').find();
    result.toArray()
        .then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch users' });
        });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Users']
    
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('contacts').find({ _id: contactId });
    result.toArray()
        .then((contacts) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(contacts[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch users' });
        });
}

const createUser = async (req, res) => {;
    //#swagger.tags = ['Users']
    const newContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().collection('contacts').insertOne(newContact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create user' });
    }
}

const updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const contactId = new ObjectId(req.params.id);
    const updatedContact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const response = await mongodb.getDatabase().collection('contacts').replaceOne({ _id: contactId }, updatedContact);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'User updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update user' });
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tags = ['Users']
    const contactId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().collection('contacts').deleteOne({ _id: contactId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'User deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete user' });
    }
}

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};