import createActions from './createActions';
import handleActions from './handleActions';

function initialStateReducer(result, key) {
  const setterAction = `set${key}`;
  result.setterActions[setterAction] = (
    { [key]: prevValue, ...state },
    { payload }
  ) => ({
    ...state,
    [key]: payload
  });
  const getter = `get${key}`;
  result.selectors[getter] = state => state[key];
  return result;
}

function actionsReducer(result, [key, value]) {
  result.actionMap[key] = undefined;
  result.handlers[key] = value;
  return result;
}

function autodux(
  { actions: userActions, initial },
  { namespace, prefix } = {}
) {
  const { selectors, setterActions } = Object.keys(initial).reduce(
    initialStateReducer,
    { selectors: {}, setterActions: {} }
  );
  const { actionMap, handlers } = Object.entries({
    ...setterActions,
    ...userActions
  }).reduce(actionsReducer, { actionMap: {}, handlers: {} });

  const actions = createActions(actionMap, { namespace, prefix });
  const reducer = handleActions(handlers, initial);
  return {
    actions,
    selectors,
    reducer,
    namespace,
    initial
  };
}

export default autodux;
