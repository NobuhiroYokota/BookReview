import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from './Login';

describe('Login Component', () => {
  it('should display error message when email and password are not provided', () => {
    render(<Login />);
    const button = screen.getByRole('button', { name: /login/i });
    fireEvent.click(button);
    const errorMessage = screen.getByText(/Email、Passwordを入力してください。/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should not display error message when email and password are provided', () => {
    render(<Login />);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const button = screen.getByRole('button', { name: /login/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(button);

    const errorMessage = screen.queryByText(/Email、Passwordを入力してください。/i);
    expect(errorMessage).not.toBeInTheDocument();
  });
});

