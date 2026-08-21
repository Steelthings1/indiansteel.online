export const generateLocalBusinessSchema = (settings: {
  companyName: string;
  address: string;
  phone: string;
  email: string;
  gstNumber: string;
  businessHours: string;
}) => {
  return {
    "@context": "https://schema.org",
    "@type": "SteelWorkOrRetailer",
    "name": "Indian Steel (indiansteel.online)",
    "url": "https://indiansteel.online",
    "description": "Premium MS Plate Retail & Precision Custom Steel Metal Cutting Services (Manual, Machine, CNC Laser Cutting) at indiansteel.online.",
    "telephone": settings.phone,
    "email": settings.email || "sales@indiansteel.online",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressCountry": "IN"
    },
    "vatID": settings.gstNumber,
    "openingHours": "Mo-Sa 08:30-19:30",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Steel Products & Cutting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "MS Plate Cutting Service",
            "description": "Custom mild steel plate cutting according to exact length, width, and thickness requirements."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "CNC Laser Cutting Service",
            "description": "High precision CNC fiber laser cutting for intricate custom shapes and industrial components."
          }
        }
      ]
    }
  };
};
