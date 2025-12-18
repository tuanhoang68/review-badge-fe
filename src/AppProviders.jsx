import React from 'react';
import {AppProvider as PolarisAppProvider} from '@shopify/polaris';
import {Provider as AppBridgeProvider} from '@shopify/app-bridge-react';


export function AppProviders({children, apiKey, host}) {
  return (
    <PolarisAppProvider>
      <AppBridgeProvider config={{apiKey, host, forceRedirect: true}}>
        {children}
      </AppBridgeProvider>
    </PolarisAppProvider>
  );
}
