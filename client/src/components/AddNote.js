import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import './css/login.css'


const AddNote = () => {
    const context = useContext(noteContext);
    const { notes, addNote } = context;

    const [note, setNote] = useState({title:"",description:"",tag:""});
    const onChangeHandler=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const onClickHandler=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }
    return (
        <div>
            <div className="container my-5">
                <div className="addnote">
                <h2>Add a Note</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChangeHandler} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" value={note.description} name="description" onChange={onChangeHandler}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChangeHandler}/>
                    </div>
                    <button disabled={(note.title.length<=5||note.description.length<=4)} type="submit" className="btn btn-primary" onClick={onClickHandler}>Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default AddNote
