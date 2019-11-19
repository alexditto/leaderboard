import React from 'react';
import logo from './logo.svg';
import './App.css';
import SimpleTable from './components/table';
import NavBar from './components/navbar';

function App() {
  return (
    <div className="App">
      <NavBar />
      <SimpleTable />
    </div>
  );
}

export default App;
