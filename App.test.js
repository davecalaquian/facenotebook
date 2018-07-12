import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import App from './App';

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(
    <PaperProvider>
      <App />
    </PaperProvider>
  ).toJSON();
  expect(rendered).toBeTruthy();
});
