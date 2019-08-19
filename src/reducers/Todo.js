import {
  ADD_TODO,
  UPDATE_TODO,
  TOGGLE_TODO,
  REMOVE_TODO
} from '../actions/Todo';

export default function TodoReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_TODO:
      return [...state, { ...payload, id: state.length, isCompleted: false }];

    case UPDATE_TODO:
      return [...state].map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, ...payload };
        }
        return todo;
      });

    case TOGGLE_TODO:
      return [...state].map(todo => {
        if (todo.id === payload.id) {
          return {
            ...todo,
            isCompleted: !todo.isCompleted,
            completedDate: !todo.isCompleted && new Date()
          };
        }
        return todo;
      });

    case REMOVE_TODO:
      return [...state].filter(todo => todo.id !== payload.id);

    default:
      throw new Error();
  }
}
