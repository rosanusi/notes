import React, { Component } from 'react';
// import Moment from 'react-moment';
// import 'moment-timezone';
import Notelist from "./components/Notelist";
import AddNote from "./components/AddNote";
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



  handleAddNote(newNote) {    
    let notes = this.state.notes;
    notes.push(newNote);
    this.setState({notes:notes});
    this.saveNotes();

    console.log(newNote);
  }


  openNote(e, id) { 
    
    
    if (!e.target.closest('.note-card')) 
      return;

      console.log(e.target);

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
    console.log('lets hide this dude');

  }

  deleteNote(e, id){ 
    console.log("Deleted a note now");

    let notes = this.state.notes;
    let index = notes.findIndex(note => note.id === id);
    notes.splice(index, 1);
    this.setState({notes:notes});
    this.saveNotes();

    e.stopPropagation()

  }

  autoSaveNote(noteUpdate) { 

    let id = this.state.thisNote.noteId;
    let index = notes.findIndex(note => note.id === id);    

    const newCopyofNotes = Array.from(this.state.notes);
    newCopyofNotes[index].title = noteUpdate.title;
    newCopyofNotes[index].note = noteUpdate.note;
    newCopyofNotes[index].date = noteUpdate.date;
    this.setState({ notes : newCopyofNotes});
    this.saveNotes();

    console.log("Saved");
    console.log(this.state.notes);
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
      if(this.state.show ) {
        return (
          <div className="notes-block">
            <AddNote  show = {this.hideForm.bind(this)} />
          </div>
        );
      } else {
        return (
          <div className="notes-block">
            <Notelist notes ={this.state.notes} 
                      thisNote ={this.state.thisNote}  
                      noteId={this.state.thisNote.noteId} 
                      noteDate={this.state.thisNote.noteDate} 
                      noteTitle ={this.state.thisNote.noteTitle} 
                      noteContent={this.state.thisNote.noteContent} 
                      showForm={this.showForm.bind(this)} 
                      addNote = {this.handleAddNote.bind(this)}
                      openNote={this.openNote.bind(this)} 
                      deleteNote={this.deleteNote.bind(this)} 
                      autoSaveNote={this.autoSaveNote.bind(this)}
            />
          </div>
        );
      }
    // }
    
  }


}

export default Notes;