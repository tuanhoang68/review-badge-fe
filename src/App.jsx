import React from 'react';
import {AppProvider} from '@shopify/polaris';
import ReviewBadge from './components/ReviewBadge.jsx';
import '@shopify/polaris/build/esm/styles.css';

export default function App() {
  return (
    <AppProvider i18n={{}}>
      <ReviewBadge />
    </AppProvider>
  );
}
