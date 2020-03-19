import React from 'react';
import volumentalLogo from './volumental.svg';
import ChartContainer from './components/ChartContainer';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={volumentalLogo} className='App-logo' alt='logo' />
      </header>
      <div className='chart-wrapper'>
        <ChartContainer></ChartContainer>
      </div>
    </div>
  );
}

export default App;
