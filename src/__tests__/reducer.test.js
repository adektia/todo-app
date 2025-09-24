import { reducer, initialState } from '../state/reducer';
import {
  TASK_ADD,
  TASK_UPDATE,
  TASK_DELETE,
  TASK_STATE_SET,
  SET_LAYOUT,
  SET_THEME,
  SET_SEARCH,
} from '../state/actions';

describe('reducer', () => {
  const FIXED_NOW = 1_725_000_000_000;

  beforeEach(() => {
    jest.spyOn(Date, 'now').mockReturnValue(FIXED_NOW);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns current state for unknown action', () => {
    const next = reducer(initialState, { type: 'UNKNOWN' });
    expect(next).toBe(initialState);
  });

  it('SET_THEME updates prefs.theme', () => {
    const next = reducer(initialState, { type: SET_THEME, payload: 'dark' });
    expect(next.prefs.theme).toBe('dark');
    expect(next.prefs.layout).toBe('list');
    expect(next.prefs.searchQuery).toBe('');
  });

  it('SET_LAYOUT updates prefs.layout', () => {
    const next = reducer(initialState, { type: SET_LAYOUT, payload: 'grid' });
    expect(next.prefs.layout).toBe('grid');
  });

  it('SET_SEARCH updates prefs.searchQuery', () => {
    const next = reducer(initialState, { type: SET_SEARCH, payload: 'foo' });
    expect(next.prefs.searchQuery).toBe('foo');
  });

  it('TASK_ADD prepends a task', () => {
    const t1 = { taskId: 'a', title: 'A' };
    const t2 = { taskId: 'b', title: 'B' };
    const s1 = reducer(initialState, { type: TASK_ADD, payload: t1 });
    const s2 = reducer(s1, { type: 'TASK_ADD', payload: t2 });
    expect(s2.tasks).toEqual([t2, t1]);
  });

  it('TASK_UPDATE updates the matched task and sets updatedAt', () => {
    const base = {
      ...initialState,
      tasks: [{ taskId: 'x', title: 'Old' }],
    };
    const next = reducer(base, {
      type: TASK_UPDATE,
      payload: { taskId: 'x', title: 'New' },
    });
    expect(next.tasks).toHaveLength(1);
    expect(next.tasks[0]).toEqual({
      taskId: 'x',
      title: 'New',
      updatedAt: FIXED_NOW,
    });
  });

  it('TASK_UPDATE does not update tasks when taskId not found', () => {
    const base = { ...initialState, tasks: [{ taskId: 'x' }] };
    const next = reducer(base, {
      type: TASK_UPDATE,
      payload: { taskId: 'y', title: 'New' },
    });
    expect(next).toEqual(base);
  });

  it('TASK_DELETE removes a task by id', () => {
    const base = { ...initialState, tasks: [{ taskId: 'x' }, { taskId: 'y' }] };
    const next = reducer(base, { type: TASK_DELETE, payload: 'x' });
    expect(next.tasks).toEqual([{ taskId: 'y' }]);
  });

  it('TASK_STATE_SET sets state and updatedAt on matched task', () => {
    const base = { ...initialState, tasks: [{ taskId: 'x', state: 'todo' }] };
    const next = reducer(base, {
      type: TASK_STATE_SET,
      payload: { taskId: 'x', state: 'done' },
    });
    expect(next.tasks[0].taskId).toBe('x');
    expect(next.tasks[0].state).toBe('done');
    expect(next.tasks[0].updatedAt).toBe(FIXED_NOW);
  });

  it('TASK_STATE_SET does not update tasks when taskId not found', () => {
    const base = { ...initialState, tasks: [{ taskId: 'x', state: 'todo' }] };
    const next = reducer(base, {
      type: TASK_STATE_SET,
      payload: { taskId: 'y', state: 'done' },
    });
    expect(next).toEqual(base);
  });
});
