import React, { useContext, useRef, useEffect } from 'react';
import ContactContext from '../../contexts/contacts/contactContext'

const ContactFilter = () => {
const contactContext = useContext(ContactContext);
const {filterContacts, clearFilter, filtered} = contactContext;
const text = useRef('');
useEffect(()=>{
    if(filtered===null)
    {
        text.current.value =''
    }
})
const onChange = (e)=>{
    if(text.current.value!== ''){
        filterContacts(e.target.value);
    }
    else{
    clearFilter();
    }
}


    return (
        <div>
            <input ref ={text} placeholder="Filter Contacts..." type= "text" onChange={onChange} />
        </div>
    )
}

export default ContactFilter

