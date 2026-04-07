'use client'

import { useReducer } from 'react'
import { compareDates } from '../lib/dateUtils'
import type { DatePoint, RangeState } from '../types/calendar'

type RangeAction =
  | { type: 'SELECT_DATE'; payload: DatePoint }
  | { type: 'SET_HOVER'; payload: DatePoint | null }
  | { type: 'CLEAR_RANGE' }

const initialState: RangeState = {
  start: null,
  end: null,
  hovering: null,
  selecting: false,
}

function dateRangeReducer(state: RangeState, action: RangeAction): RangeState {
  switch (action.type) {
    case 'SELECT_DATE': {
      const clicked = action.payload

      if (!state.start || (state.start && state.end)) {
        return { start: clicked, end: null, hovering: null, selecting: true }
      }

      if (state.start && !state.end) {
        if (compareDates(clicked, state.start) < 0) {
          return { start: clicked, end: state.start, hovering: null, selecting: false }
        }
        return { start: state.start, end: clicked, hovering: null, selecting: false }
      }

      return state
    }

    case 'SET_HOVER':
      if (!state.selecting) return state
      return { ...state, hovering: action.payload }

    case 'CLEAR_RANGE':
      return initialState

    default:
      return state
  }
}

export interface UseDateRangeResult {
  state: RangeState
  selectDate: (date: DatePoint) => void
  setHovering: (date: DatePoint | null) => void
  clearRange: () => void
}

export function useDateRange(): UseDateRangeResult {
  const [state, dispatch] = useReducer(dateRangeReducer, initialState)

  return {
    state,
    selectDate: (date) => dispatch({ type: 'SELECT_DATE', payload: date }),
    setHovering: (date) => dispatch({ type: 'SET_HOVER', payload: date }),
    clearRange: () => dispatch({ type: 'CLEAR_RANGE' }),
  }
}
