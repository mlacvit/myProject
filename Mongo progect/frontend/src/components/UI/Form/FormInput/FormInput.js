import React from 'react';
import {Grid, TextField} from "@mui/material";
import PropTypes from 'prop-types';

const FormInput = ({name, value, label, onChange, type, required, error}) => {
    return (
        <Grid item xs={15}>
            <TextField
                type={type}
                required={required}
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                error={Boolean(error)}
                helperText={error}
                color="secondary"
                style={{background: 'white'}}
            />
        </Grid>
    );
};

FormInput.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string,
    required: PropTypes.bool,
};

export default FormInput;