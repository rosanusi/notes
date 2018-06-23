import React, { Component } from 'react'
import NoteItem from "./NoteItem";

class Notelist extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            show: false,
        }
    }

    showForm(e){
        this.props.showForm();
    }

    // openNote(e) {
    //     // this.props.openNote();
    //     console.log('This should open the note');
    // }

    openNote = (id) => {    
        let { show } = this.state;
        this.setState({ show: !show });

        this.props.openNote(id);
        


    }


    render() {

        let NoteItems;
        if(this.props.notes ){
            NoteItems = this.props.notes.map(note => {
                return (
                    <NoteItem key={note.id} note={note} openNote={this.openNote.bind(this)} />
                );
            });
        }


        if(this.state.show){

            return (
                <div className="note-page">
                    <input type="text" ref="noteTitle" defaultValue={this.props.noteDate} />
                    <textarea ref="noteContent" defaultValue={this.props.noteTitle}></textarea>
                </div>              
            );    
        } else {
            return(
                <div className="note-list">
                    <h5 className="title">Notes</h5>
                    <ul className="notelist-block">{NoteItems}</ul>
                    <button type="button" className="add-note-btn" onClick={this.showForm.bind(this)}><span className="icon">+</span> Add new note</button>    
                </div>
            );
        }
    }
}

export default Notelist; 