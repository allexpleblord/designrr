import React, { Component } from 'react';
import axios from 'axios';
import './css/App.css';

class App extends Component {
  state = {
    brief: '',
    category: 'any'
  }

  componentDidMount() {
    // Wait incase the elements haven't rendered yet ( yes it happens )
    setTimeout(() => {
      this.category('any');
      this.getBrief();
    }, 100);
  }

  category(option) {
    // This method is for switching the category, it also changes the style 
    // of the blue underline which indicates the current category
    // Select all needed elements
    const line = document.querySelector('.options-underline');
    const ui = document.querySelector('.ui');
    const any = document.querySelector('.any');
    const branding = document.querySelector('.branding');
    const spacing = 40;

    // Change the category in the state
    this.setState({
      category: option
    })

    // Apply appropriate styles
    if (option === 'any') {
      line.style.width = `${any.offsetWidth}px`;
      line.style.left = '0%';
    } 
    else if (option === 'branding') {
      line.style.width = `${branding.offsetWidth}px`;
      let left = any.offsetWidth + spacing;
      line.style.left = `${left}px`;
    } 
    else if (option === 'ui') {
      line.style.width = `${ui.offsetWidth}px`;
      let left = any.offsetWidth + spacing + branding.offsetWidth + spacing;
      line.style.left = `${left}px`;
    }
  }

  getBrief() {
    axios.get(`https://sleepy-caverns-80070.herokuapp.com/${this.state.category}`)
      .then(res => {
        let brief = res.data.brief
        // Call itself when the returned brief isn't a new one
        if (brief === this.state.brief) this.getBrief();
        this.setState({
          brief: brief
        });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Don't know what to design?</p>
          <p className="App-subtitle">Get awesome design ideas with designrr</p>
          <div className="options">
            <p onClick={() => this.category('any')} className="any">ANY</p>
            <p onClick={() => this.category('branding')} className="branding">BRANDING</p>
            <p onClick={() => this.category('ui')} className="ui">UI/UX</p>
            <div className="options-underline"></div>
          </div>
          <button className="App-button" onClick={() => this.getBrief()}>NEW IDEA</button>
          <div className="App-brief">
            <p className="brief-text">{ this.state.brief }</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
