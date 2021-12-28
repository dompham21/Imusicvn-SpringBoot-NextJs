  
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import React,{ useState } from 'react'
import { AiFillCamera } from 'react-icons/ai'

function UploadImageAvatar(props) {
  const { isCreate } = props; 
  const [avatarImg, setAvatarImg] = useState("")
  const imageHandler = (e) => {
    console.log(e)
      const reader = new FileReader();
      reader.onload = () =>{
        if(reader.readyState === 2){ //is done
          setAvatarImg(reader.result.toString())
        }
      }
      reader.readAsDataURL(e.target.files[0])
  };
  console.log(avatarImg)
  return (
      <Box w='100%' h='100%' overflow='hidden' borderRadius='50%' pos='relative' cursor='pointer'>
          <Image h='100%' objectFit='cover' src={avatarImg}/>
          <Box 
          
            cursor='pointer' 
            display='flex'
            flexDirection='column' 
            alignItems='center' 
            justifyContent='center' 
            position='absolute' 
            bg={`${isCreate ?"rgb(244, 246, 248)" : "rgb(22, 28, 36)"}`}
            color={`${isCreate ?"rgb(99, 115, 129)" : "white"}`}
            top='0'
            left='0'
            w='100%'
            h='100%'
            fontSize='24px'
            opacity={`${avatarImg.length ?"0" : "1"}`}
            transition='opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
            _hover={{opacity:'0.72'}}

        >
            <Input 
                cursor='pointer' 
                pos='absolute' 
                color='white' 
                top='0'
                left='0'
                opacity='0'
                z-index='10'
                w='100%'
                h='100%'
                type="file" accept="image/*" onChange={imageHandler}/>
            <AiFillCamera/>
            <Box fontSize='12px'>Upload photo</Box>
        </Box>
      </Box>
  )
}

export default UploadImageAvatar