import React , {useState, useContext, useEffect} from 'react'
import AlertContext from '../../contexts/alerts/AlertContext';
import AuthContext from '../../contexts/auth/AuthContext';

const Login = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const {login , error, clearErrors ,isAuthenticated} = authContext;

  useEffect(()=>{
    if(isAuthenticated)
    {
      props.history.push('/');
    }
    if(error==='Invalid Credentials')
    setAlert(error, 'danger');
    clearErrors();
  }, [error , isAuthenticated, props.history]);

  const {setAlert} = alertContext;
    const [user, setUser] = useState({
        email: '',
        password :''
    })

    const {name, email, password, password2} = user;
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = (e)=>{
        e.preventDefault();
        if(email===''|| password ==='')
        setAlert('Please fill all fields', 'danger');
        else{
          login({
            email, password
          })
        }
    }
    return (
        <div className="form-container">
            <h1>
                 <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
       
        <div className='form-group'>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            name='email'
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
       
        <input
          type='submit'
          value='Login'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>

    )
}

export default Login
