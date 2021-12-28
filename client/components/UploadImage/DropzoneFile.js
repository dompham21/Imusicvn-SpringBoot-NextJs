
import Dropzone from 'react-dropzone'
import React, {useCallback, useState} from 'react'
import { Box} from '@chakra-ui/layout';




const DropzoneFile = (props) => {
    const {setFieldValue, values} = props;
    return (
        <Dropzone onDrop={(acceptedFiles) => {
            acceptedFiles.forEach((file) => {
                const reader = new FileReader()
        
                reader.onload = () => {
                if(reader.readyState === 2){ //is done
                    setFieldValue('file', file)
                }
                }                            
                reader.readAsDataURL(file)
            })
        }} multiple={false}>
            {({getRootProps, getInputProps}) => (
                <Box 
                    p='40px 8px' 
                    bg='#F4F6F8' 
                    border='1px dashed #919eab52' 
                    cursor='pointer' 
                    borderRadius='8px' 
                    _hover={{opacity: 0.72}}
                    {...getRootProps()} 
                >
                    <input type="file" accept="audio/*,video/*" name="file" {...getInputProps()}/>
                    <Box display={`display: ${values.file  ? "none" : "flex"}`} justifyContent='center' alignItems='center'>
                        <Box p='24px'>
                            <Box textAlign='center' fontSize='20px' mb='8px' fontWeight='700' color='#212B36'>Drop or Select file</Box>
                            <Box textAlign='center' fontWeight='400' color='#637381' fontSize='14px'>Drop file here or click browse thorough your machine</Box>
                        </Box>
                    </Box>
                </Box>
            )}
        </Dropzone>
    )
}

export default DropzoneFile;