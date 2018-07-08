import React, { Component } from 'react'

class Note extends Component {

    constructor(){
        super();
        

        this.state = {
            newNoteUpdate: {}
        }

    } 



    autoSaveNote(e) {

        let noteContent = this.refs.noteContent.value;
        let noteTitle = noteContent.substring(0, 30);

        this.setState({noteUpdate: {
            noteId: this.props.noteId,
            noteTitle: noteTitle,
            noteContent: noteContent,
            noteDate: Date.now()
        }}, function(){
            this.props.autoSaveNote(this.state.noteUpdate);
        });            

    }


    escapeKeyPressed(e) {
        this.props.escapeKeyPressed(e);
    }



  render() {
    return (
        <form onKeyDown={this.escapeKeyPressed.bind(this)}>
            {/* <input type="text" className="note-title" ref="noteTitle" placeholder="Untitled Note" defaultValue={this.props.noteTitle} /> */}
            <textarea onChange={this.autoSaveNote.bind(this)} className="note-content"  ref="noteContent" defaultValue={this.props.noteContent} autoFocus={true}></textarea>
            {/* <textarea className="note-content"  ref="noteContent" defaultValue={this.props.noteContent} autoFocus={true}></textarea> */}
            <div className="content-bottom">
                <span className="editor-msg">The note autosaves. Press escape to go back.</span>
            </div>
        </form>
    )
  }
}


export default Note;