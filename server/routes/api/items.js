const express = require("express");
const router = express.Router();

// Item Model

const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.send(items))
});

// @route POST api/items
// @desc Create A item 
// @access Public
router.post("/", (req, res) => {
    const newItem = new Item({
        title: req.body.title,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng

    });

    newItem.save().then(item => res.json(item));
});

// @route PATCH
// @desc Update A Item
// @access public
router.put("/:id", (req, res) => {

    const updatedItem = new Item({
        title: req.body.title,
        description: req.body.description,
        lat: req.body.lat,
        lng: req.body.lng

    });

    updatedItem.save().then(item => res.json(item));
});

// @route DELETE api/items/:id
// @desc Delete A Item 
// @access Public
router.delete("/:id", (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
});

module.exports = router;