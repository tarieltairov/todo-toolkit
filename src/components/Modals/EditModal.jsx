import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoForEdit, postEdit } from '../../redux/TodoSlice';
import { Button, TextField } from '@mui/material';

const EditModal = ({ item }) => {

    const dispatch = useDispatch()
    const edit = useSelector(state => state.todo.edit)
    const [open, setOpen] = useState(false);

    const handleOpen = () => (
        dispatch(getTodoForEdit(item.id)),
        setOpen(true)
    )

    const handleClose = () => setOpen(false);

    const [edited, setEdited] = useState({
        title: "",
        author: ""
    })

    useEffect(() => {
        setEdited(edit)
    }, [edit])

    function handleValues(e) {
        let values = {
            ...edited,
            [e.target.name]: e.target.value,
        };
        setEdited(values);
    }

    function checkValues() {
        if (!edited.title || !edited.author) {
            alert("Complete to fields!");
            return;
        } else {
            dispatch(postEdit( edited))
            handleClose();
        }
    }

    return (
        <div>
            <EditIcon onClick={handleOpen} className='edit_icon' />

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal">
                    <Typography id="modal-modal-title" variant="h6" component="h2" >
                        Editing todo
                    </Typography>
                    <form className="modal_inner"
                        onSubmit={checkValues}
                    >
                        <TextField name="title" label="title" variant="standard" onChange={handleValues}
                            value={edited.title} />
                        <TextField name="author" label="author" variant="standard" onChange={handleValues}
                            value={edited.author} />
                        <div className='modal_buttons'>
                            <Button variant="text" onClick={handleClose}>Close</Button>
                            <Button variant="text" type="submit">Save</Button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default EditModal;