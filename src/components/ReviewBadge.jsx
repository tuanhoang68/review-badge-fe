import React, { useState, useEffect } from 'react';
import {
  Page,
  Card,
  BlockStack,
  ChoiceList,
  TextField,
  Button,
  ButtonGroup,
  LegacyCard,
  Image,
  Bleed,
  Text,
  Link,
} from '@shopify/polaris';


// Placeholder header cho card
const Placeholder = ({ label }) => (
  <div
    style={{
      backgroundColor: '#fff',
      padding: '12px 16px',
      borderBottom: '1px solid var(--p-color-border-subdued)',
    }}
  >
    <Text as="h2" variant="bodyMd" fontWeight="medium">
      {label}
    </Text>
  </div>
);

// Nội dung preview
const PreviewContentCustom = ({ selectedLayout, customCode, customCSS, alignment, badgeImages }) => (
  <div style={{ textAlign: alignment[0] }}>
    {selectedLayout === 'custom' ? (
      <div dangerouslySetInnerHTML={{ __html: customCode }} />
    ) : (
      <Image
        source={badgeImages.find((b) => b.value === selectedLayout)?.src || ''}
        alt={selectedLayout}
        style={{ width: '150px', height: '150px', objectFit: 'contain' }}
      />
    )}
    <style>{customCSS}</style>
  </div>
);

export default function ReviewBadge() {
  const [selectedLayout, setSelectedLayout] = useState('layout1');
  const [customCode, setCustomCode] = useState('');
  const [alignment, setAlignment] = useState(['center']);
  const [reviewText, setReviewText] = useState('{{review.number}} verified reviews');
  const [poweredByText, setPoweredByText] = useState('Powered by Trustify');
  const [customCSS, setCustomCSS] = useState('');
  const [headerText, setHeaderText] = useState('');

  const params = new URLSearchParams(window.location.search);
  const shopDomain = params.get("shop") || "demo-store.myshopify.com";

  useEffect(() => {
    fetch(`/api/badge-config?shop=${shopDomain}`)
      .then(res => res.json())
      .then(({ data }) => {
        if (data) {
          setSelectedLayout(data.Layout || 'layout1');
          setReviewText(data.ReviewText || '');
          setPoweredByText(data.PoweredByText || '');
          setHeaderText(data.HeaderText || '');
          setCustomCode(data.CustomCode || '');
          setCustomCSS(data.CustomCSS || '');
          setAlignment([data.Alignment || 'center']);
        }
      })
      .catch(console.error);
  }, [shopDomain]);

  const handleSave = async () => {
    const body = {
      shop_domain: shopDomain,
      layout: selectedLayout,
      reviewText,
      poweredByText,
      headerText,
      customCode,
      customCSS,
      alignment: alignment[0],
    };
    console.log("Payload gửi lên BE:", body); // 👈 kiểm tra dữ liệu FE chuẩn bị gửi

    const res = await fetch("/api/badge-config", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    console.log("Saved:", json);
  };


  const badgeImages = [
    { value: 'layout1', label: 'Layout 1', src: '/badges/1.png' },
    { value: 'layout2', label: 'Layout 2', src: '/badges/2.png' },
    { value: 'layout3', label: 'Layout 3', src: '/badges/3.png' },
    { value: 'layout4', label: 'Layout 4', src: '/badges/4.png' },
    { value: 'layout5', label: 'Layout 5', src: '/badges/5.png' },
  ];

  const widgetTextConfig = {
    layout1: {
      reviewText: '{{review.number}} verified reviews',
      poweredByText: 'Powered by Trustify',
    },
    layout2: {
      reviewText: 'Based on {{review.number}} verified reviews',
      poweredByText: 'trustify',
    },
    layout3: {
      reviewText: 'From {{review.number}} verified reviews',
      poweredByText: 'trustify',
    },
    layout4: {
      reviewText: 'Rating',
      poweredByText: 'Powered by',
    },
    layout5: {
      headerText: 'VERIFIED REVIEWS',
      reviewText: 'From {{review.number}} verified reviews',
      poweredByText: 'Powered by',
    },
  };

  // Choices cho layout
  const layoutChoices = [
    ...badgeImages.map((badge) => ({
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Image
            source={badge.src}
            alt={badge.label}
            style={{ width: '120px', height: '120px', objectFit: 'contain' }}
          />
          <div>{badge.label}</div>
        </div>
      ),
      value: badge.value,
    })),
    {
      label: (
        <TextField
          label="Input custom code for the badge"
          value={customCode}
          onChange={setCustomCode}
          multiline={4}
        />
      ),
      value: 'custom',
    },
  ];

  return (
    <Page backAction={{ content: 'Settings', url: '#' }} title="Review badge">
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Bên trái: cấu hình */}
        <div style={{ flex: 1 }}>
          <LegacyCard title="Activate widget on theme" sectioned>
            <p>Add the block named “Trustify Review badge” on your Theme and save settings</p>
            <ButtonGroup>
              <Button>Add the badge to Theme</Button>
              <Button variant="plain">Guideline</Button>
            </ButtonGroup>
          </LegacyCard>

          <Card title="Design" sectioned>
            <BlockStack gap="loose">
              <ChoiceList
                title="Select badge layout"
                choices={layoutChoices}
                selected={[selectedLayout]}
                onChange={(value) => 
                {
                  const selected = value[0]; 
                  setSelectedLayout(selected); 
                  if (selected !== 'custom') { 
                    const config = widgetTextConfig[selected]; 
                    if (config) { 
                      setReviewText(config.reviewText || ''); 
                      setPoweredByText(config.poweredByText || ''); 
                      setHeaderText(config.headerText || '');
                    } 
                  }
                }
                }
              />

              <ChoiceList
                title="Badge alignment"
                choices={[
                  { label: 'Left', value: 'left' },
                  { label: 'Center', value: 'center' },
                  { label: 'Right', value: 'right' },
                ]}
                selected={alignment}
                onChange={setAlignment}
              />
              
              {/* Section: Widget text */}
              {selectedLayout !== 'custom' && (
                <>
                <div style={{ borderTop: '1px solid #E1E3E5', margin: '20px 0' }} />
                  {/* Divider */}
                  <div>
                    <strong>Widget text</strong>
                  </div>
                  <TextField
                    label="Text số review"
                    value={reviewText}
                    onChange={setReviewText}
                  />
                  <TextField
                    label="Text Powered by"
                    value={poweredByText}
                    onChange={setPoweredByText}
                  />

                  {selectedLayout === 'layout5' && (
                    <TextField
                      label="Header text"
                      value={headerText}
                      onChange={setHeaderText}
                    />
                  )}
                </>
              )}



              {/* Divider */}
              <div style={{ borderTop: '1px solid #E1E3E5', margin: '20px 0' }} />
              {/* Section: Custom CSS */}
                <div>
                  <strong>Custom CSS</strong>
                </div>
              <TextField
                value={customCSS}
                onChange={setCustomCSS}
                multiline={4}
                autoComplete="off"
                style={{ fontFamily: 'monospace' }}
              />
            </BlockStack>
          </Card>
        </div>

        {/* Bên phải: preview */}
        <div style={{ flex: 1 }}>
          <Card>
            <Bleed marginInline="400">
              <Placeholder label="Preview" />
            </Bleed>
            <PreviewContentCustom
              selectedLayout={selectedLayout}
              customCode={customCode}
              customCSS={customCSS}
              alignment={alignment}
              badgeImages={badgeImages}
            />
            
          </Card>
 
          <Card>
            <BlockStack gap="loose" alignment="center">
              <Image
                source="/badges/Card_alpha.png"
                alt="Review badge"
                style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
              />
              <Text as="p" tone="subdued">
                Want to customize other badge?
              </Text>
              <Text as="p" fontWeight="medium">
                👉{' '}
                <Link
                  url="https://trustifyreview.app/generate-google-review-snippets/?utm_source=inapp&utm_medium=reviewbadgetlayout&utm_id=cross-from-inapp-reviewbadgetlayout"
                  external
                >
                  Custom with Trustify Free Tool
                </Link>
              </Text>
            </BlockStack>
          </Card>
          <Button primary onClick={handleSave}>Save Config</Button>
          {/* <Button primary >Save Config</Button> */}
        </div>
      </div>
      
    </Page>
  );
}
