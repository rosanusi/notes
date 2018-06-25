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

    openNote(id) {    
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
                    <form>
                        <input type="text" className="note-title" ref="noteTitle" placeholder="Untitled Note" defaultValue={this.props.noteTitle} />
                        <textarea className="note-content" ref="noteContent" defaultValue={this.props.noteTitle}></textarea>
                    </form>
                </div>              
            );    
        } else {
            return(
                <div className="note-list">
                    <h5 className="title">Notes</h5>
                    <ul className="notelist-block">
                        {NoteItems}
                    </ul>
                    <button type="button" className="add-note-btn" onClick={this.showForm.bind(this)}><span className="icon">+</span> Add new note</button>    
                </div>
            );
        }
    }
}

export default Notelist; 