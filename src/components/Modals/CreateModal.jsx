import React, { useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../Home/Home.scss"
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { createTodo } from '../../redux/TodoSlice';
import * as Yup from 'yup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateModal = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            title: "",
            author: ""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            author: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
        }),
        onSubmit: values => {
            dispatch(createTodo(values))
            handleClose()
            formik.resetForm()
        },
    });

    return (
        <div>
            <AddCircleOutlineIcon onClick={handleOpen} className='add_icon' />
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box className="modal" >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Creating a new todo
                    </Typography>
                    <form
                        className="modal_inner"
                        onSubmit={formik.handleSubmit}>
                        <TextField id="title" label="title" variant="standard"
                            {...formik.getFieldProps('title')} />
                        {formik.errors.title && formik.touched.title ? <div style={{ color: 'red' }}>{formik.errors.title}</div> : null}
                        <TextField id="author" label="author" variant="standard"
                            {...formik.getFieldProps('author')} />
                        {formik.errors.author && formik.touched.author ? <div style={{ color: 'red' }}>{formik.errors.author}</div> : null}
                        <div className='modal_buttons'>
                            <Button variant="text" onClick={handleClose}>close</Button>
                            <Button variant="text" type="submit">Create</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default CreateModal;