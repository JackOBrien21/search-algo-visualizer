import '../styling/Toolbar.css'

export function Toolbar(props) {
    return (
        <div className="toolbar-component">
            <div className="left-toolbar">
                <div className="reset-button" onClick={props.resetGrid}>
                    Reset Board
                </div> 
            </div>
            <div className="right-toolbar">
                
                {props.showSearch && <div className="start-button" onClick={props.startSearch}>
                    Start
                </div>}
                {props.showStop && <div className="stop-button" onClick={props.stopSearch}>
                    Stop
                </div>}
            </div>
        </div>
    )
}