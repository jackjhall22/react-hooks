// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
function useSyncLocalStorage(key, defaultValue = "") {
   // 🐨 initialize the state to the value from localStorage
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [state, setState] = React.useState(
    () => window.localStorage.getItem(key) || defaultValue 
    )

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    window.localStorage.setItem(key, state);
  }, [key, state]);
    return [ state, setState]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useSyncLocalStorage('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input type="text" value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <button onClick={() => setCount(previousCount => previousCount + 1)}>
        {count}
      </button>
      <Greeting />
    </>
  );
}

export default App
