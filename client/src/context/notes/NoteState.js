import { useContext, useState } from "react";
import alertContext from "../alert/alertContext";
import NoteContext from "./noteContext";


const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    
    const context=useContext(alertContext);
    const {showAlert} =context;

    const [notes, setNotes] = useState(notesInitial);
    //Get all notes
    const getNotes = async () => {
        const response = await fetch(`/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },
            // body: JSON.stringify(data)
        });
        const data = await response.json();
        setNotes(data);
    }



    //Add a Note
    const addNote = async (title, description, tag) => {
        const note = {
            title: title,
            description: description,
            tag: tag
        };
        const response = await fetch(`http://localhost:5000/api/notes/addnote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(note)
        });
        console.log(response);
        showAlert("Added Successfully","success");
        getNotes();

    }

    //Delete a Note
    const deleteNote = async (id) => {
        const response = await fetch(`/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },
            // body: JSON.stringify(data)
        });
        console.log(response);
        getNotes();
        showAlert("Deleted Successfully","success");

    }
    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        const note = {
            title: title,
            description: description,
            tag: tag
        };
        const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify(note)
        });
        console.log(response);
        getNotes();
        showAlert("Edited Successfully","success");

    }
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;