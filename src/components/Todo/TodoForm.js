import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';

const initialFormState = {
  task_name: ''
};

const TodoForm = ({
  onSubmit,
  isEditing = false,
  preFilledFormState = {},
  onCancelEdit = () => {}
}) => {
  const [formValues, setFormValues] = React.useState({
    ...initialFormState,
    ...preFilledFormState
  });
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(formValues);
    setFormValues(initialFormState);
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormValues(state => ({ ...state, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="task_name"
            label="Task name"
            onChange={handleChange}
            value={formValues.task_name}
            variant="outlined"
            margin="normal"
            inputRef={inputRef}
            fullWidth
            required
          />
        </Grid>

        {isEditing && (
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="default"
              onClick={onCancelEdit}
              fullWidth
            >
              Cancel edit
            </Button>
          </Grid>
        )}

        <Grid item xs={12} md={isEditing && 6}>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Save task
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

TodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func,
  isEditing: PropTypes.bool,
  preFilledFormState: PropTypes.object
};

export default TodoForm;
