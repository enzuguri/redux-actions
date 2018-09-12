import autodux from '../src/autodux';

test('does something great', () => {
  const state = {
    foo: 'bar',
    bar: 'qux'
  };

  const { actions, selectors, reducer } = autodux({ initial: state });

  const action = actions.setfoo('my message');

  console.log(action);
  console.log(selectors.getfoo(state), selectors.getbar(state));

  const result = reducer(state, action);

  console.log(result);

  //expect(camelCase('MY_ACTION')).toBe('myAction');
});
