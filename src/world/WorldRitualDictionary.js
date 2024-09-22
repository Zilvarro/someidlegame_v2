export const worldRitualDictionary = {
  "initiation": {
      id:"initiation",
      titles: ["Ritual of Initiation", "R*tu*l *f In*tia*ton", "R**u** *f *n**ia**o*","****** ** **********"],
      sacTitles: [3,2,1,0],
      effects: ["Unlocks Incantations", "*nl*c** I*c**ta**o*s", "*n**c** **c***a****s", "******* ************"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },
  "second": {
      id:"second",
      titles: ["Second Ritual", "Second Ritual", "Second Ritual", "Second Ritual"],
      sacTitles: [3,2,1,0],
      effects: ["Unlocks Incantations", "*nl*c** I*c**ta**o*s", "*n**c** **c***a****s", "******* ************"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },
  "third": {
      id:"third",
      titles: ["Third Ritual", "Third Ritual", "Third Ritual", "Third Ritual"],
      sacTitles: [3,2,1,0],
      effects: ["Unlocks Incantations", "*nl*c** I*c**ta**o*s", "*n**c** **c***a****s", "******* ************"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },
  "fourth": {
      id:"fourth",
      titles: ["Fourth Ritual", "Fourth Ritual", "Fourth Ritual", "Fourth Ritual"],
      sacTitles: [3,2,1,0],
      effects: ["Unlocks Incantations", "*nl*c** I*c**ta**o*s", "*n**c** **c***a****s", "******* ************"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },
  "fifth": {
      id:"fifth",
      titles: ["Fifth Ritual", "Fifth Ritual", "Fifth Ritual", "Fifth Ritual"],
      sacTitles: [3,2,1,0],
      effects: ["Unlocks Incantations", "*nl*c** I*c**ta**o*s", "*n**c** **c***a****s", "******* ************"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },

  "dark": {
      id:"dark",
      titles: ["The Dark Ritual", "T*e *ar* **t**l", "**e **r* *****l","*** **** ******"],
      sacTitles: [12,8,4,0],
      effects: ["Unknown, perform at your own risk!", "Unknown, perform at your own risk!", "Unknown, perform at your own risk!", "Unknown, perform at your own risk!"],
      sacEffects: [4,3,2,0],
      steps: [["Step1", "S**p1", "****1", "*****"],["Step2", "S**p2", "****2", "*****"],["Step3", "S**p3", "****3", "*****"]],
      sacSteps: [[3,2,1,0],[3,2,1,0],[3,2,1,0]],
  },

}

export const worldRitualTable = [["initiation", "second", "third"], ["fourth", "fifth", "dark"]]
export const worldRitualList = ["initiation", "second", "third", "fourth", "fifth", "dark"]
export const getRitualView = (ritualid, state)=>{
  if (!ritualid) return undefined
  const ritual = worldRitualDictionary[ritualid]
  const sacrifices = state.sacrificeLevel
  const sacIndex = (arr)=>arr.findIndex((s)=>(s<=sacrifices))
  const ritualview = {
    id: ritual.id,
    title: ritual.titles[sacIndex(ritual.sacTitles)],
    effect: ritual.effects[sacIndex(ritual.sacEffects)],
    steps: ritual.steps.map((step, index)=>step[sacIndex(ritual.sacSteps[index])]),
  }
  return ritualview
}