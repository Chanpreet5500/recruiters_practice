import React,{useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { useStoreActions } from 'easy-peasy';
function Verify(props) {
    const history =  useHistory();

    const verifyUser = useStoreActions((actions) => actions.authentication.verifyUser);

    useEffect(() => {
        const init = async() =>{
            let token = props.match.params.token;
            let formData = { token }
            let response = await verifyUser(formData);
            history.push('/login');
        }
        init();
    }, [])
    return (
    <React.Fragment>
        
    </React.Fragment>
    )
}

export default Verify
