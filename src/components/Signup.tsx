import {useState,useEffect, useRef} from 'react';
import React from 'react';
import validator from 'validator';
import '../Signup.css';
import { addUsers } from '../redux/slices/users';
import {useDispatch} from 'react-redux';
import SignupInput from 'signup-inputbox-tokenisation';
import SignupButton from 'signup-validatebutton-tokenisation';
import {useCreateLoginMutation} from '../redux/services/users';

const Signup = (props:any) => {

    const dispatch = useDispatch();

    const isInitialMountEmail = useRef(false);
    const isInitialMountPassword = useRef(false);
    const isInitialMountLogin = useRef(false);

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [isValidEmail,setValidEmail] = useState(true);
    const [isPasswordEmpty,setPasswordEmpty] = useState(false);
    const [userDetails,setUserDetails] = useState([]);
    const [isUserValid,setUserValid] = useState(true);
    const [createLogin,createLoginResult] = useCreateLoginMutation();

    const validateEmailData = (): void => {
        let emailValidFlag = validator.isEmail(email) ? true : false;

        setValidEmail(emailValidFlag);
    }

    const validatePasswordData = () : void => {
        if(password === ''){
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }
    }

    // console.log(createLoginResult);
    const handleSubmit = (event: { preventDefault: () => void; }): void => {

        event.preventDefault();
        if(email !== '' && password !== ''){
            createLogin({email:email,password:password});
        } else {
            validateEmailData();
            validatePasswordData();
        }

    }

    useEffect(() => {
        if(userDetails.length !== 0 && userDetails[0] !== undefined){
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
        if(isInitialMountLogin.current){
            if(createLoginResult.isSuccess === true){
                setUserDetails(createLoginResult.data.response);
                dispatch(addUsers(createLoginResult.data.response))
            } else if(createLoginResult.isError === true){
                setUserDetails([]);
            }
        } else {
            isInitialMountLogin.current = true;
        }
    },[createLoginResult]);

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
                    <form className="loginForm">
                        <div className="form-floating mb-4">
                            <SignupInput type="email" value={email} setInputValue={(event: { target: { value: React.SetStateAction<string>; }; }) => {
                                setEmail(event.target.value);
                            }}/>
                            {isValidEmail && <label htmlFor="floatingInput">Email address</label>}
                            {!isValidEmail && <label htmlFor="floatingInput" className='errorMessage'>Enter valid email address</label>}
                        </div>
                        <div className="form-floating mb-5">
                            <SignupInput type="password" value={password} setInputValue={(event: { target: { value: React.SetStateAction<string>; }; }) => {
                                setPassword(event.target.value);
                            }}/>
                            {!isPasswordEmpty && <label htmlFor="floatingPassword">Password</label>}
                            {isPasswordEmpty && <label htmlFor="floatingPassword" className='errorMessage'>Password cannot be empty</label>}
                        </div>
                        {/* <button type="button" className="btn" onClick={handleSubmit}>Login</button> */}
                        <SignupButton handleSubmit={handleSubmit} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;