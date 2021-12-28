
import React from 'react';
import {
  Box,
  Flex,
  Button
} from '@chakra-ui/react';
import Link from 'next/link'
import SearchNavBar from '../Search/SearchNavbar';



const Navbar = () => {
  

    return (
      <Box
        height="20"
        color={'white'}
        zIndex={1}
        pb={2}
       >
          <Flex alignItems={'center'} justifyContent={'space-between'} pl={10} pr={10} h={{base:'full'}}>
            <SearchNavBar/>
            <Link href="/admin">
              <Button  bg={'rgb(255, 48, 48)'} borderRadius='10px'> Admin View </Button>
            </Link>
          </Flex>
      </Box>
    );
  };

  export default Navbar;