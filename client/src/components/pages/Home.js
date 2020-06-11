import React, {useEffect, useContext} from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/contactFilter';
import AuthContext from '../../contexts/auth/AuthContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser();
    }, [])
    return (
        <div className="grid-2">
            <div>
        <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contacts />
            </div>
        </div>
    )
}

export default Home