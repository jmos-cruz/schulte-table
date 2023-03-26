import { useEffect, useState } from 'react';
import './schulte.css';
import { createArray, elemClicked, clickedNums } from './miscFunctions'

let arrDimensions = 10;
const arr = createArray(arrDimensions);

let time = 60000;

function Cell({value, id, isOver}) {
  const [isCellClicked, setIsCellClicked] = useState(false);
  
  function clickCell() {
    if (clickedNums.results[clickedNums.results.length - 1].value === value - 1 && !isOver) {
      elemClicked(id, value, setIsCellClicked);
    }
  }

  return (
    <div id = {id} className='cell' onClick={clickCell}>
      <div className='cell-border'>
        <p> { value > 9 ? (value === 100 ? '00' : value) : '0' + value } </p>
        {isCellClicked ? <span className='clicked'>X</span>: ""}
      </div>
    </div>
  );
}

function Timer({setIsOver}) {
  const [milliseconds, setMilliseconds] = useState(time);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds((milliseconds) => {
      if(milliseconds > 0) return milliseconds - 20;
      else return 0;
    }); }, 20);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (milliseconds === 0) {
      setIsOver(true);
    }
  }, [milliseconds, setIsOver]);

  const formattedSeconds = new Date(milliseconds).toISOString().substring(22, 14);
  return <div className='timer'>{formattedSeconds}</div>;
}

function Results() {
  let results = clickedNums.results.map((item, index) => {
    if(index === 0) {return (<pre key = "header">Nº   Tempo</pre>)}; 
    return (<pre key = {item.value} className='result'> {item.value}    {item.time}</pre>);
  });

  return (
    <div>
      {results}
    </div>
    
  );
}

function App() {
  const [isStartClicked, setIsStartClick] = useState(false);
  const [isOver, setIsOver] = useState(false);

  let grid = arr.map((item, index) => {
    return (<Cell key= {item} id = {index+1} value = {item} isOver = {isOver}/>);
  });

  function StartButton() {
    function start() {
      elemClicked(0, 0, setIsStartClick);
      let startTime = new Date();
      clickedNums.startTime = `${startTime.getMinutes()}:${startTime.getSeconds()}:${startTime.getMilliseconds()}`
    }
    
    return (
      <div className='button-container'>
        <button className='btn' onClick={start}>Start</button>
      </div>
    );    
  }

  return (
    <div>
        <h1>Jogo da quadrilha</h1>
        <div className='content'>
          <div className='grid'>
            {isStartClicked ? (!isOver ? grid : clickedNums.results.length === 1 ? "Não encontraste nada" : <Results />) : <StartButton />}
          </div>
        </div>
        {!isStartClicked ? <div className='timer'>{new Date(time).toISOString().substring(22, 14)}</div> : <Timer setIsOver = {setIsOver}/>}
    </div>
  );
}

export default App;
