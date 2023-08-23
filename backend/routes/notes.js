const express = require('express');
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const router = express.Router()
const { validationResult, body } = require('express-validator');

// Router 1 : Get all the notes of the user logged in "/api/auth/getuser"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        // fetch all the notes of the user logged in
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Router 2 : Add a new note using POST "/api/notes/addnote" Login requires
router.post('/addnote', fetchuser, [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter description atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body

        // return bad request if the is any error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // after the validation pass we will create the object 
        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const savedNote = await note.save()

        res.send(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 3 : Update an existing note using PUT "api/notes/updatenote" Login required
router.put('/updatenote/:id', fetchuser, [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Enter description atleast 5 characters").isLength({ min: 5 })
], async (req, res) => {
    const { title,description,tag} = req.body
    try {
        const newNote = {}
        if(title){newNote.title=title}
        if(description){newNote.description=description}
        if(tag){newNote.tag=tag}

        // find the note to be updated and update it
        const note = await Note.findById(req.params.id)

        if(!note){
            return res.status(404).send("Note not found")
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        const newNoteFinal = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
        
        res.send(newNoteFinal)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// Route 4 : Delete an existing note using DELETE "api/notes/deletenote" Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.id)

        if(!note){
            return res.status(404).send("Note not found")
        }

        // allow deleteion if the user is authenticated

        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        
        res.json({"success":"Note deleted",note:note})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
})

module.exports = router