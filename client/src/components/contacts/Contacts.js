import React, {Fragment, useContext, useEffect} from 'react';
import ContactContext from '../../contexts/contacts/contactContext';
import ContactItem from './ContactItem';
import {CSSTransition , TransitionGroup} from 'react-transition-group'


const Contacts = () => {
    const contactContext = useContext(ContactContext);
    const {contacts, filtered, getContacts, loading} = contactContext;
    useEffect(()=>{
        getContacts();
    }, [])

    if(contacts.length===0)
    return <h4>Please add a Contact</h4>

    return (
        <div>
            <Fragment>
                <TransitionGroup>
                {filtered!==null?filtered.map
                (contact=>
                   
                    (
                        <CSSTransition key = {contact._id} timeout ={500} classNames="item">
                        <ContactItem contact={contact} />
                        </CSSTransition>
                    )
                    
                    ):(contacts.map(contact=>(
                        <CSSTransition timeout ={500} classNames="item"  key = {contact._id}>
                    <ContactItem contact ={contact}/>
                    </CSSTransition>
                )))}
                </TransitionGroup>
            </Fragment>
            
        </div>
    )
}

export default Contacts
