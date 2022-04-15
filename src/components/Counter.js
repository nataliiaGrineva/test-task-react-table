import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { add, subtract } from '../store/actions';

const Counter = () => {

    const dispatch = useDispatch();
    const count = useSelector(state => state.count);

    const handleAdd = () => {
        dispatch(add());
    };

    const handleSubtract = () => {
        dispatch(subtract());
    };

    return (
        <div>
            <p>counter: {count}</p>
            <button onClick={handleAdd}>ADD</button>
            <button onClick={handleSubtract}>SUBTRACT</button>
        </div>
    );
};

export default Counter;
