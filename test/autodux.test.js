import autodux from '../src/autodux';

const state = {
  foo: 'bar',
  bar: 'qux'
};

test('does something great', () => {
  const { actions, selectors, reducer } = autodux({ initial: state });

  const action = actions.setfoo('my message');

  console.log(action);
  console.log(selectors.getfoo(state), selectors.getbar(state));

  const result = reducer(state, action);

  console.log(result);

  //expect(camelCase('MY_ACTION')).toBe('myAction');
});

test('uses namespace', () => {
  const namespace = 'slice';
  const { actions, selectors, reducer } = autodux(
    { initial: state },
    {
      namespace,
      prefix: 'my-company'
    }
  );

  const parentState = {
    [namespace]: state
  };

  const action = actions.setfoo('my message');

  console.log(action);
  console.log(selectors.getfoo(parentState), selectors.getbar(parentState));

  const result = reducer(state, action);

  console.log(result);
});
