import React from 'react'
import { Checkbox } from 'antd';


function CheckboxField(props) {
    const { field, form, label, type } = props;
    const { name, value, onChange, onBlur } = field;
    const { errors, touched } = form;

    return (

        <Checkbox 
            {...field}
            validateStatus={touched[name] && errors[name] ? 'error' : 'success'}
            help={touched[name] && errors[name] ? errors[name] : ''}
        >
            {label}
        </Checkbox>
        
    )
}

export default CheckboxField