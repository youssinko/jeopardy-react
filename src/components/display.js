import { useState , useEffect } from 'react';

export default function Display(props){
  const [toggle, setToggle] = useState(false);
  const [random, setRandom] = useState(null)
  const [count, setCount] = useState(0)
  const url = `https://jservice.io/api/random`


  const handleIncrement =()=>{
    setCount(count + random[0].value )
    console.log(random[0].value)
}
const handleDecrement =()=>{
    if(count !== 0){
        setCount(count - random[0].value)
    }

}
const handleReset =()=>{
    setCount(0)
}
  
  const getRandom = async() =>{
    try{
      const response = await fetch(url)
      const data = await response.json()
      setRandom(data)
      setToggle(false)
  
    
    
    }catch(error){
      console.log(error)
    }
  }


  useEffect(()=>{
    getRandom()
},[])


const handleClick =()=>{
  setToggle(!toggle)
}
    const loaded =()=>{
        return(
            <div>
                 <span>
            Score:{count}
            
        </span>
        <section>
        <button onClick={handleIncrement} className='increase'>Increase</button>
        <button onClick={handleDecrement}className='decrease'>Decrease</button>
        <button onClick={handleReset}className='reset'>Reset</button>
        </section>
        <h2>Let's Play!</h2>
            <button onClick={getRandom} className='get'>Get Question</button>
            <h2>Category: {random[0].category.title}</h2>
            <h2>Points:{random[0].value}</h2>
           
            <h2>Answer: {random[0].question}</h2>
            <button onClick={handleClick} className='reveal'>Click To Reveal Question</button>
            {toggle && (
                <div>
                    <h2>{random[0].answer}</h2>
                </div>
            )}
           
            
    </div>
  );
}




const loading = ()=>{
    return <h1>Loading....</h1>

}
return random? loaded() : loading()
}