import React, { Component } from 'react';
import Notelist from "./components/Notelist";
import "./css/reset.css";
import "./css/style.css";

const savednotes = localStorage.getItem("savednotes");
let notes;

class Notes extends Component {

  constructor(props){
    super(props);

    this.state = {
        thisNote: {},
        show: false
    }
  }
  
  componentWillMount() {
    if (savednotes == null) {
        notes = [];
    } else {
        notes = JSON.parse(savednotes);
    }
    this.setState({ notes });
  }


  addNote(newNote) {    
    let notes = this.state.notes;
    notes.push(newNote);
    this.setState({notes:notes});
    this.saveNotes();



    let id = newNote.id;
    let index = notes.findIndex(note => note.id === id);    
    let note = notes[index];

    this.setState({ 

      thisNote: {
        noteId: note.id, 
        noteTitle: note.title, 
        noteContent: note.note,
        noteDate: note.date 
      }
    });
  }

  openNote(e, id) { 
    if (!e.target.closest('.note-card')) 
      return;

    let notes = this.state.notes;

    let index = notes.findIndex(note => note.id === id);    
    let note = notes[index];

    this.setState({ 

      thisNote: {
        noteId: note.id, 
        noteTitle: note.title, 
        noteContent: note.note,
        noteDate: note.date 
      }
    });
  }


  showForm = () => {    
    let { show } = this.state;
    this.setState({ show: !show });

  }

  hideForm = () => {
    
    let { show } = this.state;
    this.setState({ show: !show });

  }

  deleteNote(e, id){ 

    let notes = this.state.notes;
    let index = notes.findIndex(note => note.id === id);
    notes.splice(index, 1);
    this.setState({notes:notes});
    this.saveNotes();

    e.stopPropagation()

  }

  autoSaveNote(noteUpdate) { 

    this.setState({ thisNote : noteUpdate});

    let notes = this.state.notes;
    let id = noteUpdate.noteId;
    let index = notes.findIndex(note => note.id === id);

    const newCopyofNotes = Array.from(notes);
    newCopyofNotes[index].title = noteUpdate.noteTitle;
    newCopyofNotes[index].note = noteUpdate.noteContent;
    newCopyofNotes[index].date = noteUpdate.noteDate;

    this.setState({ notes : newCopyofNotes});
    this.saveNotes();
  }


  saveNotes(){
    let { notes } = this.state;
    localStorage.setItem("savednotes", JSON.stringify(notes));                
  }


  render() {

    // if(this.state.notes === undefined || this.state.notes.length === 0){
    //   return (
    //     <h1>This should be the start screen</h1>
    //   );
    // } else {
        return (
          <div className="notes-block">
            <Notelist notes ={this.state.notes} 
                      thisNote ={this.state.thisNote}  
                      noteId={this.state.thisNote.noteId} 
                      noteDate={this.state.thisNote.noteDate} 
                      // noteTitle ={this.state.thisNote.noteTitle} 
                      noteContent={this.state.thisNote.noteContent} 
                      showForm={this.showForm.bind(this)} 
                      addNote = {this.addNote.bind(this)}
                      openNote={this.openNote.bind(this)} 
                      show = {this.hideForm.bind(this)}
                      deleteNote={this.deleteNote.bind(this)} 
                      autoSaveNote={this.autoSaveNote.bind(this)}
            />
          </div>
        );
    // }
    
  }


}

export default Notes;