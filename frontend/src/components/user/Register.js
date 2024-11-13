import {useEffect, useState} from 'react';
import {useDispatch, useSelector } from 'react-redux'
import { register, clearAuthError } from '../../actions/userActions'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/default_avatar.png");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isAuthenticated } = useSelector(state => state.authState)

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
           const reader = new FileReader();
           reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(e.target.files[0])
                }
           }


           reader.readAsDataURL(e.target.files[0])
        }else{
            setUserData({...userData, [e.target.name]:e.target.value })
        }
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', userData.name)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('avatar', avatar);
        dispatch(register(formData))
    }

    useEffect(()=>{
        if(isAuthenticated) {
            navigate('/');
            return
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
        <div className="row wrapper justify-content-center">
  <div className="col-12 col-md-8 col-lg-5 register-container">
    <form onSubmit={submitHandler} className="register-form shadow-lg p-4 rounded" encType="multipart/form-data">
      <h2 className="text-center mb-4">Register</h2>

      <div className="form-group">
        <label htmlFor="name_field">Name</label>
        <input
          name="name"
          onChange={onChange}
          type="text"
          id="name_field"
          className="form-control rounded-pill"
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="email_field">Email</label>
        <input
          type="email"
          id="email_field"
          name="email"
          onChange={onChange}
          className="form-control rounded-pill"
        />
      </div>

      <div className="form-group mt-3">
        <label htmlFor="password_field">Password</label>
        <input
          name="password"
          onChange={onChange}
          type="password"
          id="password_field"
          className="form-control rounded-pill"
        />
      </div>

      <div className="form-group mt-4">
        <label htmlFor="avatar_upload">Avatar</label>
        <div className="d-flex align-items-center">
          <figure className="avatar mr-3">
            <img
              src={avatarPreview}
              className="rounded-circle avatar-preview"
              alt="Avatar"
            />
          </figure>
          <div className="custom-file">
            <input
              type="file"
              name="avatar"
              onChange={onChange}
              className="custom-file-input"
              id="customFile"
            />
            <label className="custom-file-label" htmlFor="customFile">
              Choose Avatar
            </label>
          </div>
        </div>
      </div>

      <button
        id="register_button"
        type="submit"
        className="btn btn-primary btn-block py-2 rounded-pill mt-4"
        disabled={loading}
      >
        REGISTER
      </button>
    </form>
  </div>
</div>
    )
}