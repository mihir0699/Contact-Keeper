import React, {useContext} from 'react'
import AlertContext from '../../contexts/alerts/AlertContext'
const Alerts = () => {

    const alertContext = useContext(AlertContext);
    return (
        alertContext.alerts.map(alert => (
            <div key={alert.id} className={`alert alert-${alert.type}`}>
              <i className='fas fa-info-circle' /> {alert.msg}
            </div>
    )
        )
    )
}

export default Alerts
