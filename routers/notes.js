const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const notes = require("../modules/Notes.js");
const { body, validationResult } = require("express-validator");
//route:1 get all the notes using get:/auth/notes/fetchallnots :login not required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    // get the user id from the modules notes
    const note = await notes.find({ user: req.user._id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured");
  }
});

// route 2: add a new note using get:/auth/notes/addnote :post method :login required
router.post(
  "/addnote",
  // check if the title and description meets the requirement using the validation
  [
    body("title", "title must be atleast 3 charecters").isLength({ min: 3 }),
    body("desc", "description should be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchuser,
  async (req, res) => {
    try {
      // it helps to get the title and desc as a variable from the req.body i.e sent by
      // the user
      const { title, desc } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new notes({
        title,
        desc,
        user: req.user._id,
      });
      const savednotes = await note.save();
      res.json(savednotes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// route 3: update a note using get:/auth/notes/updatenote :put method :login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, desc } = req.body;
  try {
    // Create a newNote object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (desc) {
      newNote.desc = desc;
    }

    // Find the note to be updated and update it
    let note = await notes.findById(req.params.id);
    console.log(note);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    console.log(note.user.toString());
    console.log(req.user._id);
    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    note = await notes.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// route 4: delete a note using get:/auth/notes/deletenote :login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be updated and update it
    let note = await notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Not Allowed");
    }
    note = await notes.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted of", note:note});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
