import React from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';
import TodoReducer from '../reducers/Todo';
import { addTodo, updateTodo, removeTodo, toggleTodo } from '../actions/Todo';

const initialState = [
  { id: 0, task_name: 'Wash the car', isCompleted: false },
  {
    id: 1,
    task_name: 'Commit ALT F4',
    isCompleted: true,
    completedDate: new Date()
  }
];

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(2)
  }
}));

const TodoPage = () => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTodo, setActiveTodo] = React.useState(null);
  const [todos, dispatch] = React.useReducer(TodoReducer, initialState);

  const onSubmit = formValues => {
    if (!isEditing) {
      return dispatch(addTodo(formValues));
    }

    dispatch(updateTodo(formValues));
    onCancelEdit();
  };

  const onCancelEdit = () => {
    setIsEditing(false);
    setActiveTodo(null);
  };

  const onEditTodoItem = todo => {
    setIsEditing(true);
    setActiveTodo(todo);
  };

  const onDeleteTodoItem = todo => {
    if (isEditing && todo.id === activeTodo.id) {
      onCancelEdit();
    }
    dispatch(removeTodo(todo));
  };

  const onToggleTodoCompleted = todo => dispatch(toggleTodo(todo));

  const TodoArea = props => {
    return (
      <Paper {...props}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TodoForm
              onSubmit={onSubmit}
              onCancelEdit={onCancelEdit}
              isEditing={isEditing}
              preFilledFormState={activeTodo}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <TodoListArea />
          </Grid>
        </Grid>
      </Paper>
    );
  };

  const TodoListArea = () => (
    <TodoList
      todos={todos}
      onToggleTodoCompleted={onToggleTodoCompleted}
      onEditTodoItem={onEditTodoItem}
      onDeleteTodoItem={onDeleteTodoItem}
    />
  );

  return (
    <Container maxWidth={false}>
      <Grid container justify="center">
        <Grid item xs={12} md={8}>
          <TodoArea className={classes.paper} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TodoPage;
