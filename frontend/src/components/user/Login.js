import {Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, login } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
 export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { loading, error, isAuthenticated } = useSelector(state => state.authState)
    const redirect = location.search?'/'+location.search.split('=')[1]:'/';

    const  submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            navigate(redirect)
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearAuthError) }
            })
            return
        }
    },[error, isAuthenticated, dispatch, navigate])

    return (
        <Fragment>
  <MetaData title={`Login`} />
  <div className="row wrapper justify-content-center">
    <div className="col-12 col-md-8 col-lg-5 login-container">
      <form onSubmit={submitHandler} className="login-form shadow-lg p-4 rounded">
        <h2 className="text-center mb-4">Login</h2>
        <div className="form-group">
          <label htmlFor="email_field">Email</label>
          <input
            type="email"
            id="email_field"
            className="form-control rounded-pill"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group mt-3">
          <label htmlFor="password_field">Password</label>
          <input
            type="password"
            id="password_field"
            className="form-control rounded-pill"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link to="/password/forgot" className="d-block text-right mb-3 small">
          Forgot Password?
        </Link>

        <button
          id="login_button"
          type="submit"
          className="btn btn-primary btn-block py-2 rounded-pill"
          disabled={loading}
        >
          LOGIN
        </button>

        <div className="text-center mt-3">
          <Link to="/register" className="text-secondary">
            New User? Register Here
          </Link>
        </div>
      </form>
    </div>
  </div>
</Fragment>

    )
}