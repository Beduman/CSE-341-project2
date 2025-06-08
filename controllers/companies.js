const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { userValidationRules, validate } = require('../middleware/validate');

console.log("companies Controller Loaded");

const getAll = async (req, res) => {
    //#swagger.tags = ['Company']
    const result = await mongodb.getDatabase().collection('companies').find();
    result.toArray()
        .then((companies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(companies);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch companies' });
        });
}

const getSingle = async (req, res) => {
    //#swagger.tags = ['Company']
    
    const companiesId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().collection('companies').find({ _id: companiesId });
    result.toArray()
        .then((companies) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(companies[0]);
        })
        .catch(err => {
            res.status(500).json({ error: 'Could not fetch companies' });
        });
}

const createCompany = async (req, res) => {
    //#swagger.tags = ['Company']
    /*---
    const error = validate(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    ---*/
    const newCompany = {
        name: req.body.name,
        contact: req.body.contact,
        employees: req.body.employees
    };

    const response = await mongodb.getDatabase().collection('companies').insertOne(newCompany);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Could not create companies' });
    }
}

const updateCompany = async (req, res) => {
    //#swagger.tags = ['Company']
    /*---
    const error = validate(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    ---*/
    const companiesId = ObjectId.createFromHexString(req.params.id);
    const response = await mongodb.getDatabase().collection('companies').replaceOne({ _id: companiesId }, updatedCompanny);
    if (response.modifiedCount > 0) {
        res.status(204).json({ message: 'Company updated successfully' });
    } else {
        res.status(500).json({ error: 'Could not update companies' });
    }
}

const deleteCompany = async (req, res) => {
    //#swagger.tags = ['Company']
    const companiesId = ObjectId.createFromHexString(req.params.id); 
    const response = await mongodb.getDatabase().collection('companies').deleteOne({ _id: companiesId });
    if (response.deletedCount > 0) {
        res.status(204).json({ message: 'Company deleted successfully' });
    } else {
        res.status(500).json({ error: 'Could not delete companies' });
    }
}

module.exports = {
    getAll,
    getSingle,
    createCompany,
    updateCompany,
    deleteCompany
};