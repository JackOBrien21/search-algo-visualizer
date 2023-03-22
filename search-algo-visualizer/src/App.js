import './App.css';
import {Toolbar} from './components/Toolbar'
import {Main} from './components/Main'
import {useEffect, useState} from 'react'
import Queue from "./data-structures/Queue"


function App() {

  let queue = new Queue();
  let visited = []

  const numRows = 10;
  const numCols = 15;

    const [start, setStart] = useState({set: false, startLoc: true, finalLoc: false, id: null})
    const [final, setFinal] = useState({set: false, startLoc: false, finalLoc: true, id: null})

    async function delay(milliseconds) {
      return new Promise(resolve => {
          setTimeout(resolve, milliseconds);
      });
  }
    
    function createGrid() {
        let gridTest = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push({id: `${i}+${j}`, startLoc: false, finalLoc: false})
            }
            gridTest.push(row)
        }
        return gridTest
    }

    function resetGrid() {
      setStart({set: false, id: null, startLoc: false, finalLoc: false})
      setFinal({set: false, id: null, startLoc: false, finalLoc: false})
      setGrid(createGrid())
    }

    async function breadthFirstSearch() {
      if (start.id == null || final.id == null) {
        return
      }
      queue.enqueue(start)
      while (!queue.isEmpty()) {
        await delay(1000)
        let current = queue.dequeue()
        console.log("current :", current.id)
        console.log("current visited: ", visited)
        console.log("in visited?", visited.includes(current))
        let currentVisited = visited.find(obj => obj.id === current.id && obj.startLoc === current.startLoc && obj.finalLoc === current.finalLoc) !== undefined;
        if (currentVisited) {
          console.log("been here do nothing")
        } else if (current.id === final.id) {
          console.log("AT FINAL")
          return
        } else {
          let nextMoves = computeMoves(current)
          for (let move of nextMoves) { 
            queue.enqueue(move)
          }
          visited.push(current)
          changeSquare(current)
        }
      }
    }

    function computeMoves(curr) {
      let i = parseInt(curr.id.split("+")[0])
      let j = parseInt(curr.id.split("+")[1])
      let nextMoves = []
      if (i-1 >= 0) {
        nextMoves.push({id: `${i-1}+${j}`, startLoc: false, finalLoc: false})
      }
      if (i+1 < numRows) {
        nextMoves.push({id: `${i+1}+${j}`, startLoc: false, finalLoc: false})
      }
      if (j-1 >= 0) {
        nextMoves.push({id: `${i}+${j-1}`, startLoc: false, finaLoc: false})
      }
      if (j+1 < numCols) {
        nextMoves.push({id: `${i}+${j+1}`, startLoc: false, finalLoc: false})
      }
      return nextMoves
    }

   

    function changeSquare(curr) {
      // dont want to change the color of the start or final square
      let currentVisited = visited.find(obj => obj.id === curr.id && obj.startLoc === curr.startLoc && obj.finalLoc === curr.finalLoc) !== undefined;
      if (curr.startLoc || curr.finalLoc) {
        return
      }
      const updatedGrid = grid.map((row) => {
        return row.map( (element) => {
            return (element.id === curr.id) ? {...element, backgroundColor: "red"} : element
        })
      })
      setGrid(updatedGrid)
    }

    

    function toggle(id) {
        // if (start.set && final.set) {
        //     console.log(id)
        //     const updatedGrid = grid.map((row) => {
        //         return row.map( (element) => {
        //             return element.id === id ? {...element, backgroundColor: "red"} : element
        //         })
        //     })
        //     setGrid(updatedGrid)
        //     return
        // }

        if (!start.set) {
          setStart({set: true, id: id, startLoc: true, finalLoc: false});
          console.log(id)
          const updatedGrid = grid.map((row) => {
              return row.map( (element) => {
                  return element.id === id ? {...element, backgroundColor: "green", startLoc: true} : element
              })
          })
          setGrid(updatedGrid)
          return
      }

        if (!final.set && id !== start.id) {
            setFinal({set: true, id: id, startLoc: false, finalLoc: true});
            console.log(id)
            const updatedGrid = grid.map((row) => {
                return row.map( (element) => {
                    return element.id === id ? {...element, backgroundColor: "blue", finalLoc: true} : element
                })
            })
            setGrid(updatedGrid)
            return
        }
    }
    
    const [grid, setGrid] = useState(createGrid())

    const gridEls = grid.map( (row, index) => {
        const rowEls = row.map( (element) => {
        let currentVisited = visited.find(obj => obj.id === element.id && obj.startLoc === element.startLoc && obj.finalLoc === element.finalLoc) !== undefined;

            return (
                <div style={
                    {
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'solid',
                        backgroundColor: currentVisited ? "red" : element.backgroundColor || "white"
                    }
                }
                    key={element.id}
                    onClick={() => toggle(element.id)}
                >
                    {element.id}
                </div>
            );
        });
        return <div style={{display: 'flex', flexWrap: 'wrap', flex: 1}} key={index}>{rowEls}</div>;
    });

  useEffect((() => window.alert("Hi there! Please click two spots on the grid.\n The first click will represent the start location of the search and the second click will represent the destination of the search.")), [])


  return (
    <div className="App">
      <Toolbar resetGrid={resetGrid} startSearch={breadthFirstSearch} showSearch={start.set && final.set}/>
      <Main gridEls={gridEls}/>
    </div>
  );
}

export default App;
