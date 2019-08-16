import React from 'react';
import PropTypes, { array } from 'prop-types';
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const TodoList = ({
  todos,
  onEditTodoItem = () => {},
  onDeleteTodoItem = () => {}
}) => (
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
            <ListItem key={index} divider={index !== array.length - 1}>
              <ListItemText primary={todo.task_name} />
              <ListItemSecondaryAction>
                <>
                  <IconButton
                    color="primary"
                    onClick={() => onEditTodoItem(index)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDeleteTodoItem(index)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Grid>
  </Grid>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      task_name: PropTypes.string.isRequired
    })
  ),
  onEditTodoItem: PropTypes.func,
  onDeleteTodoItem: PropTypes.func
};

export default TodoList;
