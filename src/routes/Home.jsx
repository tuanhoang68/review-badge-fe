import React from 'react';
import {Page, Layout, Card, Text} from '@shopify/polaris';

export default function Home() {
  return (
    <Page title="Review Badge App">
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="p">Xin chào! FE embedded đã chạy trong Shopify Admin.</Text>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
