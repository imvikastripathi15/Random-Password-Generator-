import { useState,useCallback, useEffect, useRef } from 'react'



function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setcharAllowed] = useState(false)
  const [password, setPassword] = useState("")


const  passwordGen = useCallback( ()=>{
let pass = ""
let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if (numberAllowed) str += "0123456789"
if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"


for (let i = 0; i <= length; i++) {
  let char = Math.floor(Math.random()*str.length +1 )
  pass += str.charAt(char)
}
setPassword(pass)

}, [length, numberAllowed , charAllowed , setPassword])

const CopyPasswordclipboard =useCallback(()=>{

  passwordREF.current?.select();
  passwordREF.current?.setSelectionRange(0, 99);

  window.navigator.clipboard.writeText(password)
},[password])
 
 useEffect(()=>{
  passwordGen()
 }, [length, numberAllowed , charAllowed , passwordGen])


// use ref
 const passwordREF  = useRef(null)
  return (
    <>
  
 <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-white-800 text-orange-500">
 <h1 className="text-white text-center my-3" > Password generator</h1>
      <div className='flex shadow  rounded-lg mb-4 overflow-hidden'>
<input

type='text' value={password} className='outline-none w-full py-1 px-3'
placeholder='password' 
readOnly={true}
 ref={passwordREF}

/>
<button className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
style={{hover: "cursor-pointer"}}
onClick={CopyPasswordclipboard}  
>Copy </button>


</div>

<div  className='flex text-sm gap-x-2'>
<div className='flex items-center gap-x-1'>
  <input type="range"
  min={6}
  max={23}
value={length} 
className='cursor-pointer'
onChange={(e) =>{
  setlength(e.target.value);
  
} }
   />

   <label > length : {length}</label>
</div>
     <div className="flex items-center gap-x-1">
<input type="checkbox" 
defaultValue={numberAllowed}

onChange={()=>{
  setNumberAllowed ((prev)=> !prev)
}}
/>
<label htmlFor="numberInput">Numbers</label>
</div>
<div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setcharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
    </div>
 </div>
  
    </>
  )
}

export default App
