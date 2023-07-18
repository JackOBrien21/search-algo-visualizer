import './App.css';
import {Toolbar} from './components/Toolbar'
import {Main} from './components/Main'
import {useEffect, useState, useRef} from 'react'
import Queue from "./data-structures/Queue"
import PriorityQueue from './data-structures/PriorityQueue';

function App() {

  // let queue = new Queue();


    const numRows = 20;
    const numCols = 30

    const [start, setStart] = useState({startLoc: false, finalLoc: false, id: null, visited: false, solution: false})
    const [final, setFinal] = useState({startLoc: false, finalLoc: false, id: null, visited: false, solution: false})
    const [selectedTab, setSelectedTab] = useState(-1)
    const [running, setRunning] = useState(false)
    const [finished, setFinished] = useState(false)
    const [grid, setGrid] = useState(createGrid())
    const [obstacleMode, setObstacleMode] = useState(false)
    const [gridWidth, setGridWidth] = useState(0)
    const gridWidthRef = useRef(null)
    const runningRef = useRef(running)
    const finishedRef = useRef(finished)
    
;


    /*CAN BE USED LATER IF NEED WIDTH OF SCREEN TO DYNAMICALLY CREATE GRID*/
    /*
    const updateSize = () => {
      setGridWidth(gridWidthRef.current.offsetWidth)
    }

    useEffect( () => {
      updateSize()
      window.addEventListener('resize', updateSize)

      return () => window.removeEventListener('resize', updateSize)
    })
    */

    async function delay(milliseconds) {
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
      });
  }
  
   // when 'running' state var changes
   // either call bfs (true) or do nothing (false)

   useEffect(() => {
    runningRef.current = running;
    if (running) {
      if (selectedTab === 0) {
        breadthFirstSearch();
      } else if (selectedTab === 1) {
        depthFirstSearch();
      } else if (selectedTab === 2) {
        AStarSearch()
      }
    } else {
      return;
    }
  }, [running, selectedTab]); // Added selectedTab as a dependency


    useEffect( () => {
      finishedRef.current = finished
    }, [grid])

    function createGrid() {
        let gridTest = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push({id: `${i}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
            }
            gridTest.push(row)
        }
        return gridTest
    }

    function resetGrid() {
      setStart({id: null, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
      setFinal({id: null, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
      setGrid(createGrid())
      setRunning(false)
      setSelectedTab(-1)
      setObstacleMode(false)
    }

    function toggle(id) {
      if (runningRef.current) {
        return
      }
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
      } else if (obstacleMode) {
        if (id !== start.id && id !== final.id)
          // Anything but start and final can be obstacles
          setGrid((prevGrid) => {
            return prevGrid.map(row => row.map(cell => cell.id === id ? {...cell, obstacle: true} : cell))
          })
      } else if (!obstacleMode && checkObstacle(id)) {
        // only want to iterate over grid to change square if it is actually an obstacle
        // prevents a lot of unncessary work from being done by extra clicks
        setGrid((prevGrid) => {
          return prevGrid.map(row => row.map(cell => cell.id === id ? {...cell, obstacle: false} : cell))
        })
      }
    }

      
      // If both start and final locations are set, you can choose to do nothing or reset them
  
  async function breadthFirstSearch() {
    const visited = []
    const queue = new Queue()
    queue.enqueue([start])
    while (queue && runningRef.current) {

      // changing curr to path

      const path = queue.dequeue()
      const curr = path[path.length-1]
      if (checkObstacle(curr.id)) {
        continue
      }
      if (curr.id === final.id) {
        setRunning(false)
        setFinished(true)
        setGrid((prevGrid) => {
          return prevGrid.map((row) =>
            row.map((cell) =>
              path.some((step) => step.id === cell.id) ? { ...cell, solution: true } : cell
            )
          )
        })
        
      
        return;
      
      } else if (visited.includes(curr.id)) {
        continue
      } else {
        const nextMoves = computeMoves(curr)
        await delay(100)

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
    setRunning(false)
    setFinished(true)
  
  }

  // async function depthFirstSearch() {
  //   const visited = new Set(); // Change from array to Set
  //   let map = {};
  //   let done = false;
  //   console.log("hello");
  //   depthHelper([start], visited, map);
  // }
  
  async function depthFirstSearch() {
    const stack = [];
    const visited = new Set();
    const map = {};

    stack.push([start]);

    while (stack.length && runningRef.current) {
        let currPath = stack.pop();
        let currNode = currPath[currPath.length - 1];
        if (checkObstacle(currNode.id)) {
          continue
        }
        if (!visited.has(currNode.id)) {
            visited.add(currNode.id);
            setGrid((prevGrid) => {
                return prevGrid.map(row => row.map(cell => cell.id === currNode.id ? { ...cell, visited: true } : cell));
            });
            await delay(100);
            let nextMoves = computeMoves(currNode);
            for (let move of nextMoves) {
                let newPath = [...currPath, move];
                stack.push(newPath);
            }
        }
        // Check for solution at the top level
        if (currNode.id === final.id) {
            let solution = currPath;
            setGrid((prevGrid) => {
                return prevGrid.map((row) =>
                    row.map((cell) =>
                        solution.some((step) => step.id === cell.id)
                            ? { ...cell, solution: true }
                            : cell
                    )
                );
            });
            setRunning(false);
            setFinished(true)
            return;
        }
    }
}

async function AStarSearch() {
  const openList = new PriorityQueue((a, b) => a.f - b.f);
  const visited = new Set()
  const startNode = {
    ...start,
    g: 0,
    f: getManhattanDistance(start),
    parent: null
  }
  openList.push(startNode)
  while (!openList.isEmpty() && runningRef.current) {
    const currNode = openList.pop()
    if (checkObstacle(currNode.id)) {
      continue
    }
    if (visited.has(currNode.id)) {
      continue
    } 
    else if (currNode.id === final.id) {
      // Found the goal, trace the path back
      let path = []
      let current = currNode
      while(current) {
        path.unshift(current)
        current = current.parent
      }
      setGrid((prevGrid) => {
        return prevGrid.map((row) =>
          row.map((cell) =>
            path.some((step) => step.id === cell.id) ? { ...cell, solution: true } : cell
          )
        );
      });
      setFinished(true)
      setRunning(false)
      return;
    } 
    else {
      // not been here
      visited.add(currNode.id)
      setGrid((prevGrid) => {
        return prevGrid.map(row => row.map(cell => cell.id === currNode.id ? { ...cell, visited: true } : cell));
      });
      const nextMoves = computeMoves(currNode)
      await delay(100)
      for (let move of nextMoves) {
        move.g = currNode.g + 1
        move.h = getManhattanDistance(move)
        move.f = move.g + move.h
        move.parent = currNode  // Assign parent to be able to trace path back
        openList.push(move)
      }
    }
  }
  setRunning(false)
  setFinished(true)
}



  // curr will be current node
  function getManhattanDistance(curr) {
    let curr_i = parseInt(curr.id.split("+")[0])
    let curr_j = parseInt(curr.id.split("+")[1])
    let final_i = parseInt(final.id.split("+")[0])
    let final_j = parseInt(final.id.split("+")[1])
    return Math.abs(curr_i - final_i) + Math.abs(curr_j - final_j)
  }

  // given an id, checks if it is an obstacle
  function checkObstacle(id) {
      let curr_i = parseInt(id.split("+")[0])
      let curr_j = parseInt(id.split("+")[1])
      return grid[curr_i][curr_j].obstacle
  }



  function stopSearchAlgo() {
    setRunning(false)
  }

  function computeMoves(curr) {
    let i = parseInt(curr.id.split("+")[0])
    let j = parseInt(curr.id.split("+")[1])
    let nextMoves = []
    if (j-1 >= 0) {
      nextMoves.push({id: `${i}+${j-1}`, startLoc: false, finaLoc: false, visited: false, solution: false, obstacle: false})
    }
    if (j+1 < numCols) {
      nextMoves.push({id: `${i}+${j+1}`, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
    }
    if (i-1 >= 0) {
      nextMoves.push({id: `${i-1}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
    }
    if (i+1 < numRows) {
      nextMoves.push({id: `${i+1}+${j}`, startLoc: false, finalLoc: false, visited: false, solution: false, obstacle: false})
    }
    
    return nextMoves
  }

  function handleAlgoFunctionCall() {
    setRunning( running => {
        const newIsRunning = true
        return newIsRunning
    })
}

  function handleObstacleChange() {
    setObstacleMode(obstacleMode => !obstacleMode)
  }

  console.log(gridWidth)

  function handlePrint() {
    console.log("Running: ", runningRef.current)
    console.log("Finished: ", finishedRef.current)
  }

  return (
    <div className="App" onClick={handlePrint}>
      <Toolbar obstacleMode={obstacleMode} handleObstacleChange={handleObstacleChange} handleSearch={handleAlgoFunctionCall} handleStop={stopSearchAlgo} showStop={running && !finished} selectedTab={selectedTab} setSelectedTab={setSelectedTab} resetGrid={resetGrid} stopSearch={stopSearchAlgo} showSearch={start.startLoc && final.finalLoc && !running && !finished} setRunning={setRunning} setFinished={setFinished}/>
      <div ref={gridWidthRef} className="main">
        <Main grid={grid} setGrid={grid} toggle={toggle} start={start} setStart={setStart} final={final} setFinal={setFinal}/>
      </div>
    </div>
  );
}

export default App;
