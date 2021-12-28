import React, { useEffect } from 'react'
import { Box} from '@chakra-ui/layout';
import { useFormik, FormikProvider, Form, FastField, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../CustomInput/InputField';
import SelectField from '../CustomInput/SelectField';
import { Button } from '@chakra-ui/button';
import { Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { 
    addGallery, 
    editGalleryById, 
    getGalleryById, 
    getListIdSong, 
    resetAddGallery, 
    resetEditGallery, 
    resetErrorAddGallery, 
    resetErrorEditGallery, 
    resetErrorGetGallery 
} from '../../store/actions';



function CreateGalleryForm(props) {
    const {id, isCreate} = props;
    const toast = useToast();
    const router = useRouter();
    const dispatch = useDispatch()
    const isCreateSuccess =  useSelector(state => state.gallery.isCreateSuccess)
    const infoGallery =  useSelector(state => state.gallery.infoGallery)

    const listIdSongs =  useSelector(state => state.song.listIdSongs)


    const isUpdateSuccess =  useSelector(state => state.gallery.isUpdateSuccess)

    const errorGetGallery = useSelector(state => state.gallery.errorGetGallery)
    const errorEditGallery = useSelector(state => state.gallery.errorEditGallery)
    const errorAddGallery = useSelector(state => state.gallery.errorAddGallery)


    useEffect(() => {
        if(id !== undefined) {
            dispatch(getGalleryById(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getListIdSong())   
    }, [dispatch])

    useEffect(() => {
        if(errorGetGallery && errorGetGallery.length > 0) {
             toast({
                 title: errorGetGallery,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorGetGallery());

        }
     }, [errorGetGallery])

    const CreateSchema = Yup.object().shape({
        title: Yup.string().required('Artist is required'),
        sectionType: Yup.string().required('Artist is required'),
        songs: Yup.array(),

    });
    const EditSchema = Yup.object().shape({
        title: Yup.string(),
        sectionType: Yup.string(),
        songs: Yup.array(),
    });
    
    
  
    const formik = useFormik({
        initialValues: {
            title: !isCreate && infoGallery.title ? infoGallery.title : '',
            sectionType: !isCreate && infoGallery.sectionType ? infoGallery.sectionType : '',
            songs: !isCreate && infoGallery.songs ? infoGallery.songs.map(song => song.id) : [],
            status: !isCreate && infoGallery.status ? infoGallery.status : true
        },    
        enableReinitialize: true,
        validationSchema: isCreate ? CreateSchema : EditSchema,
        onSubmit:  (values, { setErrors, setSubmitting, resetForm }) => {
            const formData = new FormData();

            if(isCreate) {
                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(addGallery(formData))
            }
            else {

                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(editGalleryById(id, formData))
            }
        }

    })
    const { errors, touched, values, isSubmitting, handleSubmit, initialValues, setFieldValue, setSubmitting, resetForm } = formik;

    useEffect(() => {
        if(isCreateSuccess && isCreate) {
            dispatch(resetAddGallery())
            setSubmitting(false);
            resetForm();
            router.push("/admin/gallery");
            toast({
                title: "Created this gallery is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isCreateSuccess, isCreate])

    useEffect(() => {
        if(isUpdateSuccess && !isCreate) {
            setSubmitting(false);

            dispatch(resetEditGallery())
            router.push("/admin/gallery");
            toast({
                title: "Updated this gallery is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isUpdateSuccess, isCreate])

    useEffect(() => {
        if(errorEditGallery && errorEditGallery.length > 0 && !isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorEditGallery,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorEditGallery())
        }
        
    }, [errorEditGallery, isCreate])

    useEffect(() => {
        if(errorAddGallery && errorAddGallery.length > 0 && isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorAddGallery,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorAddGallery())
        }
        
    }, [errorAddGallery, isCreate])
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                <Box display='flex' >
                    <Box borderRadius='16px' bg='white' p={'80px'} overflow='hidden' flex='1'>
                        <Box color='black' bg='white'>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <FastField
                                    label={'Title'}
                                    name="title"
                                    type='text'
                                    component={InputField}
                                />     
                                <FastField
                                    label={'Section Type'}
                                    name="sectionType"
                                    type='text'
                                    component={InputField}
                                /> 
                                           
                            </Box>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <Field
                                    label={'Song'}
                                    name="songs"
                                    type='text'
                                    mode='multiple'
                                    showSearch={true}
                                    setFieldValue={setFieldValue}
                                    options={listIdSongs}
                                    component={SelectField}
                                />   
                                 
                            </Box>
                            <Box display='flex' mt='35px' justifyContent='space-between' alignItems='center' width={'30%'}>
                                <Box display='flex' fontSize='14px' flexDirection='column' gridGap='4px' justifyContent='center'>
                                    <Box color='black' fontWeight='600'>Banned</Box>
                                    <Box color='rgb(99, 115, 129)' fontWeight='400'>Apply disable gallery</Box>
                                </Box>
                                <Switch defaultChecked={!values.status} onChange={( value) => {
                                    setFieldValue("status", !value);
                                }}/>   
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

export default CreateGalleryForm