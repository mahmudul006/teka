import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginProps {
  isAuthenticated: boolean;
  onLogin: (userData: LoginFormData) => Promise<void> | void;
}

const Login = ({ isAuthenticated, onLogin }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      // Call the login function
      await onLogin(data);

      // Reset form on successful login
      reset();
    } catch (error) {
      setLoginError(
        error instanceof Error
          ? error.message
          : 'Login failed. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginTop: '0.25rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
    transition: 'border-color 0.2s',
  };

  const errorInputStyle = {
    ...inputStyle,
    borderColor: '#dc3545',
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: isValid && !isLoading ? '#007bff' : '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: isValid && !isLoading ? 'pointer' : 'not-allowed',
    fontSize: '1rem',
    fontWeight: 'bold',
    transition: 'background-color 0.2s',
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: '400px',
        margin: '2rem auto',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        borderRadius: '8px',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: '#333' }}>
        Welcome Back
      </h2>

      {loginError && (
        <div
          style={{
            padding: '0.75rem',
            marginBottom: '1rem',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
          }}
        >
          {loginError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
            }}
          >
            Username *
          </label>
          <input
            type='text'
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters',
              },
            })}
            style={errors.username ? errorInputStyle : inputStyle}
            placeholder='Enter your username'
            disabled={isLoading}
          />
          {errors.username && (
            <span
              style={{
                color: '#dc3545',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
              }}
            >
              {errors.username.message}
            </span>
          )}
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label
            style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontWeight: 'bold',
            }}
          >
            Password *
          </label>
          <input
            type='password'
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            style={errors.password ? errorInputStyle : inputStyle}
            placeholder='Enter your password'
            disabled={isLoading}
          />
          {errors.password && (
            <span
              style={{
                color: '#dc3545',
                fontSize: '0.875rem',
                marginTop: '0.25rem',
              }}
            >
              {errors.password.message}
            </span>
          )}
        </div>

        <button
          type='submit'
          style={buttonStyle}
          disabled={!isValid || isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <div
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: '#6c757d',
        }}
      >
        Demo credentials: username: admin, password: password
      </div>
    </div>
  );
};

export default Login;
