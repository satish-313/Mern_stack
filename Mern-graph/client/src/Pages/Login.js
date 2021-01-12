import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

// local import
import { useForm } from '../utils/Hooks'

function Login(props) {
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, { username: '', password: '' })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }

  return (
    <div className="form-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input label="username" type="text" placeholder="username" name="username" error={errors.username ? true : false} value={values.username} onChange={onChange} />
        <Form.Input label="password" type="password" placeholder="password" name="password" error={errors.password ? true : false} value={values.password} onChange={onChange} />
        <Button type="submit" primary>Login</Button>
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

const LOGIN_USER = gql`
  mutation register(
    $username: String!
    $password: String!
  )
  {
    login(
      username: $username
      password: $password
    ){
      id email username createdAt token
    }
  }
`

export default Login;
