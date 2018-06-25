import React, { Component } from 'react'

class NoteItem extends Component {

  openNote(id) {
    this.props.openNote(id);
  }



  render() {
    return (
        <li className="note-card" onClick={this.openNote.bind(this, this.props.note.id)}>
            <span className="notte-title">{this.props.note.title}</span>
            <span className="note-date">3 days ago</span>
        </li>
    )
  }
}


export default NoteItem;