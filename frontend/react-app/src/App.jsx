import logo from './logo.svg';
import './App.css';
import FirstApp from './FirstApp';
import Login from './views/publicView/Login';

function App() {
  return (
    <div>
      <Login/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React by durgesh sir at universal ,vijaynagarm campus.
        </a>
        <FirstApp/>

      </header> */}
    </div>
  );
}

export default App;
