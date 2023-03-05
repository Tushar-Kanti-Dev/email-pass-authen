import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from "react";

const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [validated, setValidated] = useState(false);

  const handelEmail = (event) =>{
    setEmail(event.target.value)
  }
  const handelPassword = (event) =>{
    setPassword(event.target.value)
  }

  const handelFormSubmit = event =>{
    
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if(!/(?=.*[!#$%&? "])/.test(password)){
      setError('Need have a special charatcure');
      return;
    }
    setValidated(true);
    setError('')

    createUserWithEmailAndPassword(auth, email, password)
    .then((result)=>{
      const user = result.user;
      console.log(user)
    })
    .catch(error =>{
      console.error(error)
    })
    event.preventDefault();
  }

  return (
    <div>
      <div className="registation-form w-50 mx-auto mt-3">
        <h3 className="text-primary">Registration Form</h3>
      <Form noValidate validated={validated} onSubmit={handelFormSubmit}>
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
      <p className="text-danger">{error}</p>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
      
    </div>
  );
}

export default App;
