import {
  TASK_ADD,
  TASK_UPDATE,
  TASK_DELETE,
  TASK_STATE_SET,
  SET_LAYOUT,
  SET_THEME,
  SET_SEARCH,
} from './actions';

export const initialState = {
  tasks: [],
  prefs: { theme: 'light', layout: 'list', searchQuery: '' },
};

export function reducer(state, action) {
  switch (action.type) {
    case SET_THEME:
      return { ...state, prefs: { ...state.prefs, theme: action.payload } };
    case SET_LAYOUT:
      return { ...state, prefs: { ...state.prefs, layout: action.payload } };
    case SET_SEARCH:
      return {
        ...state,
        prefs: { ...state.prefs, searchQuery: action.payload },
      };
    case TASK_ADD:
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case TASK_UPDATE:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.taskId === action.payload.taskId
            ? { ...t, ...action.payload, updatedAt: Date.now() }
            : t
        ),
      };
    case TASK_DELETE:
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.taskId !== action.payload),
      };
    case TASK_STATE_SET:
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.taskId === action.payload.taskId
            ? { ...t, state: action.payload.state, updatedAt: Date.now() }
            : t
        ),
      };
    default:
      return state;
  }
}
