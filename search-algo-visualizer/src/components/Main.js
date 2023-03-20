import "../styling/Main.css"
import {useState} from 'react'

export function Main() {

    const numRows = 10;
    const numCols = 15;
    
    function createGrid() {
        let gridTest = []
        for (let i = 0; i < numRows; i++) {
            let row = []
            for (let j = 0; j < numCols; j++) {
                row.push({id: `${i}+${j}`, visited: false})
            }
            gridTest.push(row)
        }
        return gridTest
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
                    }
                }
                    key={element.id}
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
                {gridEls}
            </div>
        </div>
    )
}