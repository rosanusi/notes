import React, { Component } from 'react';
import NoteItem from "./NoteItem";
import Note from "./Note";
import uuid from "uuid";

class Notelist extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            newNote: {},
            show: false
        }
    }

    addNewNote(e){
        console.log("This will add new note to the list");

        this.setState({newNote: {
            id: uuid.v4(),
            title: "Untitled Note",
            note: "",
            date: Date.now()
        }}, function(){
            this.props.addNote(this.state.newNote);
            // this.props.show(this.state.show);
        });  
        
        // console.log(this.state.newNote);
        

    //     this.props.showForm();
    }

    openNote(e, id) {    
        let { show } = this.state;
        this.setState({ show: !show });
        this.props.openNote(e, id);
    }

    deleteNote(e, id) {
        this.props.deleteNote(e, id);
    }
    

    autoSaveNote(e) {
        this.props.autoSaveNote(e);
    }

    render() {

        let NoteItems;
        if(this.props.notes ){
            NoteItems = this.props.notes.map(note => {
                return (
                    <NoteItem key={note.id} note={note} openNote={this.openNote.bind(this)} deleteNote={this.deleteNote.bind(this)} />
                );
            });
        }   



        if(this.state.show){
            return (
                <div className="note-page">
                    <Note   autoSaveNote={this.autoSaveNote.bind(this)} 
                            noteId ={this.props.noteId} 
                            noteTitle ={this.props.noteTitle} 
                            noteContent={this.props.noteContent} 
                            noteDate={this.props.noteDate} 
                    />
                </div>              
            );    
        } else {
            return(
                <div className="note-list">
                    <h5 className="title">Notes</h5>
                    <ul className="notelist-block">
                        {NoteItems}
                    </ul>
                    <button type="button" className="add-note-btn" onClick={this.addNewNote.bind(this)}><span>+</span> Add new note</button>    
                </div>
            );
        }
    }
}

export default Notelist; 