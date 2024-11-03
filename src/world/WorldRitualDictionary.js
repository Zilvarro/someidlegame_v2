//Ommh Laa Mi Soos Fol Ku

export const worldRitualDictionary = {
  "initiation": {
      id:"initiation",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      title: "Ritual of Initiation",
      effect: "Sacrifices grant Liberty Stones",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },
  "mystery": {
      id:"mystery",
      title: "Mysterious Ritual",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      effect: "Sacrifices boost Formula Efficiency",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },
  "automatic": {
      id:"automatic",
      title: "Automatic Ritual",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      effect: "Sacrifices boost all x-Production",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },
  "beta": {
      id:"beta",
      title: "True Beta Ritual",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      effect: "Sacrifices boost passive Alpha Gain",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },
  "manual": {
      id:"manual",
      title: "Manual Ritual",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      effect: "Sacrifices boost all X-Production",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },

  "dark": {
      id:"dark",
      title: "The Dark Ritual",
      startChant: [0,1,0,2,1,0,0], 
      endChant: [2,2,1,1,2,2],
      effect: "Unknown Effects, perform at your own risk!",
      steps: [["Chant \"Ommh Laa Ommh Mi Laa Ommh Ommh\""],["Something"],["Chant \"Mi Mi Laa Laa Mi Mi\""]],
      sacSteps: [[0],[0],[0]],
  },
}

export const WorldPhraseList = [
  {
    id: 0,
    phrase: "Fol",
    hiddenphrase: "???",
    size: 3,
    requirement: 0,
  },
  {
    id: 1,
    phrase: "Ku",
    hiddenphrase: "??",
    size: 2,
    requirement: 0,
  },
  {
    id: 2,
    phrase: "Laa",
    hiddenphrase: "???",
    size: 3,
    requirement: 0,
  },
  {
    id: 3,
    phrase: "Mi",
    hiddenphrase: "??",
    size: 2,
    requirement: 0,
  },
  {
    id: 4,
    phrase: "Ommh",
    hiddenphrase: "????",
    size: 4,
    requirement: 0,
  },
  {
    id: 5,
    phrase: "Soos",
    hiddenphrase: "????",
    size: 4,
    requirement: 0,
  },


]

export const worldRitualTable = [["initiation", "mystery", "automatic"], ["beta", "manual", "dark"]]
export const worldRitualList = ["initiation", "mystery", "automatic", "beta", "manual", "dark"]

export const getRitualView = (ritualid, state)=>{
  if (!ritualid) return undefined
  const ritual = worldRitualDictionary[ritualid]
  const sacrifices = state.sacrificeLevel
  const sacIndex = (arr)=>arr.findIndex((s)=>(s<=sacrifices))
  const ritualview = {
    id: ritual.id,
    title: ritual.title,
    effect: ritual.effect,
    steps: ritual.steps.map((step, index)=>step[sacIndex(ritual.sacSteps[index])]),
  }
  return ritualview
}