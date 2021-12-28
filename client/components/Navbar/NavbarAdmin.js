
import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Button,
  Input,
} from '@chakra-ui/react';
import Link from 'next/link'


const NavbarAdmin = () => {
    return (
      <Box
        height="20"
        color={'white'}
        zIndex={1}
        pb={2}
       >
          <Flex alignItems={'center'} justifyContent={'space-between'} pl={10} pr={10} h={{base:'full'}}>
            <Input 
                placeholder="Nhap ten bai hat, ca si..." 
                maxW={'540px'}
                borderRadius={20}
                border={0}
                bg={useColorModeValue('hsla(0,0%,100%,0.1)','gray.900')}
                _placeholder={{ color: 'white' }}
            />
            <Link href="/">
              <Button  bg={'rgb(255, 48, 48)'} borderRadius='10px'>User View</Button>
            </Link>
          </Flex>
      </Box>
    );
  };

  export default NavbarAdmin;