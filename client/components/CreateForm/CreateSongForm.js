import React, { useState, useEffect} from 'react'
import { Box} from '@chakra-ui/layout';
import { useFormik, FormikProvider, Form, FastField, Field } from 'formik';
import * as Yup from 'yup';
import InputField from '../CustomInput/InputField';
import SelectField from '../CustomInput/SelectField';
import { Button } from '@chakra-ui/button';
import TextAreaField from '../CustomInput/TextAreaField';
import Dropzone from 'react-dropzone'
import { Image } from '@chakra-ui/image';
import { AiFillCamera } from 'react-icons/ai'
import { Switch } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { addSong, 
        getSongById, 
        resetAddSong, 
        editSongById, 
        resetErrorGetSong, 
        resetErrorEditSong, 
        resetEditSong, 
        resetErrorAddSong,
        getListIdArtist, 
        getListIdCategory
} from '../../store/actions';




const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
const SUPPORTED_FORMATS_FILE = [
    "audio/mpeg"
];
function CreateSongForm(props) {
    const {id, isCreate} = props;
    const toast = useToast();
    const router = useRouter();
    const dispatch = useDispatch()
    const isCreateSuccess =  useSelector(state => state.song.isCreateSuccess)
    const listIdArtists =  useSelector(state => state.artist.listIdArtists)
    const listIdCategory =  useSelector(state => state.category.listIdCategory)

    const isUpdateSuccess =  useSelector(state => state.song.isUpdateSuccess)

    const infoSong = useSelector(state => state.song.infoSong)
    const errorGetSong = useSelector(state => state.song.errorGetSong)
    const errorEditSong = useSelector(state => state.song.errorEditSong)
    const errorAddSong = useSelector(state => state.song.errorAddSong)


    const [avatarImg, setAvatarImg] = useState("")


    useEffect(() => {
        if(id !== undefined) {
            dispatch(getSongById(id))
        }
    }, [dispatch, id])


    useEffect(() => {
        dispatch(getListIdCategory())
        dispatch(getListIdArtist())             
    }, [dispatch])

    useEffect(() => {
        if(errorGetSong && errorGetSong.length > 0) {
             toast({
                 title: errorGetSong,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorGetSong());

        }
     }, [errorGetSong])

    const CreateSchema = Yup.object().shape({
        name: Yup.string().required('Name song is required'),
        artist: Yup.array().required('Artist is required'),
        introduction: Yup.string().required('Introduction is required'),
        categories: Yup.array().required('Categories is required'),
        file: Yup.mixed().required('File mp3 is required')
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS_FILE.includes(value.type)
        ),
        photo: Yup.mixed().required('Photo avatar is required')
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        )
    });
    const EditSchema = Yup.object().shape({
        name: Yup.string(),
        artist: Yup.array(),
        introduction: Yup.string(),
        categories: Yup.array(),
        file: Yup.mixed()
        .test(
            "fileFormat",
            "Unsupported Format",
            value => (value && SUPPORTED_FORMATS_FILE.includes(value.type)) || value === infoSong.url
        ),
        photo: Yup.mixed()
        .test(
            "fileFormat",
            "Unsupported Format",
            value => (value && SUPPORTED_FORMATS.includes(value.type)) || value === infoSong.photo
        )
    });
    
    
  
    const formik = useFormik({
        initialValues: {
            name: !isCreate && infoSong.name ? infoSong.name : '',
            artist: !isCreate && infoSong.artists ? infoSong.artists.map(i => i.id) : [],
            introduction:!isCreate && infoSong.introduction ? infoSong.introduction : '',
            categories: !isCreate && infoSong.categories ? infoSong.categories.map(i => i.id) : [],
            file:! isCreate && infoSong.url ? infoSong.url : null,
            photo: !isCreate &&infoSong.photo ? infoSong.photo : null,
            status:!isCreate && infoSong.enable ? infoSong.enable : true
        },    
        enableReinitialize: true,
        validationSchema: isCreate ? CreateSchema : EditSchema,
        onSubmit:  (values, { setErrors, setSubmitting, resetForm }) => {
            const formData = new FormData();
            if(isCreate) {
                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(addSong(formData))
            }
            else {
                

                for (let property in values) {
                    if(property === "photo") {
                        if(values["photo"] !== infoSong.photo) {
                            formData.append(property,values[property]);
                        }
                    
                    }
                    else if(property === "file") {
                        if(values["file"] !== infoSong.url) {
                            formData.append(property,values[property]);
                        }
                    }
                    else {
                        formData.append(property,values[property]);
                    }
                }
                dispatch(editSongById(id, formData))
            }
        }

    })
    const { errors, touched, values, isSubmitting, handleSubmit, initialValues, setFieldValue, setSubmitting, resetForm } = formik;
    console.log(values)
    useEffect(() => {
        if(isCreateSuccess && isCreate) {
            dispatch(resetAddSong())
            setSubmitting(false);
            resetForm();
            router.push("/admin/song");
            toast({
                title: "Created this song is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isCreateSuccess, isCreate])

    useEffect(() => {
        if(isUpdateSuccess && !isCreate) {
            setSubmitting(false);

            dispatch(resetEditSong())
            router.push("/admin/song");
            toast({
                title: "Updated this song is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isUpdateSuccess, isCreate])

    useEffect(() => {
        if(errorEditSong && errorEditSong.length > 0 && !isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorEditSong,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorEditSong())
        }
        
    }, [errorEditSong, isCreate])

    useEffect(() => {
        if(errorAddSong && errorAddSong.length > 0 && isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorAddSong,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            setAvatarImg("");
            dispatch(resetErrorAddSong())
        }
        
    }, [errorAddSong, isCreate])

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                <Box display='flex' gridGap='24px' >
                    <Box w='calc(100% * 1/3)' borderRadius='16px' bg='white' p='24px'>
                        <Box w='144px' h='144px' m='auto' borderRadius='50%' p='8px' border='1px dashed rgba(145, 158, 171, 0.32)' >
                            <Box w='100%' h='100%' overflow='hidden' borderRadius='50%' pos='relative' cursor='pointer'>
                                <Image objectFit='cover' src={!avatarImg && infoSong.photo && !isCreate ? infoSong.photo  : avatarImg} w='100%' h='100%'/>
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
                    <Box w='calc(100% * 2/3)' borderRadius='16px' bg='white' overflow='hidden'>
                        <Box p='24px' color='black' bg='white'>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <FastField
                                    label={'Name Song'}
                                    name="name"
                                    type='text'
                                    component={InputField}
                                />      
                                <Field
                                    label={'Artist'}
                                    name="artist"
                                    type='text'
                                    mode='multiple'
                                    showSearch={true}
                                    setFieldValue={setFieldValue}
                                    options={listIdArtists}
                                    component={SelectField}
                                />              
                            </Box>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <FastField
                                    label={'Introduction'}
                                    name="introduction"
                                    autoSize={{ minRows: 6, maxRows: 7 }}
                                    component={TextAreaField}
                                />
                            </Box>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <Field
                                    label={'Categories'}
                                    name="categories"
                                    type='text'
                                    mode='multiple'
                                    showSearch={true}
                                    setFieldValue={setFieldValue}
                                    options={listIdCategory}
                                    component={SelectField}
                                />
                            </Box>
                            {
                                values.file  && values.file.name ? <div>{values.file.name.toString()}</div> : null
                            }
                            <Dropzone accept="audio/*" onDrop={(acceptedFiles) => {
                                acceptedFiles.forEach((file) => {
                                    const reader = new FileReader()
                            
                                    reader.onload = () => {
                                    if(reader.readyState === 2){ //is done
                                        setFieldValue('file', file)
                                    }
                                    }                            
                                    reader.readAsDataURL(file)
                                })
                            }} multiple={false}>
                                {({getRootProps, getInputProps}) => (
                                    <Box 
                                        p='40px 8px' 
                                        bg='#F4F6F8' 
                                        border='1px dashed #919eab52' 
                                        cursor='pointer' 
                                        borderRadius='8px' 
                                        _hover={{opacity: 0.72}}
                                        {...getRootProps()} 
                                    >
                                        <input type="file" accept="audio/*" name="file" {...getInputProps()}/>
                                        <Box display={`display: ${values.file  ? "none" : "flex"}`} justifyContent='center' alignItems='center'>
                                            <Box p='24px'>
                                                <Box textAlign='center' fontSize='20px' mb='8px' fontWeight='700' color='#212B36'>Drop or Select file</Box>
                                                <Box textAlign='center' fontWeight='400' color='#637381' fontSize='14px'>Drop file here or click browse thorough your machine</Box>
                                            </Box>
                                        </Box>
                                    </Box>
                                )}
                            </Dropzone>
                            <Box fontSize='14px' color='#ff4d4f' textAlign='center' mt='18px' mb='10px'>{ touched.file && errors.file ? errors.file : ''}</Box>

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

export default CreateSongForm