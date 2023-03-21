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

    const [start, setStart] = useState({set: false, loc: null})
    const [final, setFinal] = useState({set: false, loc: null})
    
    function createGrid() {
        let gridTest = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push({id: `${i}+${j}`, visited: false, startLoc: false, finalLoc: false})
            }
            gridTest.push(row)
        }
        return gridTest
    }

    function resetGrid() {
      setStart({set: false, loc: null})
      setFinal({set: false, loc: null})
      setGrid(createGrid())
    }

    function breadthFirstSearch() {
      if (start.loc == null || final.loc == null) {
        return
      }
      console.log(start.loc)
      let i = start.loc.split("+")[0]
      let j = start.loc.split("+")[1]
      console.log(`${i}+${j}`)
      visited.push(start)
      queue.enqueue(start)
      console.log(queue)
      while (queue) {
        let current = queue.dequeue()
        console.log(current.id)
        if (current.id === final.loc) {
        }
      }
    }

    function changeSquare(id) {
      const updatedGrid = grid.map((row) => {
        return row.map( (element) => {
            return element.id === id ? {...element, backgroundColor: "red"} : element
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
          setStart({set: true, loc: id});
          console.log(id)
          const updatedGrid = grid.map((row) => {
              return row.map( (element) => {
                  return element.id === id ? {...element, backgroundColor: "green", startLoc: true} : element
              })
          })
          setGrid(updatedGrid)
          return
      }

        if (!final.set && id !== start.loc) {
            setFinal({set: true, loc: id});
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

    const gridEls = grid.map( (row) => {
        const rowEls = row.map( (element) => {
            return (
                <div style={
                    {
                        display: 'flex',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderStyle: 'solid',
                        backgroundColor: element.backgroundColor || "white",
                    }
                }
                    key={element.id}
                    onClick={() => toggle(element.id)}
                >
                    {element.id}
                </div>
            );
        });
        return <div style={{display: 'flex', flexWrap: 'wrap', flex: 1}}>{rowEls}</div>;
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
