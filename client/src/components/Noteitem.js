import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import './css/Noteitem.css'

const Noteitem = (props) => {
    const { deleteNote } = useContext(noteContext);

    const { note, modalOpen } = props;
    const d = new Date(note.date);
    console.log(d.toLocaleDateString());
    console.log(d.toTimeString());
    // console.log(note.date);
    return (
        <div className="col-md-3 my-3">
            {/* <div className="card">
                <div className="card-body">
                    <div className="">
                        <h5 className="card-title d-inline mr-2">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2 d-inline" style={{color:"red"}} onClick={()=>{deleteNote(note._id)}}></i>
                        <i className="far fa-edit mx-2 d-inline" style={{color:"green"}} onClick={()=>modalOpen(note)}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div> */}
            <div className="card h-100">
                <div className="card-header text-left">
                    {note.tag}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <div className="card-footer bg-white pt-3 pl-0">

                    <i className="btn btn-outline-danger far fa-trash-alt mr-2 ml-0 d-inline" style={{ color: "red" }} onClick={() => { deleteNote(note._id) }}></i>
                    <i className="btn btn-outline-info far fa-edit d-inline mr-2" style={{ color: "#0dcaf0" }} onClick={() => modalOpen(note)}></i>
                    </div>
                </div>
                <div className="card-footer date text-muted">
                    {d.toLocaleTimeString()} | {d.toLocaleDateString()}
                </div>
            </div>
        </div>
    )
}

export default Noteitem
