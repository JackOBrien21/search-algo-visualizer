import '../styling/Toolbar.css'

export function Toolbar(props) {
    return (
        <div className="toolbar-component">
            <div className="left-toolbar">
                
            </div>
            <div className="right-toolbar">
                <div className="reset-button" onClick={props.resetGrid}>
                    Reset Board
                </div>
                {props.showSearch && <div className="start-button" onClick={props.startSearch}>
                    Start Search
                </div>}
            </div>
        </div>
    )
}