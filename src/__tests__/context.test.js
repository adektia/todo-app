import { readLocal, writeLocal } from '../state/context';
import { STORAGE_KEY } from '../state/context';

const makeLocalStorage = () => {
  let store = new Map();
  return {
    getItem: jest.fn((k) => (store.has(k) ? store.get(k) : null)),
    setItem: jest.fn((k, v) => store.set(k, v)),
    removeItem: jest.fn((k) => store.delete(k)),
    clear: jest.fn(() => store.clear()),
    _dump: () => store,
  };
};

describe('read and write to local storage', () => {
  let originalWindow;
  let ls;

  beforeEach(() => {
    originalWindow = global.window;
    ls = makeLocalStorage();
    Object.defineProperty(global, 'window', { value: {}, configurable: true });
    Object.defineProperty(global, 'localStorage', {
      value: ls,
      configurable: true,
    });
    jest.clearAllMocks();
  });

  afterEach(() => {
    Object.defineProperty(global, 'window', {
      value: originalWindow,
      configurable: true,
    });
    Object.defineProperty(global, 'localStorage', {
      value: undefined,
      configurable: true,
    });
  });

  describe('undefined window', () => {
    it('readLocal returns null', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        configurable: true,
      });
      expect(readLocal()).toBeNull();
    });

    it('writeLocal performs no operations', () => {
      Object.defineProperty(global, 'window', {
        value: undefined,
        configurable: true,
      });
      writeLocal({
        tasks: [{ taskId: 'x' }],
        prefs: { theme: 'dark', layout: 'grid', searchQuery: 'foo' },
      });
      expect(ls.setItem).not.toHaveBeenCalled();
    });
  });

  describe('readLocal', () => {
    it('returns null when no data stored', () => {
      expect(readLocal()).toBeNull();
      expect(ls.getItem).toHaveBeenCalledWith(STORAGE_KEY);
    });

    it('returns clean object', () => {
      const stored = {
        tasks: [{ taskId: 'a', title: 'A' }],
        prefs: {
          theme: 'dark',
          layout: 'grid',
          searchQuery: 'should-be-cleared',
        },
      };
      ls.setItem(STORAGE_KEY, JSON.stringify(stored));

      const result = readLocal();
      expect(result).toEqual({
        tasks: [{ taskId: 'a', title: 'A' }],
        prefs: { theme: 'dark', layout: 'grid', searchQuery: '' },
      });
    });

    it('sanitizes non-array tasks to []', () => {
      const stored = {
        tasks: { not: 'array' },
        prefs: { theme: 'dark', layout: 'grid', searchQuery: 'x' },
      };
      ls.setItem(STORAGE_KEY, JSON.stringify(stored));

      const result = readLocal();
      expect(Array.isArray(result.tasks)).toBe(true);
      expect(result.tasks).toHaveLength(0);
      expect(result.prefs.searchQuery).toBe('');
    });

    it('returns null on bad JSON', () => {
      ls.setItem(STORAGE_KEY, '{bad-json');
      expect(readLocal()).toBeNull();
    });

    it('returns null when getItem throws', () => {
      const throwingLs = {
        ...ls,
        getItem: jest.fn(() => {
          throw new Error('fail');
        }),
      };
      Object.defineProperty(global, 'localStorage', {
        value: throwingLs,
        configurable: true,
      });

      expect(readLocal()).toBeNull();
    });
  });

  describe('writeLocal', () => {
    it('persists only tasks, theme, layout', () => {
      const state = {
        tasks: [{ taskId: 't1', title: 'Task 1' }],
        prefs: { theme: 'dark', layout: 'grid', searchQuery: 'ignored' },
      };

      writeLocal(state);

      expect(ls.setItem).toHaveBeenCalledTimes(1);
      const [key, json] = ls.setItem.mock.calls[0];
      expect(key).toBe(STORAGE_KEY);
      expect(JSON.parse(json)).toEqual({
        tasks: [{ taskId: 't1', title: 'Task 1' }],
        prefs: { theme: 'dark', layout: 'grid' },
      });
    });

    it('handles empty state', () => {
      writeLocal({
        tasks: [],
        prefs: { theme: 'light', layout: 'list', searchQuery: '' },
      });
      const [, json] = ls.setItem.mock.calls[0];
      expect(JSON.parse(json)).toEqual({
        tasks: [],
        prefs: { theme: 'light', layout: 'list' },
      });
    });
  });
});
