import { getRitualView } from "./WorldRitualDictionary"

export default function WorldRitualButton({state, ritualid, popup, updateState}) {
    
    const ritual = getRitualView(ritualid, state)

    const clickWorldRitual = ()=>{
      updateState({name: "selectRitual", ritualid: ritualid})
    }

    const disabled = state.activeRitual
    let backgroundColor
    if (state.activeRitual === ritual.id) { //ACTIVE => DARK CYAN
        backgroundColor = "#00AA77"
    } else if (state.clearedRituals[ritual.id]) { //FULLY CLEARED => CYAN
        backgroundColor = "#44FFCC"
    } else if (state.activeRitual) {
        backgroundColor = "#888888"
    } else {
        backgroundColor = undefined
    }

    const buttonStyle={
        margin:"2px",
        border:"0px", 
        padding:"0px", 
        fontFamily: "Monaco", 
        fontWeight: "bold",
        width:"300px", 
        height:"50px", 
        fontSize:"20px",
        backgroundColor: backgroundColor,
        color: "black",
        verticalAlign: "top",
    }

    //Normal
    return (
        <button disabled={disabled} onClick={clickWorldRitual} style={buttonStyle}>{ritual.title}</button>
    )
}