import React from 'react';
import "../Home/Home.scss"
import DeleteIcon from '@mui/icons-material/Delete';
import EditModal from '../Modals/EditModal';
import { useDispatch} from 'react-redux';
import { deleteTodo, } from '../../redux/TodoSlice';
const TodoItem = ({ item }) => {
    const dispatch = useDispatch()
    
    return (
        <div className='item_container'>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <div className='item_icons'>
                <EditModal item={item} />
                <DeleteIcon className='delete_icon' onClick={() => dispatch(deleteTodo(item.id))} />
            </div>
        </div>
    );
};

export default TodoItem;