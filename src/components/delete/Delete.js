import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { addNewCategory } from '../../api/assetstore';
import { error, success } from '../../App';

export default function AddProd({ deleteFunction, close }) {

    const data = useSelector((state) => state.categoryReducer.categoryData);
    const switcher = useSelector((state) => state.categoryReducer.switch)
    const dispatch = useDispatch();


    const handleSubmit = (data) => {
        if (false) {
            addNewCategory().then((res) => {
                success(`Successfully, ${switcher.added ? 'added' : 'updated'} new banner.`);
            }).catch((err) => {
                error();
            });
        }
    }

    return (
        <div>
            <div id="addNewUserForm">
                <p id="delete-modal-heading">Are you sure you want to delete?</p>
                <Button id="cancelDeleteButton" variant="contained" onClick={() => close()}>Cancel</Button>
                <Button id="yesDeleteButton" variant="contained" onClick={() => deleteFunction()}>Yes</Button>
            </div>
        </div >
    );
}