'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';

// Translation strings
const translations: Record<string, Record<string, string>> = {
  en: {
    // Header
    home: 'Home',
    shop: 'Shop',
    about: 'About',
    contact: 'Contact',
    search: 'Search',
    login: 'Login',
    logout: 'Logout',
    cart: 'Cart',
    account: 'Account',
    dashboard: 'Dashboard',

    // Subcategories
    sofasSectionals: 'Sofas & Sectionals',
    coffeeTables: 'Coffee Tables',
    tvEntertainmentUnits: 'TV & Entertainment Units',
    accentChairs: 'Accent Chairs',
    ottomansBenches: 'Ottomans & Benches',
    sideTables: 'Side Tables',
    diningTables: 'Dining Tables',
    diningChairs: 'Dining Chairs',
    buffetsSideboards: 'Buffets & Sideboards',
    barCartsStools: 'Bar Carts & Stools',
    bedsHeadboards: 'Beds & Headboards',
    dressersChests: 'Dressers & Chests',
    nightstands: 'Nightstands',
    wardrobesArmoires: 'Wardrobes & Armoires',
    beddingThrows: 'Bedding & Throws',
    desksWorkTables: 'Desks & Work Tables',
    officeChairs: 'Office Chairs',
    bookcasesShelves: 'Bookcases & Shelves',
    storageSolutions: 'Storage Solutions',
    chandeliers: 'Chandeliers',
    tableLamps: 'Table Lamps',
    floorLamps: 'Floor Lamps',
    pendantLights: 'Pendant Lights',
    wallLightsSconces: 'Wall Lights & Sconces',
    wallArtPrints: 'Wall Art & Prints',
    mirrors: 'Mirrors',
    vasesPlanters: 'Vases & Planters',
    cushionsThrows: 'Cushions & Throws',
    candlesDiffusers: 'Candles & Diffusers',
    patioFurniture: 'Patio Furniture',
    gardenPatioDecor: 'Garden & Patio Decor',
    outdoorDiningSets: 'Outdoor Dining Sets',
    portfolio: 'Portfolio',
    designServices: 'Design Services',
    bookConsultation: 'Book Consultation',
    aboutUs: 'About Us',

    // Category Nav
    allProducts: 'All Products',
    browseByCategory: 'Browse by Category',
    browseProducts: 'Browse Products',
    livingRoom: 'Living Room',
    diningRoom: 'Dining Room',
    bedroom: 'Bedroom',
    homeOffice: 'Home Office',
    lighting: 'Lighting',
    decor: 'Decor',
    outdoor: 'Outdoor',
    other: 'Other',
    services: 'Services',
    shopByCategory: 'Shop by Category',
    categories: 'Categories',
    exploreCollection: 'Explore our curated collection',
    viewAll: 'View All',

    // Product Detail
    price: 'Price',
    quantity: 'Quantity',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    freeShipping: 'Free Shipping',
    bestPriceGuarantee: 'Best Price Guarantee',
    description: 'Description',
    specifications: 'Specifications',
    dimensions: 'Dimensions',
    material: 'Material',
    weight: 'Weight',
    color: 'Color',
    warranty: 'Warranty',
    assembly: 'Assembly',
    required: 'Required',
    notRequired: 'Not Required',

    // Reviews
    customerReviews: 'Customer Reviews',
    writeReview: 'Write a Review',
    signInToReview: 'Sign in to Write a Review',
    submitReview: 'Submit Review',
    noReviews: 'No reviews yet. Be the first to review this product!',
    rating: 'Rating',

    // Related
    youMayAlsoLike: 'You May Also Like',

    // Trust badges
    dayReturns: 'Easy Returns',
    securePayment: 'Safe Checkout',
    expressDelivery: 'Fast Delivery',

    // Variant selector
    selectOptions: 'Select options to choose your variant. Some variants may use fewer dimensions.',
    selected: 'Selected',
    thisCombinationNotAvailable: 'This combination is not available. Please select different options.',
    loadingOptions: 'Loading options...',

    // Common
    loading: 'Loading...',
    browseCollection: 'Browse Collection',
    itemNotAvailable: 'Item Not Available',

    // FAQ and Return Policy
    frequentlyAskedQuestions: 'Frequently Asked Questions',
    returnPolicy: 'Return Policy',
    shippingInfo: 'Shipping Information',
    deliveryTimeline: 'Delivery Timeline',
    warrantyInfo: 'Warranty Information',
    cancellationPolicy: 'Cancellation Policy',
    standardReturn: 'Standard Return Policy',
    noReturn: 'Non-Returnable Item',
    exchangeOnly: 'Exchange Only',
    returnsWithin7Days: 'Returns within 7 days of delivery',
    noReturnsOnCustom: 'This item cannot be returned as it is custom-made',
    exchangeOnlyPolicy: 'This item can only be exchanged, not returned',
    freeShippingAbove: 'Free shipping on orders above ₹5,000',
    deliveryIn5_7Days: 'Delivery in 5-7 business days',
    warrantyPeriod: '1 year warranty on all products',
    cancelBeforeDispatch: 'Cancellation allowed before dispatch',
  },
  hi: {
    // Header
    home: 'होम',
    shop: 'शॉप',
    about: 'हमारे बारे में',
    contact: 'संपर्क',
    search: 'खोजें',
    login: 'लॉग इन',
    logout: 'लॉग आउट',
    cart: 'कार्ट',
    account: 'अकाउंट',
    dashboard: 'डैशबोर्ड',

    // Subcategories
    sofasSectionals: 'सोफा और सेक्शनल',
    coffeeTables: 'कॉफी टेबल',
    tvEntertainmentUnits: 'TV और एंटरटेनमेंट यूनिट',
    accentChairs: 'एक्सेंट चेयर',
    ottomansBenches: 'ऑटोमन और बेंच',
    sideTables: 'साइड टेबल',
    diningTables: 'डाइनिंग टेबल',
    diningChairs: 'डाइनिंग चेयर',
    buffetsSideboards: 'बुफेट और साइडबोर्ड',
    barCartsStools: 'बार कार्ट और स्टूल',
    bedsHeadboards: 'बेड और हेडबोर्ड',
    dressersChests: 'ड्रेसर और चेस्ट',
    nightstands: 'नाइटस्टैंड',
    wardrobesArmoires: 'वॉर्डरोब और अरमोयर',
    beddingThrows: 'बेडिंग और थ्रो',
    desksWorkTables: 'डेस्क और वर्क टेबल',
    officeChairs: 'ऑफिस चेयर',
    bookcasesShelves: 'बुककेस और शेल्फ',
    storageSolutions: 'स्टोरेज सॉल्यूशन',
    chandeliers: 'चैंडलियर',
    tableLamps: 'टेबल लैंप',
    floorLamps: 'फ्लोर लैंप',
    pendantLights: 'पेंडेंट लाइट',
    wallLightsSconces: 'वॉल लाइट और स्कॉन्स',
    wallArtPrints: 'वॉल आर्ट और प्रिंट',
    mirrors: 'मिरर',
    vasesPlanters: 'वास और प्लांटर',
    cushionsThrows: 'कुशन और थ्रो',
    candlesDiffusers: 'कैंडल और डिफ्यूजर',
    patioFurniture: 'पैटियो फर्निचर',
    gardenPatioDecor: 'गार्डन और पैटियो डेकोर',
    outdoorDiningSets: 'आउटडोर डाइनिंग सेट',
    portfolio: 'पोर्टफोलियो',
    designServices: 'डिज़ाइन सर्विस',
    bookConsultation: 'कंसल्टेशन बुक करें',
    aboutUs: 'हमारे बारे में',

    // Category Nav (Hindi)
    allProducts: 'सभी उत्पाद',
    browseByCategory: 'कैटेगरी के अनुसार ब्रॉउज़ करें',
    browseProducts: 'उत्पाद ब्रॉउज़ करें',
    livingRoom: 'लिविंग रूम',
    diningRoom: 'डाइनिंग रूम',
    bedroom: 'बेडरूम',
    homeOffice: 'होम ऑफिस',
    lighting: 'लाइटिंग',
    decor: 'डेकोर',
    outdoor: 'आउटडोर',
    other: 'अन्य',
    services: 'सर्विसेज',
    shopByCategory: 'शॉप बॉय कैटेगरी',
    categories: 'कैटेगरी',
    exploreCollection: 'हमारा कलेक्शन देखें',
    viewAll: 'सभी देखें',

    // Product Detail
    price: 'मूल्य',
    quantity: 'मात्रा',
    addToCart: 'कार्ट में जोड़ें',
    outOfStock: 'स्टॉक में नहीं',
    inStock: 'स्टॉक में है',
    freeShipping: 'मुफ्त शिपिंग',
    bestPriceGuarantee: 'बेस्ट प्राइस गारंटी',
    description: 'विवरण',
    specifications: 'विशेषताएं',
    dimensions: 'आयाम',
    material: 'सामग्री',
    weight: 'वजन',
    color: 'रंग',
    warranty: 'वारंटी',
    assembly: 'असेंबली',
    required: 'आवश्यक',
    notRequired: 'आवश्यक नहीं',

    // Reviews
    customerReviews: 'ग्राहक समीक्षा',
    writeReview: 'समीक्षा लिखें',
    signInToReview: 'समीक्षा लिखने के लिए साइन इन करें',
    submitReview: 'समीक्षा सबमिट करें',
    noReviews: 'कोई समीक्षा नहीं। पहले समीक्षा लिखें!',
    rating: 'रेटिंग',

    // Related
    youMayAlsoLike: 'आपको ये भी पसंद आएंगे',

    // Trust badges
    dayReturns: 'आसान रिटर्न',
    securePayment: 'सुरक्षित चेकआउट',
    expressDelivery: 'तेज़ डिलीवरी',

    // Variant selector
    selectOptions: 'विकल्प चुनें। कुछ वेरिएंट कम डायमेंशन का उपयोग करते हैं।',
    selected: 'चयनित',
    thisCombinationNotAvailable: 'यह संयोजन उपलब्ध नहीं है। अलग विकल्प चुनें।',
    loadingOptions: 'विकल्प लोड हो रहे हैं...',

    // Common
    loading: 'लोड हो रहा है...',
    browseCollection: 'संग्रह देखें',
    itemNotAvailable: 'उत्पाद उपलब्ध नहीं',

    // FAQ and Return Policy
    frequentlyAskedQuestions: 'अक्सर पूछे जाने वाले प्रश्न',
    returnPolicy: 'रिटर्न पॉलिसी',
    shippingInfo: 'शिपिंग जानकारी',
    deliveryTimeline: 'डिलीवरी समय',
    warrantyInfo: 'वारंटी जानकारी',
    cancellationPolicy: 'कैंसलेशन पॉलिसी',
    standardReturn: 'स्टैंडर्ड रिटर्न पॉलिसी',
    noReturn: 'नॉन-रिटर्नेबल आइटम',
    exchangeOnly: 'सिर्फ एक्सचेंज',
    returnsWithin7Days: 'डिलीवरी के 7 दिनों के भीतर रिटर्न',
    noReturnsOnCustom: 'यह कस्टम-मेड होने के कारण रिटर्न नहीं किया जा सकता',
    exchangeOnlyPolicy: 'यह आइटम सिर्फ एक्सचेंज किया जा सकता है, रिटर्न नहीं',
    freeShippingAbove: '₹5,000 से ऊपर के ऑर्डर पर मुफ्त शिपिंग',
    deliveryIn5_7Days: '5-7 बिज़नेस डे में डिलीवरी',
    warrantyPeriod: 'सभी उत्पादों पर 1 वर्ष की वारंटी',
    cancelBeforeDispatch: 'डिस्पैच से पहले कैंसलेशन अलाउड',
  },
  kn: {
    // Header
    home: 'ಹೋಮ್',
    shop: 'ಶಾಪ್',
    about: 'ನಮ್ಮ ಬಗ್ಗೆ',
    contact: 'ಸಂಪರ್ಕ',
    search: 'ಹುಡುಕು',
    login: 'ಲಾಗಿನ್',
    logout: 'ಲಾಗ್ ಔಟ್',
    cart: 'ಕಾರ್ಟ್',
    account: 'ಅಕೌಂಟ',
    dashboard: 'ಡಾಶ್‌ಬೋರ್ಡ್',

    // Subcategories
    sofasSectionals: 'ಸೋಫಾ ಮತ್ತು ಸೆಕ್ಷನಲ್',
    coffeeTables: 'ಕಾಫೀ ಟೇಬಲ್',
    tvEntertainmentUnits: 'TV ಮತ್ತು ಎಂಟರ್‌ಟೇನ್‌ಮೆಂಟ್ ಯುನಿಟ್',
    accentChairs: 'ಆಕ್ಸೆಂಟ್ ಚೇರ್',
    ottomansBenches: 'ಆಟೋಮನ್ ಮತ್ತು ಬೆಂಚ್',
    sideTables: 'ಸೈಡ್ ಟೇಬಲ್',
    diningTables: 'ಡಿನಿಂಗ್ ಟೇಬಲ್',
    diningChairs: 'ಡಿನಿಂಗ್ ಚೇರ್',
    buffetsSideboards: 'ಬಫೆಟ್ ಮತ್ತು ಸೈಡ್‌ಬೋರ್ಡ್',
    barCartsStools: 'ಬಾರ್ ಕಾರ್ಟ್ ಮತ್ತು ಸ್ಟೂಲ್',
    bedsHeadboards: 'ಬೆಡ್ ಮತ್ತು ಹೆಡ್‌ಬೋರ್ಡ್',
    dressersChests: 'ಡ್ರೆಸ್ಸರ್ ಮತ್ತು ಚೆಸ್ಟ್',
    nightstands: 'ನಾಇಟ್‌ಸ್ಟಾಂಡ್',
    wardrobesArmoires: 'ವಾರ್ಡ್‌ರೋಬ್ ಮತ್ತು ಅರ್‌ಮೋಯರ್',
    beddingThrows: 'ಬೆಡ್ಡಿಂಗ್ ಮತ್ತು ಥ್ರೋ',
    desksWorkTables: 'ಡೆಸ್ಕ್ ಮತ್ತು ವರ್ಕ್ ಟೇಬಲ್',
    officeChairs: 'ಆಫೀಸ್ ಚೇರ್',
    bookcasesShelves: 'ಬುಕ್‌ಕೇಸ್ ಮತ್ತು ಶೆಲ್ಫ್',
    storageSolutions: 'ಸ್ಟೋರೇಜ್ ಸಾಲ್ಯೂಶನ್',
    chandeliers: 'ಚೆಂಡಿಲಿಯರ್',
    tableLamps: 'ಟೇಬಲ್ ಲಾಂಪ್',
    floorLamps: 'ಫ್ಲೋರ್ ಲಾಂಪ್',
    pendantLights: 'ಪೆಂಡೆಂಟ್ ಲಾಇಟ್',
    wallLightsSconces: 'ವಾಲ್ ಲಾಇಟ್ ಮತ್ತು ಸ್ಕಾನ್ಸ್',
    wallArtPrints: 'ವಾಲ್ ಆರ್ಟ್ ಮತ್ತು ಪ್ರಿಂಟ್',
    mirrors: 'ಮಿರರ್',
    vasesPlanters: 'ವಾಸ್ ಮತ್ತು ಪ್ಲಾಂಟರ್',
    cushionsThrows: 'ಕುಶನ್ ಮತ್ತು ಥ್ರೋ',
    candlesDiffusers: 'ಕಾಂಡಲ್ ಮತ್ತು ಡಿಫ್ಯೂಸರ್',
    patioFurniture: 'ಪಾಟಿಯೋ ಫರ್ನಿಚರ್',
    gardenPatioDecor: 'ಗಾರ್ಡನ್ ಮತ್ತು ಪಾಟಿಯೋ ಡೆಕೋರ್',
    outdoorDiningSets: 'ಔಟ್‌ಡೋರ್ ಡಿನಿಂಗ್ ಸೆಟ್',
    portfolio: 'ಪೋರ್ಟ್‌ಫೋಲಿಯೋ',
    designServices: 'ಡಿಸೈನ್ ಸರ್ವಿಸ್',
    bookConsultation: 'ಕನ್ಸಲ್ಟೇಶನ್ ಬುಕ್ ಮಾಡಿ',
    aboutUs: 'ನಮ್ಮ ಬಗ್ಗೆ',

    // Category Nav (Kannada)
    allProducts: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳು',
    browseByCategory: 'ಕೇಟಗರಿ ಮೂಲಕ ಬ್ರೌಸ್',
    browseProducts: 'ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್',
    livingRoom: 'ಲಿವಿಂಗ್ ರೂಮ್',
    diningRoom: 'ಡಿನಿಂಗ್ ರೂಮ್',
    bedroom: 'ಬೆಡ್‌ರೂಮ್',
    homeOffice: 'ಹೋಮ್ ಆಫೀಸ್',
    lighting: 'ಲೈಟಿಂಗ್',
    decor: 'ಡೆಕೋರ್',
    outdoor: 'ಔಟ್‌ಡೋರ್',
    other: 'ಇತರ',
    services: 'ಸೇವೆಗಳು',
    shopByCategory: 'ಕೇಟಗರಿ ಮೂಲಕ ಶಾಪ್',
    categories: 'ಕೇಟಗರಿಗಳು',
    exploreCollection: 'ನಮ್ಮ ಕಲೆಕ್ಶನ್ ನೋಡಿ',
    viewAll: 'ಎಲ್ಲಾ ನೋಡಿ',

    // Product Detail
    price: 'ಬೆಲೆ',
    quantity: 'ಪ್ರಮಾಣ',
    addToCart: 'ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ',
    outOfStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿ ಇಲ್ಲ',
    inStock: 'ಸ್ಟಾಕ್‌ನಲ್ಲಿ ಇದೆ',
    freeShipping: 'ಉಚಿತ ಶಿಪಿಂಗ್',
    bestPriceGuarantee: 'ಬೆಸ್ಟ್ ಪ್ರಾಇಸ್ ಗ್ಯಾರಂಟಿ',
    description: 'ವಿವರ',
    specifications: 'ವಿಶೇಷತೆಗಳು',
    dimensions: 'ಆಯಾಮಗಳು',
    material: 'ಮೆಟೀರಿಯಲ್',
    weight: 'ತೂಕ',
    color: 'ಬಣ್ಣ',
    warranty: 'ವಾರಂಟಿ',
    assembly: 'ಅಸೆಂಬ್ಲಿ',
    required: 'ಅಗತ್ಯ',
    notRequired: 'ಅಗತ್ಯವಿಲ್ಲ',

    // Reviews
    customerReviews: 'ಗ್ರಾಹಕ ವಿಮರ್ಶೆಗಳು',
    writeReview: 'ವಿಮರ್ಶೆ ಬರೆಯಿರಿ',
    signInToReview: 'ವಿಮರ್ಶೆ ಬರೆಯಲು ಸಿಗ್ನ್ ಇನ್ ಮಾಡಿ',
    submitReview: 'ವಿಮರ್ಶೆ ಸಬ್‌ಮಿಟ್ ಮಾಡಿ',
    noReviews: 'ವಿಮರ್ಶೆಗಳು ಇಲ್ಲ. ಮೊದಲ ವಿಮರ್ಶೆ ಬರೆಯಿರಿ!',
    rating: 'ರೇಟಿಂಗ್',

    // Related
    youMayAlsoLike: 'ಇವನ್ನೂ ನೋಡಿ',

    // Trust badges
    dayReturns: 'ಸುಲಭ ರಿಟರ್ನ್',
    securePayment: 'ಸುರಕ್ಷಿತ ಚೆಕ್‌ಔಟ್',
    expressDelivery: 'ವೇಗದ ಡಿಲಿವರಿ',

    // Variant selector
    selectOptions: 'ಆಯ್ಕೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಕೆಲವು ವೇರಿಯಂಟ್‌ಗಳು ಕಡಿಮೆ ಡಿಮೆನ್‌ಶನ್‌ಗಳನ್ನು ಬಳಸುತ್ತವೆ.',
    selected: 'ಆಯ್ಕೆಮಾಡಿದ',
    thisCombinationNotAvailable: 'ಈ ಸಂಯೋಜನೆ ಲಭ್ಯವಿಲ್ಲ. ಬೇರೆ ಆಯ್ಕೆಗಳನ್ನು ಆಯ್ಕೆಮಾಡಿ.',
    loadingOptions: 'ಆಯ್ಕೆಗಳನ್ನು ಲೋಡ್ ಮಾಡುತ್ತಿದೆ...',

    // Common
    loading: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...',
    browseCollection: 'ಸಂಗ್ರಹ ವೀಕ್ಷಣೆ',
    itemNotAvailable: 'ಉತ್ಪನ್ನ ಲಭ್ಯವಿಲ್ಲ',

    // FAQ and Return Policy
    frequentlyAskedQuestions: 'ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    returnPolicy: 'ರಿಟರ್ನ್ ಪಾಲಿಸಿ',
    shippingInfo: 'ಶಿಪಿಂಗ್ ಮಾಹಿತಿ',
    deliveryTimeline: 'ಡಿಲಿವರಿ ಸಮಯ',
    warrantyInfo: 'ವಾರಂಟಿ ಮಾಹಿತಿ',
    cancellationPolicy: 'ಕ್ಯಾನ್ಸಲೇಶನ್ ಪಾಲಿಸಿ',
    standardReturn: 'ಸ್ಟಾಂಡರ್ಡ್ ರಿಟರ್ನ್ ಪಾಲಿಸಿ',
    noReturn: 'ನಾನ್-ರಿಟರ್ನಬಲ್ ಐಟಂ',
    exchangeOnly: 'ಕವಲು ಎಕ್ಸ್‌ಚೇಂಜ್',
    returnsWithin7Days: 'ಡಿಲಿವರಿಯ 7 ದಿನಗಳ ಒಳಗೆ ರಿಟರ್ನ್',
    noReturnsOnCustom: 'ಇದು ಕಸ್ಟಮ್-ಮೇಡ್ ಆಗಿರುವುದರಿಂದ ರಿಟರ್ನ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ',
    exchangeOnlyPolicy: 'ಈ ಐಟಂ ಎಕ್ಸ್‌ಚೇಂಜ್ ಮಾಡಲು ಸಾಧ್ಯ, ರಿಟರ್ನ್ ಸಾಧ್ಯವಿಲ್ಲ',
    freeShippingAbove: '₹5,000 ಮೇಲೆ ಫ್ರೀ ಶಿಪಿಂಗ್',
    deliveryIn5_7Days: '5-7 ಬಿಸಿನೆಸ್ ಡೇಗಳಲ್ಲಿ ಡಿಲಿವರಿ',
    warrantyPeriod: 'ಎಲ್ಲಾ ಉತ್ಪನ್ನಗಳಿಗೆ 1 ವರ್ಷ ವಾರಂಟಿ',
    cancelBeforeDispatch: 'ಡಿಸ್ಪಾಚ್ ಮೊದಲು ಕ್ಯಾನ್ಸಲೇಶನ್ ಅಲೌಡ್',
  },
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('cms-language');
    if (savedLang && translations[savedLang]) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang;
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cms-language', language);
    document.documentElement.lang = language;
  }, [language]);

  // Translation function - memoized to change when language changes
  const t = useCallback((key: string): string => {
    return translations[language]?.[key] || translations['en'][key] || key;
  }, [language]);

  // Context value - memoized to trigger re-renders in consumers
  const contextValue = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, t]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export { translations };