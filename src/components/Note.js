import React, { Component } from 'react'
import Textarea from 'react-textarea-autosize';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

class Note extends Component {

    constructor(props){
        super(props);
        
        this.state = {
            newNoteUpdate: {},
        }

        let rawContent = this.props.noteContent;

        if (rawContent === "") {
            this.state.editorState = EditorState.createEmpty();
        } else {
            this.state.editorState = EditorState.createWithContent(convertFromRaw(rawContent));
        }

    } 

    autoSaveNote(rawContent) {

        // let noteContent = this.noteContent.value;
        // let noteTitle = noteContent.substring(0, 30);
        let noteTitle = "working on it";

        this.setState({noteUpdate: {
            noteId: this.props.noteId,
            noteTitle: noteTitle,
            noteContent: rawContent,
            noteDate: Date.now()
        }}, function(){
            this.props.autoSaveNote(this.state.noteUpdate);
        });            

    }


    onChange = (editorState) => {
        const contentState = editorState.getCurrentContent();
        console.log('content state', convertToRaw(contentState));
        let rawContent = convertToRaw(contentState);
        this.autoSaveNote(rawContent);

        this.setState({
          editorState,
        });
    }

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    escapeKeyPressed(e) {
        this.props.escapeKeyPressed(e);
    }

    render() {

    return (
            <form onKeyDown={this.escapeKeyPressed.bind(this)}>
                <Editor 
                    className="note-content"
                    ref={this.noteContent}
                    editorState={this.state.editorState}
                    handleKeyCommand={this.handleKeyCommand}
                    onChange={this.onChange}
                />
                <div className="content-bottom">
                    <span className="editor-msg">The note autosaves. Press escape to go back.</span>
                </div>
            </form>
        )
    }
}


export default Note;