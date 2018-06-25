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

  saveNotes(){
    let { notes } = this.state;
    localStorage.setItem("savednotes", JSON.stringify(notes));                
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


  openNote(id, noteContent) {    
    console.log("it should open the content now");

    let notes = this.state.notes;

    console.log(notes);
    console.log(id);

    let index = notes.findIndex(note => note.id === id);    
    let note = notes[index];


    this.setState({ 

      thisNote: {
        noteTitle: note.title, 
        noteDate: note.date 
      }
    });
  }

  render() {

    if(this.state.notes === undefined || this.state.notes.length === 0){
      return (
        <h1>This should be the start screen</h1>
      );
    } else {
      return (
        <div className="notes-block">
          {this.state.show ? <AddNote addNote = {this.handleAddNote.bind(this)} show = {this.hideForm.bind(this)} /> : <Notelist notes = {this.state.notes}  noteTitle = {this.state.thisNote.noteTitle} noteDate={this.state.thisNote.noteDate} showForm={this.showForm.bind(this)} NoteContent={this.NetContent} openNote={this.openNote.bind(this)}/>}
        </div>
      );    
    }
    
  }
}

export default Notes;