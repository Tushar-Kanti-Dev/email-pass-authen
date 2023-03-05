import { getAuth } from "firebase/auth";
import './App.css';
import app from "./firebase.init";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const auth = getAuth(app);

function App() {
  const handelEmail = (event) =>{
    console.log(event.target.value)
  }
  const handelPassword = (event) =>{
    console.log(event.target.value)
  }

  const handelFormSubmit = event =>{
    event.preventDefault();
  }

  return (
    <div>
      <div className="registation-form w-50 mx-auto mt-3">
        <h3 className="text-primary">Registration Form</h3>
      <Form onSubmit={handelFormSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onBlur={handelEmail} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control onBlur={handelPassword} type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
      </div>
      
    </div>
  );
}

export default App;
