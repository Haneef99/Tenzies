import './App.css';

import React from 'react'
import Die from './components/Die';
import Confetti from 'react-confetti';


function App() {
  const [ array,setArray ] = React.useState(arr());
  const [value,SetValue] = React.useState({
    tenzies: false,
    count: 0,
    best: 0
  });

  React.useEffect(()=>{
    let t = array[0].value
    let p=1
    array.map(a=>{
      if(t!==a.value || !a.isHeld) p=0;
    })
    if(p){
      let data = localStorage.getItem('score')
      let ans
      if(data===null){
        localStorage.setItem('score',JSON.stringify(value.count))
        ans = value.count
      }
      else{
        let val = JSON.parse(localStorage.getItem('score'))
        console.log(val)
        ans = (val>value.count)?value.count:val
        console.log(ans)
        localStorage.setItem('score',JSON.stringify(ans))
      }

      SetValue(prev => ({
        ...prev,
        tenzies : true,
        best : ans
      }))
      // console.log(value.best)
    } 
    
  },[array])


  function arr(){
    let a = [];
    for(let i=0;i<10;i++){
      let x = (Math.ceil((Math.random())*10)) % 7;
      if(x===0) x+=1;
      a.push({
        value:x,
        isHeld:false,
        id: i
      });
    }
    // console.log(a)
    return a;
  }
  
  function rollDice(){

    if(!value.tenzies){

      setArray(prev=>{
        prev = prev.map(ele=>{
        let x = (Math.ceil((Math.random())*10)) % 6 +1
        return ele.isHeld?ele:{...ele,value:x}
      })
      return prev
      }  
     )
      SetValue(prev => ({
        ...prev,
        count : prev.count+1
      }))
    }
    else{
      setArray(arr())
      SetValue({
        tenzies: false,
        count: 0
      });
    }
  }

  function Hold(id){
    // console.log(id)

    setArray(prev=>prev.map(ele => {
      return ele.id===id?{...ele,isHeld:!ele.isHeld}:ele
    }))
  }

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        {value.tenzies && <Confetti/>}
      <div className='DieComponents'>
        
        {
          array.map((e) => <Die value={e.value} id={e.id} key={e.id} holdFunction={Hold} isHeld={e.isHeld}/>)
        }

      </div>
      <div className='messages'>
        {value.tenzies && <h3>Total moves recorded: {value.count}</h3>}
        {value.tenzies && <h3>Best Score: {value.best}</h3>}
      </div>
      <button onClick={rollDice} className="RollButton">{value.tenzies?'New Game':'Roll'}</button>
    </main>
  )
}

export default App
