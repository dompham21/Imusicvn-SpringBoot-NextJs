import React from 'react';
import {
  Box,
  Flex,
  Icon,
  Image,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
} from 'react-icons/fi';

import { Link } from '../CustomLink';


const LinkItems = [
  { name: 'Home', icon: FiHome, href:"/" },
  { name: 'Trending', icon: FiTrendingUp, href:"/trending" },
  { name: 'Explore', icon: FiCompass,  href:"#" },
  { name: 'Favourites', icon: FiStar,  href:"#" },
  { name: 'Settings', icon: FiSettings,  href:"#" },
];

export default function Sidebar({
  children,
}) {
  const { onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('#170f23', 'white')}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Box ml={{ base: 0, md: 60 }}>
        {children}
      </Box>
    </Box>
  );
}



const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('hsla(0,0%,100%,0.1)', 'white')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      color="white"
      {...rest}>
        <Flex 
            h="100px" 
            pb="2"
            alignItems="center" 
            justifyContent="space-between"  
            borderBottom="1px"
            borderBottomColor="hsla(0,0%,100%,0.1)"
        >
            <Flex alignItems="center" justifyContent="center" w={{base:'full'}} cursor='pointer'>
              <Link href={'/'} _focus={{boxShadow:"none"}} aria-label='home'>
                <Image src="https://res.cloudinary.com/dmriwkfll/image/upload/v1656084201/logo_cq9yxq.png" width="85" height="85" alt='logo' priority='true'/>
              </Link>
            </Flex>
        </Flex>
        {LinkItems.map((link) => (
            <NavItem key={link.name} href={link.href} icon={link.icon} >
            {link.name}
            </NavItem>
        ))}
    </Box>
  );
};


const NavItem = ({ icon,href, children, ...rest }) => {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Flex
        align="center"
        p="4"
        pl="6"
        role="group"
        cursor="pointer"
       
        _hover={{
          bg: '#393143',
          color: 'white',
        }}
        _focus={{
            boxShadow: 'none'
        }}
        fontWeight="600"
        {...rest}>
        {icon && (
          <Icon
            mr="3"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};


