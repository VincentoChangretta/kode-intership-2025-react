import { classNames } from './classNames';

describe('classNames', () => {
  test('with only first param', () => {
    expect(classNames('someClass')).toBe('someClass');
  });
  test('with Mods', () => {
    expect(classNames('class', { myBool: true })).toBe('class myBool');
  });
  test('with Mods', () => {
    expect(classNames('class', { myBool: true, man: false, undefined })).toBe('class myBool');
  });
  test('with All', () => {
    expect(classNames('class', { myBool: true }, ['aram', 'arman'])).toBe(
      'class aram arman myBool',
    );
  });
  test('with All', () => {
    expect(classNames('class', { myBool: true }, ['aram', 'undefined'])).toBe(
      'class aram undefined myBool',
    );
  });
  test('with All', () => {
    expect(classNames('class', {}, [])).toBe('class');
  });
  test('with All', () => {
    expect(classNames('', {}, [])).toBe('');
  });
  test('notBe', () => {
    expect(classNames('')).not.toBe(undefined);
  });
  test('with All', () => {
    expect(classNames('123', { model: false }, [])).not.toBe(123);
  });
  test('with All', () => {
    expect(classNames(undefined, { model: undefined }, [undefined])).not.toBe(undefined);
  });
});
