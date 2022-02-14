import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const {deleteNote} = useContext(noteContext);

    const { note,modalOpen } = props;
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>modalOpen(note)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
