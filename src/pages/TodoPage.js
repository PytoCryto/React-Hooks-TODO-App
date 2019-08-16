import React from 'react';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(10),
    padding: theme.spacing(2)
  }
}));

const TodoPage = () => {
  const classes = useStyles();
  const [todos, setTodos] = React.useState([]);
  const [activeTodo, setActiveTodo] = React.useState(null);

  const onSubmit = values => {
    const { task_name, isEditing, todoItemIndex } = values;
    const newTodos = [...todos];

    if (isEditing) {
      newTodos[todoItemIndex] = { task_name };
    } else {
      newTodos.push({ task_name });
    }

    setTodos(newTodos);
    setActiveTodo(null);
  };

  const onEditTodoItem = todoItemIndex => {
    setActiveTodo({ isEditing: true, todoItemIndex, ...todos[todoItemIndex] });
  };

  const onDeleteTodoItem = todoItemIndex => {
    setTodos(state => state.filter((_, index) => index !== todoItemIndex));
  };

  const TodoArea = props => {
    return (
      <Paper {...props}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TodoForm onSubmit={onSubmit} preFilledFormState={activeTodo} />
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
