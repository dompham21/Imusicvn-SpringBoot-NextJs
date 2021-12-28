import { Flex } from "@chakra-ui/layout";
import { Input } from "@chakra-ui/input";
import React, {useState, useRef} from 'react'


const SearchItemAdmin = (props) => {
    const {onSubmit, item} = props;
    const [value, setValue] = useState('')
    const typingTimeoutRef = useRef(null)

    const handleChange = (event) => {
        let searchTerm = event.target.value
        setValue(searchTerm);
        if(!onSubmit) return;

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            onSubmit(searchTerm)
        }, 300)
    }
    return (
        <Flex mb="24px" p="24px" justifyContent="space-between" alignItems="center">
            <Input 
                placeholder={`Search ${item}...`}
                fontSize="20px" padding="8px" 
                borderRadius="8px" 
                maxW={'540px'} 
                value={value}
                onChange={handleChange}
                _focus={{boxShadow:'none'}} 
            />
        </Flex>
    )
}

export default SearchItemAdmin;