import React, {FC} from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {Button} from "@mui/material";
import Modal from "@mui/material/Modal";
import {useAppDispatch} from "../store/store";
import {deleteTodo, editTodo, TodoItem} from "../store/slices/todo";
import DeleteIcon from '@mui/icons-material/Delete';

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
    item: TodoItem
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const UpdateModal: FC<CreateModalProps> = ({open, handleClose, item}) => {
    const [value, setValue] = React.useState({title: item.title, description: item.description});
    const dispatch = useAppDispatch();
    const onEdit = () => {
        const newTodo = {...value, id: item.id, check: false}
        dispatch(editTodo(newTodo));
        setValue({title: "", description: ""})
        handleClose()
    }

    const onDelete = () => {
        dispatch(deleteTodo(item.id))
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal" component="form">
                <Typography>Задача</Typography>
                <TextField
                    id="outlined-basic"
                    label="Задача"
                    variant="outlined"
                    value={value.title}
                    onChange={(e) => setValue({...value, title: e.target.value})}
                />
                <TextField
                    id="outlined-basic"
                    label="Описание"
                    variant="outlined"
                    value={value.description}
                    onChange={(e) => setValue({...value, description: e.target.value})}
                />
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onDelete}>
                    Delete
                </Button>
                <Button
                    variant="contained"
                    className="home-btn"
                    onClick={onEdit}
                >
                    Сохранить</Button>
            </Box>
        </Modal>
    );
};

export default UpdateModal;