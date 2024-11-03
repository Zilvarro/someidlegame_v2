import { isArrayEqual } from "../utilities"
import { WorldPhraseList, worldRitualDictionary, worldRitualList } from "./WorldRitualDictionary"

export const validateChant = (chant)=>{
  const phrases = chant.map((id)=>WorldPhraseList[id])

  //1) Must have at most 25 letters
  const lettercount = phrases.reduce((count, phrase)=>(count + phrase.size), 0)
  if (lettercount > 25)
    return {badending: "toolong", reason: "Rule 1: Must have at most 25 letters!"}

  //2) Must not contain all six phrases
  if (chant.includes(0) && chant.includes(1) && chant.includes(2) && chant.includes(3) && chant.includes(4) && chant.includes(5))
    return {badending: "toovaried", reason: "Rule 2: Must not contain all six phrases!"}

  //3) Must not have all phrases in alphabetic order
  let alphabetic = true
  for (let i = 0; i < chant.length - 1; i++) {
    if (chant[i] > chant[i+1])
        alphabetic = false
  }
  if (alphabetic)
    return {badending: "tooalphabetic", reason: "Rule 3: Must not have all phrases in alphabetic order!"}

  //4) Must have four or more phrases with same number of letters
  const buckets = [0,0,0,0,0]
  for (let i = 0; i < phrases.length; i++) {
    buckets[phrases[i].size]++
  }
  if (buckets[2] < 4 && buckets[3] < 4 && buckets[4] < 4)
    return {badending: "toosimple", reason: "Rule 4: Must have four or more phrases with same number of letters!"}

  //5) Phrases appearing multiple times must not be clustered together
  const getOccurrence = (array, value)=>{
    return array.filter((v) => (v === value)).length;
  }
  let multiphase = false
  let multiend = false
  for (let i = 0; i < chant.length; i++) {
    const occurence = getOccurrence(chant, chant[i])
    if (occurence === 1 && multiphase) {
      multiend = true
    } else if (occurence > 1 && multiend) {
      return {badending: false}
    } else if (occurence > 1) {
      multiphase = true
    }
  }

  return {badending: "tooclustered", reason: "Rule 5: Phrases appearing multiple times must not be clustered together!"}
}

export const checkStoryChant = (chant, activeRitual)=>{
  //checks for all rituals if chant matches
  const rituals = worldRitualList.map((id)=>worldRitualDictionary[id])
  for (let i = 0; i < rituals.length; i++) {
    if (activeRitual === rituals[i].id && isArrayEqual(chant, rituals[i].endChant))
      return {matched: true, ritual: rituals[i], isStart: false, isEnd: true}
    if (isArrayEqual(chant, rituals[i].startChant))
      return {matched: true, ritual: rituals[i], isStart: true, isEnd: false}
  }

  return {matched: false}
}

