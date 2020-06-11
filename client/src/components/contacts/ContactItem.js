import React , {useContext}from 'react'
import ContactContext from '../../contexts/contacts/contactContext';
const ContactItem = ({contact}) => {
    const {_id,name, email, phone, type} = contact;
    const contactContext = useContext(ContactContext);
    const {deleteContact ,setCurrent} = contactContext;
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                {name}{' '}
                <span style={{float:'right'}}>
                <span className={
            'badge ' +
            (type === 'Professional' ? 'badge-success' : 'badge-primary')
          }>
                    {type}
                </span>
                </span>
            </h3>
            <div className="List">
                <ul>
                {email && (
          <li>
            <i className='fas fa-envelope-open' /> {email}
          </li>
        )}
         {phone && (
          <li>
            <i className='fas fa-phone' /> {phone}
          </li>
        )}
                </ul>
    <p>
        <button className='btn btn-dark btn-sm' onClick ={()=>contactContext.setCurrent(contact)}>Edit</button>
        <button className='btn btn-danger btn-sm' onClick={() => contactContext.deleteContact(_id)}>Delete</button>
      </p>
            </div>
        </div>
    )
}

export default ContactItem
