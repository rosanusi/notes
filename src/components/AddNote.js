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