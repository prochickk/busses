import React from 'react';
import AccountScreen from '../../../app/screens/AccountScreen';


describe('AccountScreen', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<AccountScreen />);
    const container = getByTestId('account-screen-container');
    expect(container).toBeDefined();
  });

  it('displays user information correctly', () => {
    const { getByText } = render(<AccountScreen />);
    const name = getByText('Test User');
    const email = getByText('testuser@example.com');
    expect(name).toBeDefined();
    expect(email).toBeDefined();
  });

  it('navigates to target screen when menu item is pressed', () => {
    const { getByText } = render(<AccountScreen />);
    const menuItem = getByText('العناوين');
    fireEvent.press(menuItem);
    const targetScreen = getByText('Addresses');
    expect(targetScreen).toBeDefined();
  });

  it('calls logOut function when "تسجيل الخروج" button is pressed', () => {
    const { getByText } = render(<AccountScreen />);
    const logOutButton = getByText('تسجيل الخروج');
    fireEvent.press(logOutButton);
    expect(useAuth().logOut).toHaveBeenCalled();
  });
});
