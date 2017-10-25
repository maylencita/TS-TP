import * as services from './services'

function equals<T1, T2>(o1: T1, o2: T2){
  return JSON.stringify(o1) === JSON.stringify(o2)
}

export function initAppSpec(){
  const exptectedInitial = {
    users: [{ pseudo: 'admin', status: 'Connected', points: 5}],
    channels: [],
    messages: []
  }

  console.log(`initApp() should equal ${JSON.stringify(exptectedInitial)}:`)
  if (!equals(services.initApp(), exptectedInitial))
    console.log(`  [TEST FAIL] : ${JSON.stringify(services.initApp())}`)
  else 
    console.log(`  [OK]`)
}
