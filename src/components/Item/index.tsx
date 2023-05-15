import React, {FC} from 'react';
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import UpdateModal from "../UpdateModal";
import {TodoItem, toggleCheck} from "../../store/slices/todo";
import IconButton from '@mui/material/IconButton';
import DehazeIcon from '@mui/icons-material/Dehaze';
import {useAppDispatch} from "../../store/store";

interface ItemProps {
    data: TodoItem
}

const Item: FC<ItemProps> = ({data}) => {
    const [open, setOpen] = React.useState(false);
    const dispatch = useAppDispatch();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <ListItem
                disablePadding
                secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <DehazeIcon onClick={handleOpen}/>
                    </IconButton>
                }
            >
                <ListItemButton
                    role={undefined}

                    dense
                >
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={data.check ? true : false}
                            onClick={() => dispatch(toggleCheck(data))}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{'aria-labelledby': data.id.toString()}}
                        />
                    </ListItemIcon>
                    <ListItemText id={data.id.toString()} primary={data.title} />

                </ListItemButton>
            </ListItem>

            <UpdateModal handleClose={handleClose} open={open} item={data}/>
        </>
    );
};

export default Item;