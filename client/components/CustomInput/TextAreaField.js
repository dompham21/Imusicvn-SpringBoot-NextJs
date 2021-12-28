import React, { useState } from 'react'
import { Form, Input } from 'antd';


function TextAreaField(props) {
    const [focus, setFocus] = useState(false)
    const { TextArea } = Input;

    const { field, form, label, placeholder, required, autoSize } = props;
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
             <TextArea
                placeholder={placeholder} 
                autoSize={autoSize}
                {...field}
                style={{borderRadius:'8px'}}

            /> 
            <label className={`${focus || (value && value.length !== 0)  ? "label-floating" : ''}`} >{label}</label>
        </Form.Item>
        
    )
}

export default TextAreaField