import React, { Component } from 'react';
import './css/App.css';

class App extends Component {
  state = {
    brief: 'Design a landing page for a Discord bot.',
    category: 'any'
  }

  componentDidMount() {
    setTimeout(() => {
      this.calcLine('any');
    }, 10);
  }

  calcLine(option) {
    // Select all elements
    const line = document.querySelector('.options-underline');
    const ui = document.querySelector('.ui');
    const any = document.querySelector('.any');
    const branding = document.querySelector('.branding');
    const spacing = 40;

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

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p className="App-title">Don't know what to design?</p>
          <p className="App-subtitle">Get awesome design ideas with designrr</p>
          <div className="options">
            <p onClick={() => this.calcLine('any')} className="any">ANY</p>
            <p onClick={() => this.calcLine('branding')} className="branding">BRANDING</p>
            <p onClick={() => this.calcLine('ui')} className="ui">UI/UX</p>
            <div className="options-underline"></div>
          </div>
          <button className="App-button">NEW IDEA</button>
          <div className="App-brief">
            <p className="brief-text">{ this.state.brief }</p>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
