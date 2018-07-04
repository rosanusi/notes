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
        });            

    }


    escapeKeyPressed(e) {
        this.props.escapeKeyPressed(e);
    }



  render() {
    return (
        <form onChange={this.autoSaveNote.bind(this)} onKeyDown={this.escapeKeyPressed.bind(this)}>
            <input type="text" className="note-title" ref="noteTitle" placeholder="Untitled Note" defaultValue={this.props.noteTitle} />
            <textarea className="note-content"  ref="noteContent" defaultValue={this.props.noteContent} autoFocus={true}></textarea>
            <div className="content-bottom">
                <span className="editor-msg">The note autosaves. Press escape to go back.</span>
            </div>
        </form>
    )
  }
}


export default Note;