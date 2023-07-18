import '../styling/Toolbar.css'
import algorithms from "../AlgoList/algorithms.js"
import React from 'react'


export function Toolbar({setSelectedTab, resetGrid, ...props}) {

    const [algoTabs, setAlgoTabs] = React.useState(algorithms)

    // chooses algorithm tab
    function selectTab(index) {
        // disallow changing algo during runtime
        if (props.showStop) {
            return
        }
        setSelectedTab(index)
        setAlgoTabs( (prevAlgoTabs) => {
            return prevAlgoTabs.map( (algoTab) => {
                return algoTab.id === index ? {...algoTab, isSelectedTab: !algoTab.isSelectedTab} : {...algoTab, isSelectedTab: false}
            })
        })
    }

    function handleResetGrid() {
        resetGrid()
        props.setRunning(false)
        props.setFinished(false)
        setAlgoTabs((prevAlgoTabs) => {
            return prevAlgoTabs.map((algoTab) => {
                return {...algoTab, isSelectedTab: false}
            })
        })
    }

    const allNotSelected = algoTabs.every(algorithm => !algorithm.isSelectedTab)

    const algoTabEls = algoTabs.map( (algo, index) => {

        const isCurrSelected = props.selectedTab === algo.id

        const styles = {
            color: isCurrSelected || allNotSelected  ? "#00D8FF" : "#FFFFF7",
            opacity: allNotSelected ? 1 : isCurrSelected ? 1 : .6,
            marginLeft: "15px",
            marginRight: "15px",
            cursor: "pointer"
        }

        return <div className="algo" key={index} style={styles} onClick={ () => selectTab(index)}>{algo.name}</div>
    })


    return (
        <div className="toolbar-component">
            <div className="left-toolbar">
                <div className="reset-button" onClick={handleResetGrid}>
                    Reset Board
                </div>
                <div className="algorithms">
                    {algoTabEls}
                </div>
            </div>
            <div className="right-toolbar">
                <div className="square-type" onClick={props.handleObstacleChange}>
                    {props.obstacleMode ? "Creating Obstacles" : "Removing Obstacles"} | Click to change setting
                </div>
                <div className="search-buttons">
                    {(!allNotSelected || props.showStop) && props.showSearch && <div className="search--button" onClick={props.handleSearch}> Search! </div>}
                    {props.showStop && <div className="search--button" onClick={props.handleStop}> Stop! </div>}
                </div>
            </div>
        </div>
    )
}