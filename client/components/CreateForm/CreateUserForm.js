import React from 'react'
import { Box} from '@chakra-ui/layout';
import { useFormik, FormikProvider, Form, FastField } from 'formik';
import * as Yup from 'yup';
import InputField from '../CustomInput/InputField';
import SelectField from '../CustomInput/SelectField';
import { Button } from '@chakra-ui/button';

const optionsGender = [
    { value: 'nam', label: 'Nam' },
    { value: 'nu', label: 'Nu' },
]
const optionsRole= [
    { value: 'admin', label: 'Admin' },
    { value: 'support', label: 'Support' },
]
function CreateUserForm() {
 


    const LoginSchema = Yup.object().shape({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required')
    });
    
    
  
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            remember: false
        },    
        validationSchema: LoginSchema,
        onSubmit:  (values, { setErrors, setSubmitting, resetForm }) => {
            
                   
        }

    })
    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
        <Box p='24px' color='black' bg='white'>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Box display='flex' gridGap='16px'>
                        <FastField
                            label={'First Name'}
                            name="firstName"
                            type='text'
                            component={InputField}
                        />
                        <FastField
                            label={'Last Name'}
                            name="lastName"
                            type='text'
                            component={InputField}
                        />
                    </Box>
                    <Box display='flex' gridGap='16px'>
                        <FastField
                            label={'Phone Number'}
                            name="phone"
                            type='text'
                            component={InputField}
                        />
                        <FastField
                            label={'Email'}
                            name="email"
                            type='email'
                            component={InputField}
                        />
                    </Box>
                    <Box display='flex' gridGap='16px'>
                        <FastField
                            label={'Age'}
                            name="age"
                            type='number'
                            component={InputField}
                        />
                        <FastField
                            
                            label={'Gender'}
                            name="gender"
                            type='text'
                            options={optionsGender}
                            component={SelectField}
                        />
                    </Box>
                    <Box display='flex' gridGap='16px'>
                        <FastField
                            label={'Address'}
                            name="address"
                            type='text'
                            component={InputField}
                        />
                        <FastField
                            label={'Role'}
                            name="role"
                            type='text'
                            options={optionsRole}
                            component={SelectField}
                        />
                    </Box>
                    <Box display='flex' w='100%'  justifyContent='flex-end'>
                        <Button htmlType="submit" loading={isSubmitting} bg={'rgb(255, 48, 48)'} color='white'>
                            Create
                        </Button>
                    </Box>
                   
                </Form>
            </FormikProvider>
        </Box>
    )
}

export default CreateUserForm