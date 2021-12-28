import React, { useEffect, useRef, useState } from 'react'
import { MdModeEdit, MdDelete } from 'react-icons/md'
import  Link  from 'next/link';
import { Pagination, Table, Tag } from 'antd';
import { Box, Flex } from '@chakra-ui/layout';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/toast';
import AlertDialogDelete from '../AlertDialogDelete';
import { 
    deleteCategoryById, 
    getListCategory, 
    resetErrorDeleteCategory, 
    resetErrorGetListCategory, 
    resetSuccessDeleteCategory
} from '../../store/actions';
const { Column } = Table;



function ListCategory() {
    const toast = useToast()

    const dispatch = useDispatch()
    const listCategories = useSelector(state => state.category.listCategories)
    const errorGetListCategories = useSelector(state => state.category.errorGetListCategories)
    const isDeleteSuccess = useSelector(state => state.category.isDeleteSuccess)
    const errorDeleteCategory = useSelector(state => state.category.errorDeleteCategory)
    const totalCategory = useSelector(state => state.category.totalCategory)


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
       if(errorGetListCategories && errorGetListCategories.length > 0) {
            toast({
                title: errorGetListCategories,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorGetListCategory())
       }
    }, [errorGetListCategories])

    useEffect(() => {
        if(isDeleteSuccess) {
             toast({
                 title: "Deleted this song is successfully",
                 position: "top-right",
                 status: "success",
                 isClosable: true,
             })
             dispatch(getListCategory(1,""))
             dispatch(resetSuccessDeleteCategory())
        }
    }, [isDeleteSuccess])

    useEffect(() => {
        if(errorDeleteCategory && errorDeleteCategory.length > 0) {
             toast({
                 title: errorDeleteCategory,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorDeleteCategory())

        }
    }, [errorDeleteCategory])


    useEffect(() => {
        dispatch(getListCategory(1,""))
    }, [dispatch])

    const handleChangePage = (page) => {
        dispatch(getListCategory(page,""))
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
                dataSource={listCategories}
                pagination={false}
                
            >
                <Column title="ID" dataIndex="id" key="id" className="col-name"
                    sorter={(a, b) => a.id - b.id}
                    showSorterTooltip={false}
                    width={70}
                   
                />
                <Column title="Name" dataIndex="name" key="name" ellipsis={true}
                    width={150}
                />
                <Column title="Introduction" dataIndex="introduction" key="introduction"  ellipsis={true}
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
                            <Link href={`/admin/category/edit/${record.id}`}>
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
                                    deleteDispatch={deleteCategoryById}
                                />
                            </Box>
                                
                        </Flex>
                    )}
                />
            </Table>
            <Box display='flex' justifyContent='center' mt='20px' >
                <Pagination defaultCurrent={1} 
                    total={totalCategory} 
                    onChange={handleChangePage}
                    defaultPageSize={9}

                />
            </Box>
        </Box>
    )
}

export default ListCategory