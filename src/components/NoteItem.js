import React, { Component } from 'react';
import Moment from 'react-moment';
import deleteIcon from './../img/delete-icon.svg';
import 'moment-timezone';

class NoteItem extends Component {

  openNote(e, id) {
    this.props.openNote(e, id);
  }


  deleteNote(e, id) {
    this.props.deleteNote(e, id);
  }



  render() {

    return (
        <li className="note-card" onClick={((e) => this.openNote(e, this.props.note.id))}>
            <span className="note-title">{this.props.note.title}</span>
            <span className="note-date"><Moment fromNow>{this.props.note.date}</Moment></span>
            <span className="icon edit-icon" onClick={((e) => this.deleteNote(e, this.props.note.id))}><span className="symbol"><img src={deleteIcon} alt="" /></span> <span className="copy">Remove</span></span>
        </li>
    )

  }
}


export default NoteItem;