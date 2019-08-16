import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField, Button } from '@material-ui/core';

const initialFormState = {
  task_name: ''
};

const TodoForm = ({ onSubmit, preFilledFormState = {} }) => {
  const [formValues, setFormValues] = React.useState({
    ...initialFormState,
    ...preFilledFormState
  });
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (preFilledFormState === null) {
      return;
    }

    if (Object.values(preFilledFormState).length > 0) {
      inputRef.current.focus();
    }
  }, [preFilledFormState]);

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

        <Grid item xs={12}>
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
  preFilledFormState: PropTypes.object
};

export default TodoForm;
