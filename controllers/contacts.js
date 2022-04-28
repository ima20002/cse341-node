const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
    // get all tables from the collection
    const result = await mongodb.getDb().db().collection('contacts').find();
    // data convert
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

const getSingle = async (req, res, next) => {
    // retrieve id from request params
    const userId = new ObjectId(req.params.id);
    // get a specific table using ID
    const result = await mongodb.getDb().db().collection('contacts').find({
        _id: userId
    });
    // data convert
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

// Create new contact
const postContact = async (req, res, next) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    // Post the new contact "contact"
    const response = await mongodb.getDb().db().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        // OK status
        res.status(201).json(response);
    } else {
        // Error status
        res.status(500).json(response.error || 'Error in creating new contact');
    }
};

// Update an existing contact
const putContact = async (req, res, next) => {
    // retrieve the id to be updated from request params
    const userId = new ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    // Update the contact using provide id and "contact" info
    const response = await mongodb.getDb().db().collection('contacts').replaceOne({
        _id: userId
    }, contact);
    console.log(response);
    if (response.modifiedCount > 0) {
        // OK status w/o response
        res.status(204).send();
    } else {
        // Error
        res.status(500).json(response.error || 'Error in updating a contact');
    }
};

const deleteContact = async (req, res, next) => {
    // retrieve the id to be deleted from request params
    const userId = new ObjectId(req.params.id);
    // Delete the contact using provide id
    const response = await mongodb.getDb().db().collection('contacts').remove({
        _id: userId
    }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        // OK status w/o response
        res.status(204).send();
    } else {
        // Error
        res.status(500).json(response.error || 'Error in deleting a contact');
    }
};

module.exports = {
    getAll,
    getSingle,
    postContact,
    putContact,
    deleteContact
};