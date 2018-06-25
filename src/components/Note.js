import React, { Component } from 'react'

class Note extends Component {

    constructor(){
        super();

        this.state = {
            newNoteUpdate: {}
        }
    } 

    autoSaveNote(e) {

        this.setState({noteUpdate: {
            id: this.props.noteId,
            title: this.refs.noteTitle.value,
            note: this.refs.noteContent.value,
            date: Date.now()
        }}, function(){
            this.props.autoSaveNote(this.state.noteUpdate);
            // this.props.addNote(this.state.newNote);
            // this.props.show(this.state.show);
        });            

    }





  render() {
    return (
        <form onChange={this.autoSaveNote.bind(this)}>
            <input type="text" className="note-title" ref="noteTitle" placeholder="Untitled Note" defaultValue={this.props.noteTitle} />
            <textarea className="note-content" ref="noteContent" defaultValue={this.props.noteContent}></textarea>
        </form>
    )
  }
}


export default Note;