import { useState , useEffect } from 'react';

export default function Display(props){
  const [toggle, setToggle] = useState(false);
  const [random, setRandom] = useState("null")
  const [count, setCount] = useState(0)
  const url = `https://jservice.io/api/random`
const points = 100
  const handleIncrement =()=>{
    setCount(count+ points )
}
const handleDecrement =()=>{
    if(count !== 0){
        setCount(count - points)
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
    //   console.log(data[0].question)
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
            <h2>Points:{points}</h2>
           
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