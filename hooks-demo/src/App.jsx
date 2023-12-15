/* eslint-disable no-unused-vars */
import { useCallback, useState, useEffect, useMemo} from 'react'
// import useApi from './useApi'

// eslint-disable-next-line react/prop-types
function Child( { callback }) {
  useEffect(() => {
    callback()
  }, [callback])
  return <div>子组件</div>
}
function App(){
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [kw, setKw] = useState('')
  
  // const data = useMemo(() => ({
  //   name, 
  //   phone
  // }), [name, phone])

  const callback = useCallback(() => {
    console.log('我是callback')
  }, [])
  return (
    <div className="App">
      <input onChange={(e)=>setName(e.target.value)} type="text" placeholder="1"/>  
      <input onChange={(e)=>setPhone(e.target.value)} type="text" placeholder="1"/>  
      <input onChange={(e)=>setKw(e.target.value)} type="text" placeholder="1"/>
      <Child callback={callback}></Child>  
    </div>
  ) 
}

export default App