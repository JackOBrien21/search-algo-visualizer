import "../styling/Main.css"
import {useState} from 'react'

export function Main(props) {

    const numRows = 10;
    const numCols = 15;

    const [start, setStart] = useState({set: false, loc: "null"})
    const [final, setFinal] = useState({set: false, loc: "null"})
    
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

        if (!final.set) {
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

    return (
        <div className="main-component">
            <div className="search-box">
                {props.gridEls}
            </div>
        </div>
    )
}