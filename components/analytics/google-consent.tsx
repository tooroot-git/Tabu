import Script from "next/script"

export function GoogleConsent({ measurementId = "G-90GNK6C2PY" }: { measurementId?: string }) {
  return (
    <>
      <Script
        id="google-consent"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Default consent mode settings
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
            
            // Function to update consent
            function updateConsent(consent) {
              gtag('consent', 'update', consent);
            }
            
            // Example: When user accepts analytics
            window.acceptAnalytics = function() {
              updateConsent({ 'analytics_storage': 'granted' });
            };
            
            // Example: When user accepts all
            window.acceptAll = function() {
              updateConsent({
                'analytics_storage': 'granted',
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted'
              });
            };
          `,
        }}
      />
    </>
  )
}
