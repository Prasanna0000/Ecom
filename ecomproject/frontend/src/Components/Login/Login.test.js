import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LoginUser from './LoginUser';

describe('LoginUser', () => {
  test('should render login form and handle login', async () => {
    render(<LoginUser />);

    // Assert that the login form elements are rendered
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('FORGOT PASSWORD')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

    // Mock API response
    const mockUserData = [
      {
        email: 'prasanna272891@gmail.com',
        password: 'demo',
      },
    ];
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockUserData),
      })
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'prasanna272891@gmail.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'demo' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));

    // Wait for the navigation or any other async actions
    await screen.findByText('Redirecting to card page...');

    // Assert that the login was successful and redirected to the card page
    expect(screen.queryByLabelText('Email')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
    expect(screen.queryByText('FORGOT PASSWORD')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Login' })).not.toBeInTheDocument();
    expect(screen.getByText('Redirecting to card page...')).toBeInTheDocument();

    // Restore the original fetch implementation
    global.fetch.mockRestore();
  });
});
