import React from 'react';
import App from './App';
import { Provider as PaperProvider } from 'react-native-paper';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
  <PaperProvider>
    <App />
  </PaperProvider>).toJSON();
  expect(rendered).toBeTruthy();
});
