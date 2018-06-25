import React, { Component } from 'react';
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



  handleAddNote(note) {
    console.log(note);    
    let notes = this.state.notes;
    notes.push(note);
    this.setState({notes:notes});
    this.saveNotes();
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


  openNote(id) {    
    console.log("it should open the content now");

    let notes = this.state.notes;

    // console.log(notes);
    // console.log(id);

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

  autoSaveNote(noteUpdate) { 

    // let updateForm = e.target;
    
    let id = this.state.thisNote.noteId;
    let index = notes.findIndex(note => note.id === id);    



    this.setState({
      thisNote: {
        noteId: this.state.thisNote.noteId, 
        noteTitle : noteUpdate.title,
        noteContent : noteUpdate.note,
        noteDate: noteUpdate.date
      }
    });

    console.log(noteUpdate);
    console.log(this.state.notes[index]);

    const newCopyofNotes = Array.from(this.state.notes);
    newCopyofNotes[index] = noteUpdate;


    this.setState({ notes : newCopyofNotes});



    console.log(this.state.notes);
    
    this.saveNotes();
    console.log("we got here");

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
            <AddNote addNote = {this.handleAddNote.bind(this)} show = {this.hideForm.bind(this)} />
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
                      openNote={this.openNote.bind(this)} 
                      autoSaveNote={this.autoSaveNote.bind(this)}
            />
          </div>
        );
      }
    // }
    
  }


}

export default Notes;