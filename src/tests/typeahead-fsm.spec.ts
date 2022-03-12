import { TypeaheadStates, TypeaheadEvents, TypeaheadFsmMap, isTextChanged, getSuggestions } from '../typeahead-fsm'
import { depts_villes } from '../models/depts_villes'

describe('TypeaheadFsmMap test', () => {
    let currentState = TypeaheadFsmMap.initialState;

    it(' should return INIT state', () => { 
        expect(currentState).toBe(TypeaheadStates.INIT)
    })

    it(' should return READY_FOR_INPUT from INIT state', () => { 
        currentState = TypeaheadFsmMap.states.INIT.data_loaded
        expect(currentState).toBe(TypeaheadStates.READY_FOR_INPUT)
        expect(TypeaheadFsmMap.states.READY_FOR_INPUT.depts_villes).toEqual(depts_villes)
        expect(TypeaheadFsmMap.states.READY_FOR_INPUT.text).toBe('')
    })

    it(' should return SUGGESTIONS_VISIBLE from READY_FOR_INPUT state', () => { 
        currentState = TypeaheadFsmMap.states.READY_FOR_INPUT.got_input_focus
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })

    it(' should return READY_FOR_INPUT from SUGGESTIONS_VISIBLE state', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.lost_input_focus
        expect(currentState).toBe(TypeaheadStates.READY_FOR_INPUT)
    })

    it(' should return SUGGESTIONS_VISIBLE from SUGGESTIONS_VISIBLE state (test1)', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.text_changed
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)

        // we assume that the user has typed '31'
        TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.text = '11'

        // add actions
        const curText = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.text
        if (isTextChanged(curText)) {
            console.log(getSuggestions(curText))
        }
    })

    it(' should return SUGGESTIONS_VISIBLE from SUGGESTIONS_VISIBLE state (test2)', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.move_highlighted_suggestion_down
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })

    it(' should return SUGGESTIONS_VISIBLE from SUGGESTIONS_VISIBLE state (test3)', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.move_highlighted_suggestion_up
        expect(currentState).toBe(TypeaheadStates.SUGGESTIONS_VISIBLE)
    })

    it(' should return SELECTED from SUGGESTIONS_VISIBLE state', () => { 
        currentState = TypeaheadFsmMap.states.SUGGESTIONS_VISIBLE.selection_entered
        expect(currentState).toBe(TypeaheadStates.SELECTED)
    })

    it(' should return READY_FOR_INPUT from SELECTED state', () => { 
        currentState = TypeaheadFsmMap.states.SELECTED.selection_cleared
        expect(currentState).toBe(TypeaheadStates.READY_FOR_INPUT)
    })
})