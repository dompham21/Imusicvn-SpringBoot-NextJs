import React, { useState, useEffect} from 'react'
import { Box} from '@chakra-ui/layout';
import { useFormik, FormikProvider, Form, FastField } from 'formik';
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
import Moment from 'moment'
import { 
    addArtist, 
    editArtistById, 
    getArtistById, 
    resetAddArtist, 
    resetEditArtist, 
    resetErrorAddArtist, 
    resetErrorEditArtist, 
    resetErrorGetArtist 
} from '../../store/actions';

const optionsGender = [
    { id: 'nam', name: 'Nam' },
    { id: 'nu', name: 'Nu' },
]

const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];

function CreateArtistForm(props) {
    const {id, isCreate} = props;
    const toast = useToast();
    const router = useRouter();
    const dispatch = useDispatch()
    const isCreateSuccess =  useSelector(state => state.artist.isCreateSuccess)
    const isUpdateSuccess =  useSelector(state => state.artist.isUpdateSuccess)

    const infoArtist = useSelector(state => state.artist.infoArtist)
    const errorGetArtist = useSelector(state => state.artist.errorGetArtist)
    const errorEditArtist = useSelector(state => state.artist.errorEditArtist)
    const errorAddArtist = useSelector(state => state.artist.errorAddArtist)


    const [avatarImg, setAvatarImg] = useState("")

    useEffect(() => {
        if(id !== undefined) {
            dispatch(getArtistById(id))
        }
    }, [dispatch, id])

    useEffect(() => {
        if(errorGetArtist && errorGetArtist.length > 0) {
             toast({
                 title: errorGetArtist,
                 position: "top-right",
                 status: "error",
                 isClosable: true,
             })
             dispatch(resetErrorGetArtist());

        }
     }, [errorGetArtist])

    const CreateSchema = Yup.object().shape({
        name: Yup.string().required('Name song is required'),
        realName: Yup.string().required('Artist is required'),
        introduction: Yup.string().required('Introduction is required'),
        nation: Yup.string().required('Categoires is required'),
        birthday: Yup.date()
            .transform((value, originalValue) => {
                value = Moment(originalValue, "DD/MM/YYYY");
                return value.isValid() ? value.toDate() : new Date('');
            })
            .max(new Date(), "Birthday must be less than today!")
            .typeError("Birthday must be a date type(ex: dd/mm/yyyy)"),
        photo: Yup.mixed().required('Photo avatar is required')
            .test(
                "fileFormat",
                "Unsupported Format",
                value => value && SUPPORTED_FORMATS.includes(value.type)
            )
    });
    const EditSchema = Yup.object().shape({
        name: Yup.string(),
        realName: Yup.string(),
        introduction: Yup.string(),
        nation: Yup.string(),
        birthday: Yup.date()
            .transform((value, originalValue) => {
                value = Moment(originalValue, "DD/MM/YYYY");
                return value.isValid() ? value.toDate() : new Date('');
            })
            .max(new Date(), "Birthday must be less than today!")
            .typeError("Birthday must be a date type(ex: dd/mm/yyyy)"),
        photo: Yup.mixed()
            .test(
                "fileFormat",
                "Unsupported Format",
                value => (value && SUPPORTED_FORMATS.includes(value.type)) || value === infoArtist.photo
            )
    });
    
    
  
    const formik = useFormik({
        initialValues: {
            name: !isCreate && infoArtist.name ? infoArtist.name : '',
            realName: !isCreate && infoArtist.realName ? infoArtist.realName : '',
            introduction:!isCreate && infoArtist.introduction ? infoArtist.introduction : '',
            birthday: !isCreate && infoArtist.birthday ? infoArtist.birthday : '',
            nation: !isCreate && infoArtist.nation ? infoArtist.nation : '',
            photo: !isCreate &&infoArtist.photo ? infoArtist.photo : null,
            status:!isCreate && infoArtist.enable ? infoArtist.enable : true
        },    
        enableReinitialize: true,
        validationSchema: isCreate ? CreateSchema : EditSchema,
        onSubmit:  (values, { setErrors, setSubmitting, resetForm }) => {
            const formData = new FormData();
            if(isCreate) {
                for (let property in values) {
                    formData.append(property,values[property]);
                }
                dispatch(addArtist(formData))
            }
            else {

                for (let property in values) {
                    if(property === "photo") {
                        if(values["photo"] !== infoArtist.photo) {
                            formData.append(property,values[property]);
                        }
                    }
                    else {
                        formData.append(property,values[property]);
                    }
                }
                dispatch(editArtistById(id, formData))
            }
        }

    })
    const { errors, touched, values, isSubmitting, handleSubmit, initialValues, setFieldValue, setSubmitting, resetForm } = formik;

    useEffect(() => {
        if(isCreateSuccess && isCreate) {
            dispatch(resetAddArtist())
            setSubmitting(false);
            resetForm();
            router.push("/admin/artist");
            toast({
                title: "Created this artist is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isCreateSuccess, isCreate])

    useEffect(() => {
        if(isUpdateSuccess && !isCreate) {
            setSubmitting(false);
            dispatch(resetEditArtist())
            router.push("/admin/artist");
            toast({
                title: "Updated this song is successly",
                position: "top-right",
                status: "success",
                isClosable: true,
            })
        }
    }, [isUpdateSuccess, isCreate])

    useEffect(() => {
        if(errorEditArtist && errorEditArtist.length > 0 && !isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorEditArtist,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            dispatch(resetErrorEditArtist())
        }
        
    }, [errorEditArtist, isCreate])

    useEffect(() => {
        if(errorAddArtist && errorAddArtist.length > 0 && isCreate) {
            setSubmitting(false);
            resetForm();
            toast({
                title: errorAddArtist,
                position: "top-right",
                status: "error",
                isClosable: true,
            })
            setAvatarImg("");
            dispatch(resetErrorAddArtist())
        }
        
    }, [errorAddArtist, isCreate])


    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit} encType="multipart/form-data">
                <Box display='flex' gridGap='24px' >
                    <Box w='calc(100% * 1/3)' borderRadius='16px' bg='white' p='24px'>
                        <Box w='144px' h='144px' m='auto' borderRadius='50%' p='8px' border='1px dashed rgba(145, 158, 171, 0.32)' >
                            <Box w='100%' h='100%' overflow='hidden' borderRadius='50%' pos='relative' cursor='pointer'>
                                <Image objectFit='cover' src={!avatarImg && infoArtist.photo && !isCreate ? infoArtist.photo  : avatarImg} w='100%' h='100%'/>
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
                                    label={'Name Artist'}
                                    name="name"
                                    type='text'
                                    component={InputField}
                                />      
                                <FastField
                                    label={'Real Name Artist'}
                                    name="realName"
                                    type='text'
                                    component={InputField}
                                />                 
                            </Box>
                            <Box display='flex' gridGap='16px' mb='10px'>
                                <FastField
                                    label={'Nation'}
                                    name="nation"
                                    type='text'
                                    setFieldValue={setFieldValue}
                                    options={optionsGender}
                                    component={SelectField}
                                />
                                <FastField
                                    label={'Birthday'}
                                    name="birthday"
                                    type='text'
                                    component={InputField}
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

export default CreateArtistForm