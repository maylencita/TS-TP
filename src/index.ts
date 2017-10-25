import * as test from './tests'
import * as services from './services'
import * as models from './models'

//--------------------------
// TESTING THE APPLICATION
//-------------------------

/*
(
  function(){
    const state: StateStore = initApp()

    // prove that 
    registerUser(state, user).users contains user

    // prove that if user is registered
    connectUser(state, user).users contains user and user.status === 'Connected' 

    // prove that if user is not registered
    connectUser(state, user) equals state

    etc
  }
)
*/

test.initAppSpec()

const state = services.initApp()
const newUser: models.User = {pseudo: "toto", points: 0, status: 'Connected'}
console.log('state1: ', services.registerUser(state, newUser))
console.log('state0: ', state)
