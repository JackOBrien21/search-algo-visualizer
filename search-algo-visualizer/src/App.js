import './App.css';
import {Toolbar} from './components/Toolbar'
import {Main} from './components/Main'
import {useEffect, useState, useRef} from 'react'
import Queue from "./data-structures/Queue"

function App() {

  // let queue = new Queue();

  const numRows = 10;
  const numCols = 15;

    const [start, setStart] = useState({startLoc: false, finalLoc: false, id: null, visited: false, solution: false})
    const [final, setFinal] = useState({startLoc: false, finalLoc: false, id: null, visited: false, solution: false})
    const [running, setRunning] = useState(false)
    const [algoInProgress, setAlgoInProgress] = useState(false)
    const [grid, setGrid] = useState(createGrid())

    const runningRef = useRef(running)

    console.log(grid)

    async function delay(milliseconds) {
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
      });
  }

   // when 'running' state var changes
   // either call bfs (true) or do nothing (false)

   useEffect( () => {
    runningRef.current = running
    if (running) {
      breadthFirstSearch()
    } else {
      return
    }
   }, [running])

    function createGrid() {
        let gridTest = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push({id: `${i}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false})
            }
            gridTest.push(row)
        }
        return gridTest
    }

    function resetGrid() {
      setStart({id: null, startLoc: false, finalLoc: false, visited: false, solution: false})
      setFinal({id: null, startLoc: false, finalLoc: false, visited: false, solution: false})
      setGrid(createGrid())
      setRunning(false)
    }

    function toggle(id) {
      if (!start.startLoc) {
          // Set start location if not set yet
          setStart({ ...start, startLoc: true, id });
          // Update the corresponding grid element
          setGrid((prevGrid) => {
              return prevGrid.map(row => row.map(cell => cell.id === id ? { ...cell, startLoc: true } : cell));
          });
      } else if (!final.finalLoc) {
          // Set final location if not set yet and not the same as the start location
          if (id !== start.id) {
              setFinal({ ...final, finalLoc: true, id });
              // Update the corresponding grid element
              setGrid((prevGrid) => {
                  return prevGrid.map(row => row.map(cell => cell.id === id ? { ...cell, finalLoc: true } : cell));
              });
          }
      }
      // If both start and final locations are set, you can choose to do nothing or reset them
  }
  async function breadthFirstSearch() {
    const visited = []
    console.log("here")
    const queue = new Queue()
    queue.enqueue([start])
    while (queue && runningRef.current) {

      // changing curr to path

      const path = queue.dequeue()
      const curr = path[path.length-1]
      console.log("running inside func" , runningRef.current)
      if (curr.id === final.id) {
        console.log("at end!");
        setGrid((prevGrid) => {
          return prevGrid.map((row) =>
            row.map((cell) =>
              path.some((step) => step.id === cell.id) ? { ...cell, solution: true } : cell
            )
          );
        });
        console.log(path);
        return;
      
      } else if (visited.includes(curr.id)) {
        console.log("been here " + curr.id)
      } else {
        const nextMoves = computeMoves(curr)
        await delay(100)

        console.log(curr.id)
        visited.push(curr.id)
        setGrid((prevGrid) => {
          return prevGrid.map(row => row.map(cell => cell.id === curr.id ? { ...cell, visited: true } : cell));
        });
        for (let move of nextMoves) {
          let newPath = [...path, move]
          queue.enqueue(newPath)
        }
      }
    }
  }
  function callSearchAlgo() {
    setRunning(!running)
    breadthFirstSearch()
  }

  function stopSearchAlgo() {
    setRunning(false)
  }

      function computeMoves(curr) {
        let i = parseInt(curr.id.split("+")[0])
        let j = parseInt(curr.id.split("+")[1])
        let nextMoves = []
        if (i-1 >= 0) {
          nextMoves.push({id: `${i-1}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false})
        }
        if (i+1 < numRows) {
          nextMoves.push({id: `${i+1}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false})
        }
        if (j-1 >= 0) {
          nextMoves.push({id: `${i}+${j-1}`, startLoc: false, finaLoc: false, visited: false, solution: false})
        }
        if (j+1 < numCols) {
          nextMoves.push({id: `${i}+${j+1}`, startLoc: false, finalLoc: false, visited: false, solution: false})
        }
        return nextMoves
    }


  console.log("running outside function: ", runningRef.current)

  return (
    <div className="App">
      <Toolbar resetGrid={resetGrid} startSearch={callSearchAlgo} stopSearch={stopSearchAlgo} showSearch={start.startLoc && final.finalLoc && !running} showStop={running}/>
      <Main grid={grid} setGrid={grid} toggle={toggle} start={start} setStart={setStart} final={final} setFinal={setFinal}/>
    </div>
  );
}

export default App;
