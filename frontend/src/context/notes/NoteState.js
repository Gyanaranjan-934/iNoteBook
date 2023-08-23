import React, { useState } from 'react'
import noteContext from './noteContext'
const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // Get all notes 
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYTIwOTU2NjgzZDk3Mzc4M2YzYTA1In0sImlhdCI6MTY5MjAyMDQ0NH0.H7bGGehWCFR2Uh6S7aMaKP27TDtdeeMo1iQ5HS0qiA0"
            },
        });
        const json = await response.json()
        setNotes(json)
    }


    // Add a note 
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYTIwOTU2NjgzZDk3Mzc4M2YzYTA1In0sImlhdCI6MTY5MjAyMDQ0NH0.H7bGGehWCFR2Uh6S7aMaKP27TDtdeeMo1iQ5HS0qiA0"
            },
            body: JSON.stringify({ title, description, tag }),
        });
        // const json = response.json();
        if (!response.ok) {
            const json = await response.json();
            console.error('Failed to add note:', json.error);
            return;
        }

        const json = await response.json();
        const note = json; // Assuming the response is the new note
        setNotes(notes => notes.concat(note));
    }

    // delete a note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",

            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYTIwOTU2NjgzZDk3Mzc4M2YzYTA1In0sImlhdCI6MTY5MjAyMDQ0NH0.H7bGGehWCFR2Uh6S7aMaKP27TDtdeeMo1iQ5HS0qiA0"
            },
        });
        const json = await response.json();
        const newNotes = notes.filter((note) => { return note._id !== id });
        setNotes(newNotes);
    }
    // edit note
    const editNote = async (id, title, description, tag) => {
        // API Call 
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYTIwOTU2NjgzZDk3Mzc4M2YzYTA1In0sImlhdCI6MTY5MjAyMDQ0NH0.H7bGGehWCFR2Uh6S7aMaKP27TDtdeeMo1iQ5HS0qiA0"
            },
            body: JSON.stringify({ title, description, tag })
        });
        // const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes))
        // Logic to edit in client
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState