import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [registered, setRegistered] = useState(false)
  
  const handelName = event =>{
    setName(event.target.value)
  }
  const handelEmail = (event) =>{
    setEmail(event.target.value)
  }
  const handelPassword = (event) =>{
    setPassword(event.target.value)
  }

  const handelRegister= event =>{
    setRegistered(event.target.checked);
    console.log('checked');
  }

  

  const handelFormSubmit = event =>{
    console.log('register checked')
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if(!/(?=.*[!#$%&? "])/.test(password)){
      setError('You have need to a special charatcure');
      return;
    }
    setValidated(true);
    setError('')

    if(registered){
      console.log(email, password)
      signInWithEmailAndPassword(auth, email, password)
      .then(result =>{
        const user = result.user;
        console.log(user);
        })
        .catch(error =>{
          setError(error.message)
        })
    }else{
      createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      const user = result.user;
      setEmail('');
    setPassword('');
      console.log(user);
      verifyEmail();
      setUserName();
    })
    .catch(error =>{
      setError(error.message);
      console.log(error);
    })
    }
    event.preventDefault();
  }

  const handelForgetPassword = () =>{
    sendPasswordResetEmail(auth, email)
    .then(()=>{
      console.log('send a mail')
    })
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser,{
      displayName: name
    })
    .then(()=>{
      console.log('update Name')
    })
    .catch(()=>{
      setError(error)
    })
  }

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(() =>{
      console.log('Email verifyed via send mail');
    })
  }
  return (
    <div>
      <div className="registation-form w-50 mx-auto mt-3">
        <h3 className="text-primary">{registered ? 'LogIn':'Registration'} Form</h3>
      <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
      {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control onBlur={handelName} type="text" placeholder="Enter name" required />
        <Form.Text className="text-muted">
          <Form.Control.Feedback type="invalid">
            Please provide a your name.
          </Form.Control.Feedback>
        </Form.Text>
      </Form.Group>}

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handelEmail} type="email" placeholder="Enter email" required />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
          <Form.Control.Feedback type="invalid">
            Please provide a valid Gmail.
          </Form.Control.Feedback>
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handelPassword} type="password" placeholder="Password" required />
        <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>  
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check onChange={handelRegister} type="checkbox" label="Already Registered" />
      </Form.Group>

      <p className="text-danger">{error}</p>
      <Button onClick={handelForgetPassword} variant="link">Forget Password</Button> <br />
      <Button variant="primary" type="submit">
        {registered ? 'LogIn':'Register'}
      </Button>
    </Form>
      </div>
      
    </div>
  );
}

export default App;
