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

    it(' should return READY_FOR_INPUT from SUGGESTIONS_VISIBLE state', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.lost_input_focus
        expect(currentState).toBe(TypeaheadStates.READY_FOR_INPUT)
    })

    it(' should return SUGGESTIONS_VISIBLE from SUGGESTIONS_VISIBLE (test1)', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.text_changed
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })

    it(' should return SUGGESTIONS_VISIBLE from SUGGESTIONS_VISIBLE (test2)', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.highlighted_suggestion_changed
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })

    it(' should return SELECTED from SUGGESTIONS_VISIBLE', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.selection_entered
        expect(currentState).toBe(TypeaheadStates.SELECTED)
    })
})