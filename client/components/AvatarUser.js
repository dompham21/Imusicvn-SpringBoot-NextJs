import { Switch, Tag } from 'antd'
import React, { useState } from 'react'
import { Box } from '@chakra-ui/layout'

function AvatarUser(props, {children}) {
    const { isCreate } = props
    const [banned, setBanned] = useState('Active')
    const handleSwitchBanned = (checked) => {
        if(checked) {
            setBanned("Banned")
        }
        else {
            setBanned("Active")
        }
    }

    return (
        <Box p='24px'>
            <Box justifyContent='flex-end' mb='30px' display={`${isCreate ? "none" : "flex"}`}>
                {
                    banned === 'Active' ? 
                        <Tag color="green" >
                            Active
                        </Tag>
                    :
                        <Tag color="red" >
                            Banned
                        </Tag>

                }
            </Box>
            <Box w='144px' h='144px' m='auto' borderRadius='50%' p='8px' border='1px dashed rgba(145, 158, 171, 0.32)' >
                
            </Box>
            <Box fontSize='12px' color='rgb(99, 115, 129)' textAlign='center' mt='18px'>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB</Box>
            <Box display='flex' mt='35px' justifyContent='space-between' alignItems='center'>
                <Box display='flex' fontSize='14px' flexDirection='column' gridGap='4px' justifyContent='center'>
                    <Box color='black' fontWeight='600'>Banned</Box>
                    <Box color='rgb(99, 115, 129)' fontWeight='400'>Apply disable account</Box>
                </Box>
                <Switch onChange={handleSwitchBanned}/>
            </Box>
        </Box>
    )
}

export default AvatarUser