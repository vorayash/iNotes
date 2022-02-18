import React,{ useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const Noteitem = (props) => {
    const {deleteNote} = useContext(noteContext);

    const { note,modalOpen } = props;
    return (
        <div className="col-md-3 my-3">
            <div className="card">
                <div className="card-body">
                    <div className="">
                        <h5 className="card-title d-inline">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2 d-inline" onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2 d-inline" onClick={()=>modalOpen(note)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
