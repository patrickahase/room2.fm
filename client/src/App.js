import './App.css';
import React, { Component } from 'react';
import DesktopApp from './components/desktopApp';
import MobileApp from './components/mobileApp';
import {artistPresets} from './content/preloadArrays.js';
import { fabric } from 'fabric';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      // is on mobile
      mobile: window.matchMedia('all and (any-hover: none)').matches,

      width: window.innerWidth,
      height: window.innerHeight,

      // turn on/off different layers
      modalIsOpen: true,

      // schedule data
      currentArtist: null,
      currentPrompt: null,
      promptType: null,
      emoji1: null,
      emoji2: null,
      emoji3: null,
      // how often it updates
      // let's start at 5 sec
      scheduleLoopTime: 5000,

      // Response Data
      responsesToDisplay: false,
      unseenResponses: [],
      lastResponseID: 0,
    }
    // bind func's to this
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.updateEmojis = this.updateEmojis.bind(this);
    this.updateSchedule = this.updateSchedule.bind(this);
    this.getNextResponse = this.getNextResponse.bind(this);
    this.submitImageResponse = this.submitImageResponse.bind(this);
  }
  render() {
    return (
      <div id="global-wrapper">
        {this.state.mobile
        ? <MobileApp
            modalIsOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            drawingInput={this.state.drawingInput}
          />
        : <DesktopApp 
            modalIsOpen={this.state.modalIsOpen}
            toggleModal={this.toggleModal}
            mobile={this.state.mobile}
            currentPrompt={this.state.currentPrompt}
            promptType={this.state.promptType}
            currentArtist={this.state.currentArtist}
            height={this.state.height}
            width={this.state.width}
            artistPresets={artistPresets}
            emoji1={this.state.emoji1}
            emoji2={this.state.emoji2}
            emoji3={this.state.emoji3}
            submitImageResponse={this.submitImageResponse}
            getNextResponse={this.getNextResponse}
            responsesToDisplay={this.state.responsesToDisplay}
          />
        }
      </div>
    )
  }
  componentDidMount() {  
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    // run start up processes based on mob/desk
    if (this.state.mobile){
      //MOBILE
    } else {
      //DESKTOP
      this.initSchedule();
    }
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  toggleModal() {
    if(this.state.modalIsOpen){
      this.setState({ modalIsOpen: false });
      this.updateSchedule();
    } else {
      this.setState({ modalIsOpen: true });
    }
  }
  /* Desktop DB Connections */
  // init db and then triger update loop
  initSchedule(){
    fetch(`http://localhost:33061/api/getScheduleInit`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'GET',
      mode: 'cors'
    })
      .then(res => res.json())
      .then(res => this.setStateFromDB(res.data));
  }
  updateSchedule(){
    fetch(`http://localhost:33061/api/getScheduleUpdate`, {
      headers: {
        'Content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ lastResponseID: this.state.lastResponseID})
    })
      .then(res => res.json())
      .then(res => {
        this.setStateFromDB(res.data);
      });
    setTimeout(this.updateSchedule, this.state.scheduleLoopTime);
  }
  setStateFromDB(data) {
    /* console.log(data); */
    let scheduleData = data[0][0];
    let responseData = data[1];
    // if new artist
    if(scheduleData.currentArtist !== this.state.currentArtist){
      // if artist changed get new emojis
      this.updateEmojis(scheduleData.emoji1, scheduleData.emoji2, scheduleData.emoji3);
      this.setState({
        currentArtist: scheduleData.currentArtist
      })
    }
    // if new prompt
    if(scheduleData.currentPrompt !== this.state.currentPrompt){
      this.setState({  
        currentPrompt: scheduleData.currentPrompt,
        promptType: scheduleData.promptType
      })
    }
    // if new responses    
    if (responseData.length){
      console.log(responseData)
      let newResponses = [];
      responseData.forEach(response => newResponses.push(response.RESPONSE));
      console.log(newResponses);
      this.setState(prevState => ({
        unseenResponses: prevState.unseenResponses.concat(newResponses),
        responsesToDisplay: true,
        lastResponseID: responseData[responseData.length-1].id
      }))
    } 
  }
  updateEmojis(emoji1, emoji2, emoji3){
    fetch(`http://localhost:33061/api/getEmojisUpdate`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({emoji1: emoji1, emoji2: emoji2, emoji3: emoji3})
    })
      .then(res => res.json())
      .then(res => { this.setState({
        emoji1: { alt: res.data[0].altText, src: res.data[0].emojiString },
        emoji2: { alt: res.data[1].altText, src: res.data[1].emojiString },
        emoji3: { alt: res.data[2].altText, src: res.data[2].emojiString }
      }) });
  }
  submitTextResponse(){
    let textInput = document.getElementById('text-input');
    let responseText = textInput.value;
    textInput.value = '';
    fetch(`http://localhost:33061/api/insertTextResponse`, {
      headers: { 'Content-type': 'application/json' },
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({reflectText: responseText})
    })
    .then(response => console.log(response.json()));
  }
  submitImageResponse(){
    let imageInput = document.getElementById('drawing-canvas');
    var dataURL = imageInput.toDataURL({
      format: 'png',
      left: 0,
      top: 0,
      width: imageInput.width,
      height: imageInput.height
    });
    const formData = new FormData();
    let imageFile = this.dataURLtoFile(dataURL, 'response.png');
    console.log(imageInput);
    formData.append('upload', imageFile, 'response.png');
    fetch('http://localhost:33061/api/insertImageResponse', {
      method: 'PUT',
      body: formData
    })
    .then(response => response.json())
    .then(result => { console.log('Success:', result); })
    .catch(error => { console.error('Error:', error); });
  }
  getNextResponse(){
    let oldestResponse = null;
    if(this.state.unseenResponses.length === 0){
      this.setState({ responsesToDisplay: false });
    } else {
      let updatedResponseArray = this.state.unseenResponses;
      oldestResponse = updatedResponseArray.shift();
      this.setState({unseenResponses: updatedResponseArray});      
    }
    return oldestResponse;   
  }

  dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, {
        type: mime
      });
  }
}

export default App

