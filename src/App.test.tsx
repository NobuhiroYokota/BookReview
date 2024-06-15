import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { CookiesProvider } from 'react-cookie';

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CookiesProvider>
          <Router>
            <Login />
          </Router>
        </CookiesProvider>
      </Provider>
    );
  });

  it('displays error message when Email and Password are not entered', async () => {
    const submitButton = screen.getByRole('button', { name: /login/i });
    userEvent.click(submitButton);

    const errorMessage = await screen.findByText('Email、Passwordを入力してください。');
    expect(errorMessage).toBeVisible();
  });

  it('does not display error message when Email and Password are entered', async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    userEvent.type(emailInput, 'test@example.com');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    const errorMessage = screen.queryByText('Email、Passwordを入力してください。');
    expect(errorMessage).toBeNull();
  });
});

