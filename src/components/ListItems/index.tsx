import React, {FC} from 'react';
import List from '@mui/material/List';
import Item from "../Item";
import {TodoItem} from "../../store/slices/todo";


interface ListItemsProps {
    data: any
}

const ListItems: FC<ListItemsProps> = ({data}) => {
    return (
        <List sx={{width: '100%', maxWidth: 400, minHeight: 300, bgcolor: 'background.paper'}}>
            {data?.map((value: TodoItem) =>
                <Item key={value.id} data={value}/>
            )}
        </List>
    );
};

export default ListItems;