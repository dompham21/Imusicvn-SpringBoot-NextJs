import React, { useState } from 'react'
import { Form, Input } from 'antd';


function InputField(props) {
    const [focus, setFocus] = useState(false)

    const { field, form, label, placeholder, required, type } = props;
    const { name, value, onChange, onBlur, onFocus } = field;
    const { errors, touched } = form;

    return (
        <Form.Item
            validateStatus={touched[name] && errors[name] ? 'error' : 'success'}
            help={touched[name] && errors[name] ? errors[name] : ''}
            onFocus={()=>setFocus(true)} 
            onBlur={()=>setFocus(false)}
            style={{flex:1}}
        >
            <Input 
                placeholder={placeholder} 
                type={type}  
                {...field}
            />
            <label className={`${focus || (value && value.length !== 0)  ? "label-floating" : ''}`} >{label}</label>
        </Form.Item>
        
    )
}

export default InputField