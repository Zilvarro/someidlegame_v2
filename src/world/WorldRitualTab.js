import { formatNumber, secondsToHms } from "../utilities"
import WorldRitualButton from "./WorldRitualButton"
import { getRitualView, worldRitualTable } from "./WorldRitualDictionary"
import { worldSpellList } from "./WorldSpellDictionary"

export default function WorldRitualTab({state, updateState, popup}) {

  const chantSpell = ()=>{
    updateState({name:"chantSpell"})
  }

  const makeSacrifice = ()=>{
    updateState({name:"makeSacrifice"})
  }

  const onSpellChange = (e)=>{
    updateState({name:"changeSpell", text: e.target.value})
  }

  const clickRitualStart = ()=>{
    updateState({name: "startRitual", ritualid: state.selectedRitual})
  }

  const clickRitualExit = ()=>{
    updateState({name: "exitRitual", ritualid: state.selectedRitual})
  }

  const sacrificeCost = Math.pow(3,state.sacrificeLevel)
  const activeRitual = getRitualView(state.activeRitual, state)
  const selectedRitual = getRitualView(state.selectedRitual, state)

  return (
    <div style={{marginLeft:"10px"}}>
      <div className="row" style={{marginTop:"0px"}}><div className="column" style={{marginRight:"30px"}}>
        <h2>Rituals</h2>
          {activeRitual && <>You are currently attempting "{activeRitual.title}"</>}
          {worldRitualTable.map((line, index)=><div key={index}>{line.map((ritualid)=><WorldRitualButton key={ritualid} ritualid={ritualid} state={state} updateState={updateState} popup={popup}/>)}</div> )}
          {selectedRitual && <>
            <p>{selectedRitual.title} {state.activeRitual && <button style={{color:"black"}} onClick={clickRitualExit}>Exit</button>}{!state.activeRitual && !state.clearedRituals[state.selectedRitual] && <button style={{color:"black"}} onClick={clickRitualStart}>Start</button>}</p>
            {selectedRitual.steps.map((step,index)=><div key={index}>{step}</div>)}
          </>}
      </div><div className="smallcolumn">
        <h2>Sacrifices</h2>
          <button style={{color:"black"}} disabled={state.essence < sacrificeCost} onClick={makeSacrifice}>Sacrifice {formatNumber(sacrificeCost, state.numberFormat, 2)} &omega;</button><br/><br/>
          You have made {state.sacrificeLevel} sacrifices.
      </div><div className="smallcolumn">
        <h2>Incantations</h2>
          <input value={state.spell} onChange={onSpellChange} maxLength="20"/>&nbsp;
          <button style={{color:"black"}} disabled={state.spellCooldown > 0} onClick={chantSpell}>{state.spellCooldown > 0 ? <>Wait {secondsToHms(state.spellCooldown / 1000)}</> : <>Chant</>}</button><br/><br/>
          {state.spellCooldown > 0 && state.lastSpellState === "SUCCESS" && <>You chanted "{state.lastSpell}". It was a resounding success!</>}
          {state.spellCooldown > 0 && state.lastSpellState === "REPEAT" && <>You chanted "{state.lastSpell}" again!</>}
          {state.spellCooldown > 0 && state.lastSpellState === "FAILURE" && <>You chanted "{state.lastSpell}" but nothing happened!</>}
          <br/><br/>Your {state.spellsPerformed} distinct incantations are multiplying your Formula Efficiency by x{formatNumber( 1.0 + state.spellsPerformed * 0.1, state.numberFormat, 2, true)}.
          <br/><br/>
          {state.spellsPerformed >= 5 && <details style={{paddingTop: "10px"}}>
            <summary>
              Spellbook
            </summary>
            <br/>
            {worldSpellList.map((spellid)=>{
              if (state.spellBook[spellid]) 
                return <div style={{paddingLeft: "30px"}} key={spellid}>{spellid}<br/></div>
              else
                return undefined
            })}
          </details>}
      </div></div>
    </div>)
}