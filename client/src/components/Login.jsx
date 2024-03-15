import { useState } from "react";
import PropTypes from 'prop-types';

const Login = ({ onSubmit }) => {
  const [username, setUsername] = useState("")

  const handleOnSumbit = (e) => {
    e.preventDefault()
    onSubmit(username)
  }

  const handleOnChange = (e) => {
    setUsername(e.target.value)
  }

  return (
    <>
      <h1>Welcome</h1>
      <p>What should people call you?</p>
      <form onSubmit={handleOnSumbit}>
        <input 
          type="text"
          value={username}
          placeholder="username"
          onChange={handleOnChange} />
        <input type="submit"/>
      </form>
    </>
  )
}

Login.propTypes = {
  onSubmit: PropTypes.func
}

export { Login };