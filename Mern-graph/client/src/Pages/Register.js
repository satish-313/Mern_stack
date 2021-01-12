import React, { useContext, useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// local import
import {useForm} from '../utils/Hooks'

// context
import {AuthContext} from '../context/auth'

function Register(props) {
  const context = useContext(AuthContext)

  const [errors, setErrors] = useState({})

  const {onChange,onSubmit,values} = useForm(registerUser, {username: '', email: '' , password: '' , confirmPassword: ''})

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, {data: {register: userdata}}) {
      context.login(userdata)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function registerUser(){
    addUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input label="username" type="text" placeholder="username" name="username" error={errors.username ? true : false} value={values.username} onChange={onChange} />
        <Form.Input label="email" type="email" placeholder="email" name="email" error={errors.email ? true : false} value={values.email} onChange={onChange} />
        <Form.Input label="password" type="password" placeholder="password" name="password" error={errors.password ? true : false} value={values.password} onChange={onChange} />
        <Form.Input label="confirmPassword" type="password" placeholder="confirmPassword" name="confirmPassword" error={errors.confirmPassword ? true : false} value={values.confirmPassword} onChange={onChange} />
        <Button type="submit" primary>Sign Up</Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  )
  {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword:$confirmPassword
      }
    ){
      id email username createdAt token
    }
  }
`

export default Register;
