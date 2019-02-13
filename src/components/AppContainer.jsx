import React, { Component } from 'react';
import PreEditor from './PreEditor';
import Pixelator from './Pixelator';
import ColorMapper from './ColorMapper';
import PatternMaker from './PatternMaker';
import GenPdf from './GenPdf';
import ImgUploader from './ImgUploader';
import './AppContainer.css';


class AppContainer extends Component {

    state = {
        width: 0,
        height: 0,
        palette: {},
        stitchSize: 1,
        show: '',
        fileUrl : '',
        preEditUrl : '',
        pixelUrl : '',
        colorUrl: '',
        patternUrl: ''
    }

    componentDidUpdate(prevProps){
        if (prevProps.newImage !== this.props.newImage) {
            this.setState({
                fileUrl: '',
                show: false
            })
        }
    }

    loadFile = () => {
        setTimeout(()=>{
            this.setState({
                show: true
            });
        }, 0);
        
    }

    handleSelectFile = (files) => {
        var file = document.getElementById('img_upload').files[0];
        if (file) {
            this.setState({ fileUrl : window.URL.createObjectURL(file) });
            this.loadFile();
        }
    }

    handleDropFile = (files) => {
        if (files) {
            this.setState({ fileUrl : window.URL.createObjectURL(files[0])});
            this.loadFile();
        }
    }

    outputHandler = (url_object) => {
        this.setState(url_object)
    }

    render() {
        return (
            <div id="AppContainer" >
            <ImgUploader show={this.state.show} 
                            handleSelectFile={this.handleSelectFile} 
                            handleDropFile={this.handleDropFile} />
            <div id="EditorContainer" 
                className={this.state.show?"":"hide"}>
                <div className="picEditorContainer">
                <p className="picEditorTitle">Pre-Processing</p>
                <PreEditor fileUrl = {this.state.fileUrl}
                            outputHandler = {this.outputHandler}  />
                </div>
                <div className="picEditorContainer">
                <p className="picEditorTitle">Size Reduction</p>
                <Pixelator fileUrl = {this.state.preEditUrl} 
                            outputHandler = {this.outputHandler}  />
                </div>
                <div className="picEditorContainer">
                <p className="picEditorTitle">Color Reduction</p>
                <ColorMapper fileUrl = {this.state.pixelUrl}
                            outputHandler = {this.outputHandler}
                            initWidth = {this.state.width}
                            initHeight = {this.state.height}
                            palette = {this.state.palette}  />
                </div>
                <div className="picEditorContainer">
                <p className="picEditorTitle">Pattern Preview</p>
                <PatternMaker fileUrl = {this.state.colorUrl} 
                            palette = {this.state.palette}
                            outputHandler = {this.outputHandler} />
                </div>
                <GenPdf fileUrl = {this.state.patternUrl}
                        stitchSize = {this.state.stitchSize} />
                
            </div>
            </div>
        );
    }
}

export default AppContainer;