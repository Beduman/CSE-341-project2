const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

console.log('Computers Controller Loaded');

const getAll = async (req, res) => {
    //#swagger.tags = ['Computers']
    const result = await mongodb.getDatabase().collection('computers').find();
    result.toArray()
        .then((computers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(computers);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch computers' });
        });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Computers']
    
    const computersId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('computers').find({ _id: computersId });
    result.toArray()
        .then((computers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(computers[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch computers' });
        });
}

const createComputers = async (req, res) => {
    //#swagger.tags = ['Computers']
    const newComputers = {
        name: req.body.name,
        type: req.body.type,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        cpu: req.body.cpu,
        ram: req.body.ram,
        storage: req.body.storage
    };

    const response = await mongodb.getDatabase().collection('computers').insertOne(newComputers);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create computers' });
    }
}

const updateComputers = async (req, res) => {
    //#swagger.tags = ['Computers']
    const computersId = new ObjectId(req.params.id);
    const updatedComputer = {
        name: req.body.name,
        type: req.body.type,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        cpu: req.body.cpu,
        ram: req.body.ram,
        storage: req.body.storage
    };

    const response = await mongodb.getDatabase().collection('computers').replaceOne({ _id: computersId }, updatedComputer);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'Computer updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update computers' });
    }
}

const deleteComputers = async (req, res) => {
    //#swagger.tags = ['Computers']
    const computersId = new ObjectId(req.params.id); 
    const response = await mongodb.getDatabase().collection('computers').deleteOne({ _id: computersId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'Computer deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete computers' });
    }
}

module.exports = {
    getAll,
    getSingle,
    createComputers,
    updateComputers,
    deleteComputers
};