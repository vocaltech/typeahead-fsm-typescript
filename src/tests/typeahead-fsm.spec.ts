import { TypeaheadStates, TypeaheadEvents, TypeaheadFsmMap } from '../typeahead-fsm'

describe('TypeaheadFsmMap test', () => {
    let currentState = TypeaheadFsmMap.initialState;

    it(' should return INIT state', () => { 
        expect(currentState).toBe(TypeaheadStates.INIT)
    })

    it(' should return READY_FOR_INPUT from INIT state', () => { 
        currentState = TypeaheadFsmMap.states.INIT.data_loaded
        expect(currentState).toBe(TypeaheadStates.READY_FOR_INPUT)
    })

    it(' should return SUGGESTIONS_VISIBLE from READY_FOR_INPUT state', () => { 
        currentState = TypeaheadFsmMap.states.READY_FOR_INPUT.got_input_focus
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })
})