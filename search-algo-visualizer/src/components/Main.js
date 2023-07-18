import "../styling/Main.css"

export function Main(props) {


    function renderGrid() {
        return props.grid.map((row, rowIndex) => {
            return (
                <div ref={props.gridWidthRef} key={rowIndex} style={{display: 'flex', flex: '1'}}>
                    {row.map((element, colIndex) => (
                        <div
                            style={{
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderStyle: 'solid',
                            }}
                            className={element.solution ? 'solution' : element.obstacle ? 'obstacle' : element.startLoc ? 'start' : element.finalLoc ? 'final' : element.visited ? 'visited' : 'unvisited'}

                            key={element.id}
                            onClick={() => props.toggle(element.id)}
                        >
                            {/* {element.id} */}
                        </div>
                    ))}
                </div>
            )
        })
    }

    return (
        <div className="main-component">
            <div className="search-box">
                {renderGrid()}
            </div>
        </div>
    )
}