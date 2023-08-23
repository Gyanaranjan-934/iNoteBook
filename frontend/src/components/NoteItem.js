import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    const context = useContext(noteContext)
    const { note,updateNote } = props
    const {deleteNote} = context
    
    return (
        <>

            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <h4 className="card-title">{note.title}</h4>
                        <i className="fa-solid fa-trash mx-2" onClick={() => deleteNote(note._id)}></i>
                        <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>updateNote(note)}></i>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem