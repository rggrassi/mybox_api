const File = require('../models/File');
const Box = require('../models/Box');
const { isEmpty } = require('lodash');
const { removeFromRepository } = require('../services/FileService');

const store = async (req, res) => {
    const { originalname: name, size, key, location: url = '' } = req.file;
    const file = await File.create({ name, size, key, url });

    const box = await Box.findById(req.params.id);
    box.files.push(file);
    await box.save();

    return res.status(201).json(file);
}

const remove = async (req, res) => {
    const { idFile } = req.params; 

    const file = await File.findById(idFile);
    if (isEmpty(file)) {
        return res.status(404).send();
    }

    await removeFromRepository(file.key);

    await File.deleteOne({ _id: idFile });

    return res.status(204).send();    
}

module.exports = { store, remove }