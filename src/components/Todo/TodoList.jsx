import React, { useEffect } from 'react';
import TodoItem from './TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodo } from '../../redux/TodoSlice';
import "../Home/Home.scss"

const TodoList = () => {
    const dispatch = useDispatch()
    const todo = useSelector(state => state.todo.todos)
    useEffect(() => {
        dispatch(getTodo())
    },[])

    return (
        <div className='list_container'>
            {todo.map(item => (
                <TodoItem item={item} key={item.id} />
            ))}
        </div>
    );
};

export default TodoList;