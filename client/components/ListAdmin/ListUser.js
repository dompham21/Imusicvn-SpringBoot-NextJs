import React, { useEffect, useRef, useState } from 'react'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import  Link  from 'next/link';
import { Pagination, Table, Tag } from 'antd';
import { Avatar } from '@chakra-ui/avatar';
import { Box, Flex } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import AlertDialogDelete from '../AlertDialogDelete';
import { 
    deleteSongById, 
    getListSong, 
    resetErrorDeleteSong, 
    resetErrorGetListSong, 
    resetSuccessDeleteSong 
} from '../../store/actions/song';

const { Column } = Table;



function ListUser() {
    const toast = useToast()

    const dispatch = useDispatch()
    const listSongs = useSelector(state => state.song.listSongs)
    const errorGetListSong = useSelector(state => state.song.errorGetListSong)
    const isDeleteSuccess = useSelector(state => state.song.isDeleteSuccess)
    const errorDeleteSong = useSelector(state => state.song.errorDeleteSong)
    const totalSongs = useSelector(state => state.song.totalSongs)


    const [isOpen, setIsOpen] = useState(false)
    const [deleteId, setDeleteId] = useState(-1)


    const [selectRow, setSelectRow] = useState([])
    const hasSelected = selectRow.length > 0;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectRow(selectedRows);
        },
    };
   
    useEffect(() => {
       if(errorGetListSong && errorGetListSong.length > 0) {
            toast({
                title: errorGetListSong,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorGetListSong())
       }
    }, [errorGetListSong])

    useEffect(() => {
        if(isDeleteSuccess) {
             toast({
                 title: "Deleted this song is successfully",
                 position: "top-right",
                 status: "success",
                 isClosable: true,
             })
             dispatch(getListSong(1,""))
             dispatch(resetSuccessDeleteSong())
        }
    }, [isDeleteSuccess])

    useEffect(() => {
        if(errorDeleteSong && errorDeleteSong.length > 0) {
             toast({
                 title: errorDeleteSong,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorDeleteSong())

        }
    }, [errorDeleteSong])


    useEffect(() => {
        dispatch(getListSong(1,""))
    }, [dispatch])

    const handleChangePage = (page) => {
        dispatch(getListSong(page,""))
    }
   

    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    return (
        <Box p={'0 24px 24px 24px'}>
            {
                hasSelected ? 
                <Box 
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    borderRadius='6px'
                    mb='24px'
                    h='64px'
                    bg='rgb(255, 227, 213)'
                    color='rgb(255, 48, 48)'
                    p='0 12px'
                >
                    <Box>{selectRow.length} selected</Box>
                    <Box 
                        w='40px'
                        h='40px'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        fontSize='24px'
                        cursor='pointer'                        
                    >
                        <MdDelete/>
                    </Box>
                </Box> : null
            }
            <Table
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection,
                }}
                rowKey={obj => obj.id}
                dataSource={listSongs}
                pagination={false}
                
            >
                <Column title="ID" dataIndex="id" key="id" className="col-name"
                    sorter={(a, b) => a.id - b.id}
                    showSorterTooltip={false}
                    width={70}
                    align="center"
                />
                <Column title="Photo" dataIndex="photo" key="photo" 
                    width={100}
                    align="center"
                    render={(item) => (
                        <Avatar src={item} mr={'10px'}/>
                    )}
                />
                <Column title="Song Name" dataIndex="name" key="name" ellipsis={true}
                    width={150}

                    sorter={(a, b) => a.name.localeCompare(b.name)}
                    showSorterTooltip={false}
                />
                <Column title="Artist Name" dataIndex="artists" key="artists" 
                    width={150}
                    render={(services) => services.map(artist => artist.name).join(", ")}
                />
                <Column title="Category Name" dataIndex="categories" key="categories" 
                    width={150}
                    align="center"
                    render={(services) => services.map(category => category.name).join(", ")}
                />
                <Column title="Introduction" dataIndex="introduction" key="introduction" ellipsis={true}/>
                <Column title="Status" dataIndex="enabled" key="enabled" className="col-tag"
                    width={100}
                    align="center"
                    filters={
                        [
                            {
                              text: 'Active',
                              value: true,
                            },
                            {
                              text: 'Banned',
                              value: false,
                            },
                          ]
                    }
                    onFilter={(value, record) => record.enabled === value}

                    render={(stt)=>(
                        <>
                            {
                                stt === true ? 
                                <Box cursor='pointer'>
                                    <Tag color="green" >Active</Tag>
                                </Box>
                                :
                                <Box cursor='pointer'>
                                    <Tag color="red" >Banned</Tag>
                                </Box>
                        }
                        </>
                        
                    )}
                />
                <Column title="Action" dataIndex="action" key="action" className="col-action flex flex-ai-c"
                    width={150}

                    render={(text, record, index)=> (
                        <Flex alignItems='center' pb="10px" gridGap="7px">
                            <Link href={`/admin/song/edit/${record.id}`}>
                                <Box
                                    fontSize={'24px'} 
                                    cursor='pointer' 
                                    w='40px'
                                    h='40px'
                                    borderRadius='50%'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    transition='border-color ease-in 200ms '
                                    _hover={{borderColor:'#cbcacf', borderWidth:'1px'}}
                                >
                                    <MdModeEdit/>

                                </Box>
                            </Link>
                            
                            <Box
                                fontSize={'24px'} 
                                cursor='pointer' 
                                w='40px'
                                h='40px'
                                borderRadius='50%'
                                display='flex'
                                justifyContent='center'
                                alignItems='center'
                                transition='border-color ease-in 200ms '
                                _hover={{borderColor:'#cbcacf', borderWidth:'1px'}}
                                onClick={() => {setIsOpen(true), setDeleteId(record.id)}}
                            >
                                <MdDelete/>
                                <AlertDialogDelete 
                                    id={deleteId} 
                                    setIsOpen={setIsOpen} 
                                    isOpen={isOpen} 
                                    cancelRef={cancelRef} 
                                    onClose={onClose} 
                                    deleteDispatch={deleteSongById}
                                />
                            </Box>
                                
                        </Flex>
                    )}
                />
            </Table>
            <Box display='flex' justifyContent='center' mt='20px' >
                <Pagination defaultCurrent={1} 
                    total={totalSongs} 
                    onChange={handleChangePage}
                    defaultPageSize={9}

                />
            </Box>
        </Box>
    )
}

export default ListUser