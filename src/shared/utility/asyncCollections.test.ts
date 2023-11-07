import {
  asyncMap,
  asyncForEach,
  asyncReduce,

  asyncMapValues,
  asyncMapKeys,
  asyncMapEntries,

  asyncForEachValues,
  asyncForEachKeys,
  asyncForEachEntries,

  asyncReduceValues,
  asyncReduceKeys,
  asyncReduceEntries,

  asyncMapParallel,
  asyncForEachParallel,

  asyncMapValuesParallel,
  asyncMapKeysParallel,
  asyncMapEntriesParallel,

  asyncForEachValuesParallel,
  asyncForEachKeysParallel,
  asyncForEachEntriesParallel,

  Break,
  Last,
} from './asyncCollections';

describe('asyncCollections', () => {
  describe('asyncMap', () => {
    it('should map values', async () => {
      const result = await asyncMap([1, 2, 3], async (value) => value * 2);
      expect(result).toEqual([2, 4, 6]);
    });

    it('should break on encountering Break', async () => {
      const result = await asyncMap([1, 2, 3], async (value) => {
        if (value === 2) return Break;
        return value * 2;
      });
      expect(result).toEqual([2]);
    });

    it('should save value and break on encountering Last', async () => {
      const result = await asyncMap([1, 2, 3], async (value) => {
        if (value === 2) return Last(value * 10);
        return value * 2;
      });
      expect(result).toEqual([2, 20]);
    });
  });

  describe('asyncForEach', () => {
    it('should loop over values', async () => {
      const mockCallback = jest.fn();
      const data = [1, 2, 3];
      await asyncForEach(data, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback.mock.calls).toEqual([[1, 0, data], [2, 1, data], [3, 2, data]]);
    });

    it('should break on encountering Break', async () => {
      const mockCallback = jest.fn(async (value) => {
        if (value === 2) return Break;
      });
      const data = [1, 2, 3];
      await asyncForEach(data, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(2);
      expect(mockCallback.mock.calls).toEqual([[1, 0, data], [2, 1, data]]);
    });
  });

  describe('asyncReduce', () => {
    it('should reduce values', async () => {
      const result = await asyncReduce(
        [1, 2, 3],
        async (acc, value) => acc + value,
        0
      );
      expect(result).toBe(6);
    });

    it('should break and save value on encountering Last', async () => {
      const result = await asyncReduce(
        [1, 2, 3],
        async (acc, value) => {
          if (value === 2) return Last(acc + value * 10);
          return acc + value;
        },
        0
      );
      expect(result).toBe(21);
    });
  });

  describe('asyncMapValues', () => {
    it('should map object values', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapValues(obj, async (value) => value * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });

    it('should break on encountering Break', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapValues(obj, async (value, key) => {
        if (key === 'b') return Break;
        return value * 2;
      });
      expect(result).toEqual({ a: 2 });
    });

    it('should save value and break on encountering Last', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapValues(obj, async (value, key) => {
        if (key === 'b') return Last(value * 10);
        return value * 2;
      });
      expect(result).toEqual({ a: 2, b: 20 });
    });
  });

  describe('asyncMapParallel', () => {
    it('should map values in parallel', async () => {
      const result = await asyncMapParallel([1, 2, 3], async (value) => value * 2);
      expect(result).toEqual([2, 4, 6]);
    });
  });

  describe('asyncMapEntries', () => {
    it('should map object entries', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapEntries(obj, async ([key, value]) => `${key}:${value}`);
      expect(result).toEqual(['a:1', 'b:2', 'c:3']);
    });
  });

  describe('asyncMapKeys', () => {
    it('should map object keys', async () => {
      const obj: Record<string, number> = { a: 1, b: 2, c: 3 };
      const result = await asyncMapKeys(obj, async (key) => key.toUpperCase());
      expect(result).toEqual(['A', 'B', 'C']);
    });
  });

  describe('asyncForEachValues', () => {
    it('should loop over object values', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachValues(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback.mock.calls).toEqual([[1, 'a', obj], [2, 'b', obj], [3, 'c', obj]]);
    });
  });

  describe('asyncForEachEntries', () => {
    it('should loop over object entries', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachEntries(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback.mock.calls).toEqual([
        [['a', 1], 0, [['a', 1], ['b', 2], ['c', 3]]],
        [['b', 2], 1, [['a', 1], ['b', 2], ['c', 3]]],
        [['c', 3], 2, [['a', 1], ['b', 2], ['c', 3]]],
      ]);
    });
  });

  describe('asyncForEachKeys', () => {
    it('should loop over object keys', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachKeys(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
      expect(mockCallback.mock.calls).toEqual([
        ['a', 0, ['a', 'b', 'c']],
        ['b', 1, ['a', 'b', 'c']],
        ['c', 2, ['a', 'b', 'c']],
      ]);
    });
  });

  describe('asyncReduceValues', () => {
    it('should reduce object values', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncReduceValues(obj, async (acc, value) => acc + value, 0);
      expect(result).toBe(6);
    });

    it('should break and save value on encountering Last', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncReduceValues(obj, async (acc, value, key) => {
        if (key === 'b') return Last(acc + value * 10);
        return acc + value;
      }, 0);
      expect(result).toBe(21);
    });
  });

  describe('asyncReduceEntries', () => {
    it('should reduce object entries', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncReduceEntries(obj, async (acc, [key, value]) => acc + value, 0);
      expect(result).toBe(6);
    });
  });

  describe('asyncReduceKeys', () => {
    it('should reduce object keys', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncReduceKeys(obj, async (acc, key) => acc + key, '');
      expect(result).toBe('abc');
    });
  });

  describe('asyncForEachParallel', () => {
    it('should loop over values in parallel', async () => {
      const mockCallback = jest.fn();
      await asyncForEachParallel([1, 2, 3], mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
    });
  });

  describe('asyncMapValuesParallel', () => {
    it('should map object values in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapValuesParallel(obj, async (value) => value * 2);
      expect(result).toEqual({ a: 2, b: 4, c: 6 });
    });
  });

  describe('asyncMapEntriesParallel', () => {
    it('should map object entries in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapEntriesParallel(obj, async ([key, value]) => `${key}:${value}`);
      expect(result).toEqual(['a:1', 'b:2', 'c:3']);
    });
  });

  describe('asyncMapKeysParallel', () => {
    it('should map object keys in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const result = await asyncMapKeysParallel(obj, async (key) => key.toUpperCase());
      expect(result).toEqual(['A', 'B', 'C']);
    });
  });

  describe('asyncForEachValuesParallel', () => {
    it('should loop over object values in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachValuesParallel(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
    });
  });

  describe('asyncForEachEntriesParallel', () => {
    it('should loop over object entries in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachEntriesParallel(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
    });
  });

  describe('asyncForEachKeysParallel', () => {
    it('should loop over object keys in parallel', async () => {
      const obj = { a: 1, b: 2, c: 3 };
      const mockCallback = jest.fn();
      await asyncForEachKeysParallel(obj, mockCallback);
      expect(mockCallback).toHaveBeenCalledTimes(3);
    });
  });
});
