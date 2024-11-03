import { formatNumber, secondsToHms } from "../utilities"
import WorldRitualButton from "./WorldRitualButton"
import { getRitualView, WorldPhraseList, worldRitualTable } from "./WorldRitualDictionary"


export default function WorldRitualTab({state, updateState, popup}) {

  const chantSpell = ()=>{
    updateState({name:"chantSpell"})
  }

  const resetChant = ()=>{
    updateState({name:"resetChant"})
  }

  const makeSacrifice = ()=>{
    updateState({name:"makeSacrifice"})
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
            {selectedRitual.steps.map((step,index)=><div key={index}>{step}</div>)}<br/>
            Effect: {selectedRitual.effect}
          </>}
      </div><div className="smallcolumn">
        <h2>Incantations</h2>
          <PendingChant state={state}/><br/><br/>
          <PhraseButton id={4} state={state} updateState={updateState}/>&nbsp;<PhraseButton id={2} state={state} updateState={updateState}/>&nbsp;<PhraseButton id={3} state={state} updateState={updateState}/><br/><br/>
          <PhraseButton id={5} state={state} updateState={updateState}/>&nbsp;<PhraseButton id={0} state={state} updateState={updateState}/>&nbsp;<PhraseButton id={1} state={state} updateState={updateState}/><br/><br/>
          <button style={{color:"black", fontWeight: "bold"}} disabled={state.spellCooldown > 0} onClick={chantSpell}>{state.spellCooldown > 0 ? <>Wait {secondsToHms(state.spellCooldown / 1000)}</> : <>CHANT</>}</button>&nbsp;
          <button style={{color:"black", fontWeight: "bold"}} onClick={resetChant}><>RESET</></button><br/><br/>
      </div><div className="smallcolumn">
        <h2>Sacrifices</h2>
          <button style={{color:"black"}} disabled={state.essence < sacrificeCost} onClick={makeSacrifice}>Sacrifice {formatNumber(sacrificeCost, state.numberFormat, 2)} &omega;</button><br/><br/>
          You have made {state.sacrificeLevel} sacrifices.
      </div></div>
    </div>)
}

function PhraseButton({id, state, updateState}) {
  const phrase = WorldPhraseList[id]
  const addPhrase = ()=>{
    updateState({name:"addPhrase", id: id})
  }
  if (state.sacrificeLevel >= phrase.requirement)
    return <button disabled={state.pendingChant.length >= 10} style={{color:"black"}} onClick={()=>addPhrase(phrase)}>{phrase.phrase}</button>
  else
    return <button disabled style={{color:"black"}}>{phrase.hiddenphrase}</button>
}

function PendingChant({state}) {
  return <>{state.pendingChant.map((phraseid)=>(WorldPhraseList[phraseid].phrase + " "))}</>
}