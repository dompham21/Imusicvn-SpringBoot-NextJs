import React, { useState, useEffect} from 'react'
import { Box } from '@chakra-ui/layout';
import { useFormik, FormikProvider, Form, FastField } from 'formik';
import * as Yup from 'yup';
import InputField from '../CustomInput/InputField';
import { Button } from '@chakra-ui/button';
import { Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/image';
import Dropzone from 'react-dropzone';
import { AiFillCamera } from 'react-icons/ai';
import TextAreaField from '../CustomInput/TextAreaField';
import {  
    addCategory, 
    editCategoryById, 
    getCategoryById, 
    resetAddCategory, 
    resetEditCategory, 
    resetErrorAddCategory, 
    resetErrorEditCategory, 
    resetErrorGetCategory 
} from '../../store/actions';


const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
function CreateCategoryForm(props) {
    const {id, isCreate} = props;
    const [avatarImg, setAvatarImg] = useState("")

    const toast = useToast();
    const router = useRouter();
    const dispatch = useDispatch()
    const isCreateSuccess =  useSelector(state => state.category.isCreateSuccess)
    const infoCategory =  useSelector(state => state.category.infoCategory)


    const isUpdateSuccess =  useSelector(state => state.category.isUpdateSuccess)

    const errorGetCategory = useSelector(state => state.category.errorGetCategory)
    const errorEditCategory = useSelector(state => state.category.errorEditCategory)
    const errorAddCategory = useSelector(state => state.category.errorAddCategory)


    useEffect(() => {
        if(id !== undefined) {
            dispatch(getCategoryById(id))
        }
    }, [dispatch, id])



    useEffect(() => {
        if(errorGetCategory && errorGetCategory.length > 0) {
             toast({
                 title: errorGetCategory,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorGetCategory());

        }
     }, [errorGetCategory])

    const CreateSchema = Yup.object().shape({
        name: Yup.string().required('Artist is required'),
        introduction: Yup.string().required('Artist is required'),
        photo: Yup.mixed().required('Photo avatar is required')
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        )

    });
    const EditSchema = Yup.object().shape({
        name: Yup.string(),
        introduction: Yup.string(),
        photo: Yup.mixed()
        .test(
            "fileFormat",
            "Unsupported Format",
            value => (value && SUPPORTED_FORMATS.includes(value.type)) || value === infoCategory.photo
        )
    });
    
    
  
    const formik = useFormik({
        initialValues: {
            name: !isCreate && infoCategory.name ? infoCategory.name : '',
            introduction: !isCreate && infoCategory.introduction ? infoCategory.introduction : '',
            status: !isCreate && infoCategory.status ? infoCategory.status : true,
            photo: !isCreate &&infoCategory.photo ? infoCategory.photo : null,
        },    
        enableReinitialize: true,
        validationSchema: isCreate ? CreateSchema : EditSchema,
        onSubmit:  (values, { setErrors, setSubmitting, resetForm }) => {
            const formData = new FormData();

            if(isCreate) {
                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(addCategory(formData))
            }
            else {

                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(editCategoryById(id, formData))
            }
        }

    })
    const { errors, touched, values, isSubmitting, handleSubmit, initialValues, setFieldValue, setSubmitting, resetForm } = formik;

    useEffect(() => {
        if(isCreateSuccess && isCreate) {
            dispatch(resetAddCategory())
            setSubmitting(false);
            resetForm();
            router.push("/admin/category");
            toast({
                title: "Created this category is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isCreateSuccess, isCreate])

    useEffect(() => {
        if(isUpdateSuccess && !isCreate) {
            setSubmitting(false);

            dispatch(resetEditCategory())
            router.push("/admin/category");
            toast({
                title: "Updated this category is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isUpdateSuccess, isCreate])

    useEffect(() => {
        if(errorEditCategory && errorEditCategory.length > 0 && !isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorEditCategory,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorEditCategory())
        }
        
    }, [errorEditCategory, isCreate])

    useEffect(() => {
        if(errorAddCategory && errorAddCategory.length > 0 && isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorAddCategory,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorAddCategory())
        }
        
    }, [errorAddCategory, isCreate])
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                <Box display='flex' gridGap='24px' >
                <Box w='calc(100% * 1/3)' borderRadius='16px' bg='white' p='24px'>
                        <Box w='144px' h='144px' m='auto' borderRadius='50%' p='8px' border='1px dashed rgba(145, 158, 171, 0.32)' >
                            <Box w='100%' h='100%' overflow='hidden' borderRadius='50%' pos='relative' cursor='pointer'>
                                <Image objectFit='cover' src={!avatarImg && infoCategory.photo && !isCreate ? infoCategory.photo  : avatarImg} w='100%' h='100%'/>
                                <Dropzone accept="image/*" onDrop={(acceptedFiles) => {
                                    acceptedFiles.forEach((file) => {
                                        const reader = new FileReader()
                                
                                        reader.onload = () => {
                                            if(reader.readyState === 2){ //is done
                                                setFieldValue('photo', file)
                                                setAvatarImg(reader.result.toString())
                                            }
                                        }     
                                        reader.readAsDataURL(file)
                       
                                    })
                                }} multiple={false}>
                                    {({getRootProps, getInputProps}) => (
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
                                            opacity={`${values.photo ? "0" : "0.72"}`}
                                            transition='opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                                            _hover={{opacity:'0.72'}}
                                            {...getRootProps()} 
                                        >
                                            <input
                                                style={{
                                                    cursor: 'pointer', position: 'absolute',opacity: 0, 
                                                    zIndex:10, width: '100%',height:'100%', top:0, left:0
                                                }}  
                                                type="file" accept="image/*" {...getInputProps()}/>
                                            <AiFillCamera/>
                                            <Box fontSize='12px'>Upload photo</Box>

                                        </Box>
                                    )}
                                </Dropzone>       
                            </Box>
                        </Box>
                        <Box fontSize='14px' color='#ff4d4f' textAlign='center' mt='18px' mb='10px'>{ touched.photo &&errors.photo ? errors.photo : ''}</Box>
                        <Box fontSize='12px' color='rgb(99, 115, 129)' textAlign='center' mt='18px'>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB</Box>
                        <Box display='flex' mt='35px' justifyContent='space-between' alignItems='center'>
                            <Box display='flex' fontSize='14px' flexDirection='column' gridGap='4px' justifyContent='center'>
                                <Box color='black' fontWeight='600'>Banned</Box>
                                <Box color='rgb(99, 115, 129)' fontWeight='400'>Apply disable account</Box>
                            </Box>
                            <Switch defaultChecked={!values.status} onChange={( value) => {
                                setFieldValue("status", !value);
                            }}/>
                        </Box>
                    </Box>
                    <Box w='calc(100% * 2/3)' borderRadius='16px' bg='white' p={'80px'} overflow='hidden' flex='1'>
                        <Box color='black' bg='white'>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <Box w={'50%'}>
                                    <FastField
                                        label={'Name'}
                                        name="name"
                                        type='text'
                                        component={InputField}
                                    /> 
                                </Box>
                                    
                            </Box>   
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <FastField
                                    label={'Introduction'}
                                    name="introduction"
                                    autoSize={{ minRows: 6, maxRows: 7 }}
                                    component={TextAreaField}
                                />
                            </Box>
                            <Box mt='16px' display='flex' w='100%'  justifyContent='flex-end'>
                                <Button type="submit" isLoading={isSubmitting} bg={'rgb(255, 48, 48)'} color='white'>
                                    {isCreate ? "Create" : "Edit"}
                                </Button>
                            </Box>                                
                        </Box>
                    </Box> 
                </Box>
            </Form>
        </FormikProvider>
        
       
    )
}

export default CreateCategoryForm