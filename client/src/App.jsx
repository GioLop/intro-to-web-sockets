import { useState } from 'react';
import { Login } from './components/Login';
import { Home } from './pages/Home';

const App = () => {
  const [username, setUserName] = useState("")

  const onSumbit = (userName) => {
    setUserName(userName)
  }
  
  return username ? 
  (<Home username={username}/>) : 
  (<Login onSubmit={onSumbit}/>)
}

export default App
