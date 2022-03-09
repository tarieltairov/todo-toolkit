import React from 'react';
import CreateModal from '../Modals/CreateModal';
import TodoList from '../Todo/TodoList';
import "./Home.scss"

const Home = () => {

    return (
        <div className='home_container'>
            <div className='inner'>
                <h1>Todo list</h1>
                <CreateModal />
            </div>
            <TodoList />
        </div>
    );
};

export default Home;