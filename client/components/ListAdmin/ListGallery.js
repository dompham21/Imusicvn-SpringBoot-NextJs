import React, { useEffect, useRef, useState } from 'react'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import  Link  from 'next/link';
import { Pagination, Table, Tag } from 'antd';
import { Box, Flex } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import AlertDialogDelete from '../AlertDialogDelete';
import { 
    deleteGalleryById, 
    getListGallery, 
    resetErrorDeleteGallery, 
    resetErrorGetListGallery, 
    resetSuccessDeleteGallery 
} from '../../store/actions';
const { Column } = Table;



function ListGallery() {
    const toast = useToast()

    const dispatch = useDispatch()
    const listGallery = useSelector(state => state.gallery.listGallery)
    const errorGetListGallery = useSelector(state => state.gallery.errorGetListGallery)
    const isDeleteSuccess = useSelector(state => state.gallery.isDeleteSuccess)
    const errorDeleteGallery = useSelector(state => state.gallery.errorDeleteGallery)
    const totalGallery = useSelector(state => state.gallery.totalGallery)


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
       if(errorGetListGallery && errorGetListGallery.length > 0) {
            toast({
                title: errorGetListGallery,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorGetListGallery())
       }
    }, [errorGetListGallery])

    useEffect(() => {
        if(isDeleteSuccess) {
             toast({
                 title: "Deleted this song is successfully",
                 position: "top-right",
                 status: "success",
                 isClosable: true,
             })
             dispatch(getListGallery(1,""))
             dispatch(resetSuccessDeleteGallery())
        }
    }, [isDeleteSuccess])

    useEffect(() => {
        if(errorDeleteGallery && errorDeleteGallery.length > 0) {
             toast({
                 title: errorDeleteGallery,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorDeleteGallery())

        }
    }, [errorDeleteGallery])


    useEffect(() => {
        dispatch(getListGallery(1,""))
    }, [dispatch])

    const handleChangePage = (page) => {
        dispatch(getListGallery(page,""))
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
                dataSource={listGallery}
                pagination={false}
                
            >
                <Column title="ID" dataIndex="id" key="id" className="col-name"
                    sorter={(a, b) => a.id - b.id}
                    showSorterTooltip={false}
                    width={70}
                   
                />
                <Column title="Title" dataIndex="title" key="title" ellipsis={true}
                />
                <Column title="Section Type" dataIndex="sectionType" key="sectionType" 
                    width={150}
                />
                <Column title="Song Name" dataIndex="songs" key="songs" ellipsis={true}
                    width={200}
                    render={(songs) => songs.map(song =>  ( <Box key={song.id}>{song.name}</Box> ))}

                />
                <Column title="Status" dataIndex="enabled" key="enabled" className="col-tag"
                    width={100}

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
                <Column title="Action" dataIndex="action" key="action" className="col-action"
                    width={150}

                    render={(text, record, index)=> (
                        <Flex alignItems='center' pb="10px" gridGap="7px">
                            <Link href={`/admin/gallery/edit/${record.id}`}>
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
                                    deleteDispatch={deleteGalleryById}
                                />
                            </Box>
                                
                        </Flex>
                    )}
                />
            </Table>
            <Box display='flex' justifyContent='center' mt='20px' >
                <Pagination defaultCurrent={1} 
                    total={totalGallery} 
                    onChange={handleChangePage}
                    defaultPageSize={9}

                />
            </Box>
        </Box>
    )
}

export default ListGallery