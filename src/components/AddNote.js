import React, { Component } from 'react'
import uuid from "uuid";

class AddNote extends Component {

    constructor(){
        super();

        this.state = {
            newNote: {},
            show: false
        }
    } 
    
    
    componentDidMount() {

        let noteArea = this.refs.note;
        noteArea.focus();
        console.log(noteArea);

    }


    // handleSubmit(e) {
    //     e.preventDefault();

    //     if(this.refs.title.value === '' && this.refs.note.value === '') {
    //         console.log("Nothing is showing here");
    //     } else {

    //         // let newNoteTitle;
    //         // if(this.refs.title.value === '') {
    //         //     newNoteTitle = "Untitled Note";
    //         // } else {
    //         //     newNoteTitle = this.refs.title.value;
    //         // }
    //         this.setState({newNote: {
    //             id: uuid.v4(),
    //             title: "Untitled Note",
    //             note: "",
    //             date: Date.now()
    //         }}, function(){
    //             this.props.addNote(this.state.newNote);
    //             this.props.show(this.state.show);
    //         });     
    //     }
    // }

    render() {


    return (
      <div className="note-form">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="text" className="note-title" ref="title" placeholder="Untitled Note" />
            <textarea className="note-area" ref="note" placeholder="start typing here..."></textarea>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}


export default AddNote;