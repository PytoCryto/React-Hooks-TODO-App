import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TodoList = ({
  todos,
  onToggleTodoCompleted = () => {},
  onEditTodoItem = () => {},
  onDeleteTodoItem = () => {}
}) => {
  const toggleCheckbox = todo => event =>
    onToggleTodoCompleted(todo, event.target.checked);

  const TodoItem = ({ todo, ...props }) => (
    <ListItem button {...props}>
      <ListItemText
        primary={todo.task_name}
        secondary={
          todo.isCompleted &&
          `Task was completed on ${todo.completedDate.toLocaleString('en-GB')}`
        }
        style={{ opacity: todo.isCompleted && 0.6 }}
      />
      <ListItemSecondaryAction>
        <>
          <Checkbox
            checked={todo.isCompleted}
            onChange={toggleCheckbox(todo)}
          />
          <IconButton color="primary" onClick={() => onEditTodoItem(todo)}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={() => onDeleteTodoItem(todo)}>
            <DeleteIcon />
          </IconButton>
        </>
      </ListItemSecondaryAction>
    </ListItem>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <List>
          {todos.length === 0 && (
            <ListItem>
              <ListItemText primary="You have no tasks to do" />
            </ListItem>
          )}

          {todos.length > 0 &&
            todos.map((todo, index, array) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                divider={index !== array.length - 1}
              />
            ))}
        </List>
      </Grid>
    </Grid>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      task_name: PropTypes.string.isRequired
    })
  ),
  onToggleCompleted: PropTypes.func,
  onEditTodoItem: PropTypes.func,
  onDeleteTodoItem: PropTypes.func
};

export default TodoList;
