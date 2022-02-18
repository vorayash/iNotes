import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';



const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const navigate = useNavigate();
  const { setUser } = useContext(noteContext);
  
 
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
      setUser(localStorage.getItem('token'));
    }
    else {
      navigate('/login')
    }
    // eslint-disable-next-line
  }, []);
  const ref = useRef(null)
  const refClose = useRef(null)

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "general" });
  const onChangeHandler = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const onClickHandler = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
  }
  const modalOpen = (currentNote) => {
    ref.current.click();
    console.log("hiii");
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })

  }

  return (

    <>
      <AddNote />
      {/* modal */}
      <div className="row">
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChangeHandler} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="etag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChangeHandler} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={(note.etitle.length <= 5 || note.edescription.length <= 4)} type="button" className="btn btn-primary" onClick={onClickHandler}>Save changes</button>
              </div>
            </div>
          </div>
        </div>

        <h2>Your Notes</h2>
        <div className="container mx-1">
          {notes.length === 0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} note={note} modalOpen={modalOpen} />
        })}
      </div>
    </>
  )
}

export default Notes
