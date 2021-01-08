import './App.css';
import SocketClient from './components/SocketClient.js'
import Main from './components/MainPage/Main.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/chat" component={SocketClient} />
    </Router>
  )
}

export default App;
