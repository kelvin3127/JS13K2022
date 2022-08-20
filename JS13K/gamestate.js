export default class Gamestate {

    constructor(states) {
  
      this.currentState = false;
      this.validStates = [];
  
      if(states) {
  
        console.log(typeof states);
  
  
        if(typeof states === 'object') {
  
          states.forEach(state => {
            this.validStates.push(state.toUpperCase());
          });
  
        } else if (typeof states === 'string') {
  
          this.validStates.push(states);
  
        }
      }
  
  
    }
  
    // register(state) {
  
    //   if(arraystack.indexOf(state.toUpperCase()) > -1) {
  
    //     console.warn('StateMashine: State already added');
    //     return;
  
    //   }
  
    //   this.validStates.push(state.toUpperCase());
  
    // }
  
    set(state) {
  
      if(this.validStates.indexOf(state.toUpperCase()) > -1) {
  
        this.currentState = state.toUpperCase();
  
      } else {
  
        console.warn('state not valid');
  
      }
  
    }
  
    get() {
     return this.currentState;
    }
  
  }
