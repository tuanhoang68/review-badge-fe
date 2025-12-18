import React, {useEffect, useState} from 'react';
import {Page, Card, ResourceList, Text} from '@shopify/polaris';
import {useAppBridge} from '@shopify/app-bridge-react';
import {authenticatedFetch} from '@shopify/app-bridge-utils';

export default function Products() {
  const app = useAppBridge();
  const authFetch = authenticatedFetch(app);
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Sau này sẽ gọi BE: /api/products
    // authFetch tự gắn session token để BE verify
    // Ví dụ placeholder:
    // authFetch('/api/products').then(r => r.json()).then(setItems);
  }, []);

  return (
    <Page title="Products">
      <Card>
        {items.length === 0 ? (
          <Text as="p">Chưa kết nối BE — sẽ hiển thị sản phẩm sau.</Text>
        ) : (
          <ResourceList
            resourceName={{singular: 'product', plural: 'products'}}
            items={items}
            renderItem={(item) => <Text as="p">{item.title}</Text>}
          />
        )}
      </Card>
    </Page>
  );
}
