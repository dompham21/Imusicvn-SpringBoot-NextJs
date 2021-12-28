import React, {useState} from 'react'
import { Form, Select } from 'antd';

const { Option } = Select;

function SelectField(props) {
    const { field, options, label, placeholder , setFieldValue, mode, showSearch} = props;
    const { name, value } = field;
    const [focus, setFocus] = useState(false)


    const handleSelectedOptionChange = (selectedOption) => {
        setFieldValue(name, selectedOption);
    }
   
    return (
        <Form.Item style={{flex: 1}}>
            {label && <label className={`${(value && value.toString().length > 0) || focus ? "label-floating" : ''}`} >{label}</label>}
            <Select 
                mode={mode}
                showSearch={showSearch}
                placeholder={placeholder} 
                {...field}
                value={value}
                onChange={handleSelectedOptionChange}
                onFocus={()=>setFocus(true)} 
                onBlur={()=>setFocus(false)}
                filterOption={(input, option) => 
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                dropdownStyle={{borderRadius: '6px'}}
            >
                {
                    options && options.map(option => (
                        <Option  key={option.id} value={option.id}>{option.name}</Option>
                    ))
                }
            </Select>
        </Form.Item>
        
    )
}

export default SelectField