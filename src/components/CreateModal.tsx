import React, {FC} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {addTodo} from "../store/slices/todo";
import {useAppDispatch} from "../store/store";

interface CreateModalProps {
    open: boolean;
    handleClose: () => void;
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

const CreateModal: FC<CreateModalProps> = ({open, handleClose}) => {
    const [todo, setTodo] = React.useState({title: "", description: ""});
    const dispatch = useAppDispatch();

    const createTodo = () => {
        const newTodo = {
            ...todo,
            check: false,
            id: Date.now()
        };
        dispatch(addTodo(newTodo));
        setTodo({title: "", description: ""});
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="modal" component="form">
                <Typography>Добавить новую задачу</Typography>
                <TextField
                    id="outlined-basic"
                    label="Задача"
                    variant="outlined"
                    onChange={(e) => setTodo({...todo, title: e.target.value})}
                />
                <TextField
                    id="outlined-basic"
                    label="Описание"
                    variant="outlined"
                    onChange={(e) => setTodo({...todo, description: e.target.value})}
                />
                <Button
                    variant="contained"
                    className="home-btn"
                    onClick={createTodo}
                >
                    Добавить задачу</Button>
            </Box>
        </Modal>
    );
};

export default CreateModal;