import { useColorModeValue } from "@chakra-ui/color-mode";
import { Input } from "@chakra-ui/input";
import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { BsMusicNoteBeamed } from 'react-icons/bs';
import { Box, Stack, StackItem } from "@chakra-ui/layout";
import { searchSong } from "../../store/actions";
import  Link  from 'next/link';

const SearchNavBar = (props) => {
    const dispatch = useDispatch()

    const [focus, setFocus] = useState(false);
    const listSearch = useSelector(state => state.song.listSearch)
    const [value, setValue] = useState('')
    const typingTimeoutRef = useRef(null)

    const handleSearchChange = (keyword) => {
        dispatch(searchSong(1,keyword, 5))
    } 

    const handleChange = (event) => {
        let searchTerm = event.target.value
        setValue(searchTerm);
        if(!handleSearchChange) return;

        if(typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current)
        }
        typingTimeoutRef.current = setTimeout(() => {
            handleSearchChange(searchTerm)
        }, 300)
    }
    const handleOnBlur = () => {
        setTimeout(() => { //delay 150ms de nhan click chuot
            setFocus(false);
        }, 150);
    }
    return (
        <Box position='relative' maxW='540px' w='540px'>
            <Input 
                placeholder="Nhập tên bài hát hoặc ca sĩ..." 
                maxW={'540px'}
                borderRadius={focus && value.length ? "20px 20px 0 0" : 20}
                border={0}
                bg={useColorModeValue('hsla(0,0%,100%,0.1)','gray.900')}
                _placeholder={{ color: 'white' }}
                value={value}
                onChange={handleChange}
                onFocus={() => setFocus(true)}
                onBlur={handleOnBlur}
                _focus={{boxShadow:'none'}} 
            />
            {
                focus && value.length ?
                
                <Stack position='absolute' maxW='540px' w='100%' height='auto' 
                    maxH='601px' borderBottomLeftRadius='20px' borderBottomRightRadius='20px'
                    p='13px 10px' color='white'
                    zIndex='11'
                    top='40px'
                    bg='#2f2639'
                    
                >
                    {listSearch && listSearch.length && value.length ? listSearch.map((item, index) => (
                        <Link href={`/song/${item.id}`} key={item.id}>
                            <StackItem
                                display='flex'
                                flexDir='row'
                                p='8px 10px'
                                borderRadius='4px'
                                textOverflow='ellipsis'
                                cursor='pointer'
                                _hover={{backgroundColor: '#926ec4'}}
                                key={item.id}
                                alignItems='center'
                                gridGap='10px'
                            >
                                <BsMusicNoteBeamed style={{fontSize: '18px'}}/>
                                <Box display='flex' flexDir='column' >
                                    <Box display='flex' flexDir='row' alignItems='center' gridGap='5px'>
                                        <Box>{item.name}</Box>
                                        <Box 
                                            fontSize='13px'
                                            color='#b3b3b3'
                                        >- trong Bài Hát</Box>
                                    </Box>
                                    <Box 
                                        fontSize='13px'
                                        color='#b3b3b3'
                                    >
                                        {item.artists && item.artists.map(artist => artist.name).join(',')}
                                    </Box>
                                </Box>
                                
                            </StackItem>   
                        </Link>
                        
                    )) 
                   
                    : null
                }
                </Stack>

                : null
                
            }
        </Box>
    )
}


export default SearchNavBar;