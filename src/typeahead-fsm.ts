import { depts_villes } from './models/depts_villes'

// states
export enum TypeaheadStates {
    INIT = 'INIT',
    READY_FOR_INPUT = 'READY_FOR_INPUT',
    SUGGESTIONS_VISIBLE = 'SUGGESTIONS_VISIBLE',
    SELECTED = 'SELECTED'
}

// events
export enum TypeaheadEvents {
    data_loaded = 'data_loaded',
    got_input_focus = 'got_input_focus',
    lost_input_focus = 'lost_input_focus',
    selection_entered = 'selection_entered',
    selection_cleared = 'selection_cleared',
    text_changed = 'text_changed',
    move_highlighted_suggestion_up = 'move_highlighted_suggestion_up',
    move_highlighted_suggestion_down = 'move_highlighted_suggestion_down'
}

// fsm map
export const TypeaheadFsmMap = {
    initialState: TypeaheadStates.INIT,
    states: {
        [TypeaheadStates.INIT]: {
            [TypeaheadEvents.data_loaded]: TypeaheadStates.READY_FOR_INPUT
        },
        [TypeaheadStates.READY_FOR_INPUT]: {
            [TypeaheadEvents.got_input_focus]: TypeaheadStates.SUGGESTIONS_VISIBLE,
            depts_villes,
            text: ''
        },
        [TypeaheadStates.SUGGESTIONS_VISIBLE]: {
            [TypeaheadEvents.lost_input_focus]: TypeaheadStates.READY_FOR_INPUT,
            [TypeaheadEvents.selection_entered]: TypeaheadStates.SELECTED,
            [TypeaheadEvents.text_changed]: TypeaheadStates.SUGGESTIONS_VISIBLE,
            [TypeaheadEvents.move_highlighted_suggestion_down]: TypeaheadStates.SUGGESTIONS_VISIBLE,
            [TypeaheadEvents.move_highlighted_suggestion_up]: TypeaheadStates.SUGGESTIONS_VISIBLE,
            depts_villes,
            text: '',
            suggestions: [''],
            suggestionIdx: 0
        },
        [TypeaheadStates.SELECTED]: {
            [TypeaheadEvents.selection_cleared]: TypeaheadStates.READY_FOR_INPUT,
            depts_villes,
            selection: ''
        }
    }
}