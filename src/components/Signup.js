import {useState,useEffect, useRef} from 'react';
import validator from 'validator';
import axios from 'axios';
import '../Signup.css';
import {useDispatch} from 'react-redux';
import addUserData from '../redux/actions/addUserData';

const Signup = (props) => {

    const dispatch = useDispatch();

    const isInitialMountEmail = useRef(false);
    const isInitialMountPassword = useRef(false);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isValidEmail,setValidEmail] = useState(true);
    const [isPasswordEmpty,setPasswordEmpty] = useState(false);
    const [userDetails,setUserDetails] = useState([]);
    const [isUserValid,setUserValid] = useState(true);

    const validateEmailData = () => {
        let emailValidFlag = validator.isEmail(email) ? true : false;

        setValidEmail(emailValidFlag);
    }

    const validatePasswordData = () => {
        if(password === ''){
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        if(email !== '' && password !== ''){
            axios.get('http://18.179.112.126:3000/users')
            .then((response) => {
                let loginUserData = response.data.filter((user) => {
                    return user.email === email && user.password === password;
                });
                if(loginUserData.length !== 0){
                    setUserDetails(loginUserData);
                    dispatch(addUserData(loginUserData[0]));
                } else {
                    setUserDetails([null]);
                }
            });
        } else {
            validateEmailData();
            validatePasswordData();
        }

    }

    useEffect(() => {
        if(userDetails.length !== 0 && userDetails[0] !== null){
            props.handleLogin();
        } else if(userDetails[0] === null){
            setUserValid(false);
        }
    },[userDetails]);

    useEffect(() => {
        if(isInitialMountEmail.current){
            validateEmailData();
        } else {
            isInitialMountEmail.current = true;
        }
    },[email]);

    useEffect(() => {
        if(isInitialMountPassword.current){
            validatePasswordData();
        } else {
            isInitialMountPassword.current = true;
        }
    },[password]);

    return (
        <div className="signupContainer">
            <div className="signupImageContainer">
                <img src='https://www.medianama.com/wp-content/uploads/2022/06/ales-nesetril-ex_p4AaBxbs-unsplash.jpg' alt='logo' />
            </div>
            <div className="signupDetailsContainer">
                <h1>CARD91</h1>
                <div className="signupFormContainer">
                    <h3>LOGIN</h3>
                    {!isUserValid && <small className='errorMessage'>Email or password incorrect</small>}
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div className="form-floating mb-4">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" value={email} onChange={(event) => {
                                setEmail(event.target.value);
                            }}/>
                                {isValidEmail && <label htmlFor="floatingInput">Email address</label>}
                                {!isValidEmail && <label htmlFor="floatingInput" className='errorMessage'>Enter valid email address</label>}
                        </div>
                        <div className="form-floating mb-5">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" value={password} onChange={(event) => {
                                setPassword(event.target.value);
                            }}/>
                               {!isPasswordEmpty && <label htmlFor="floatingPassword">Password</label>}
                               {isPasswordEmpty && <label htmlFor="floatingPassword" className='errorMessage'>Password cannot be empty</label>}
                        </div>
                        <button type="submit" className="btn">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;