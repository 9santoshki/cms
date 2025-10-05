// Theme and style constants for the application

export const theme = {
  colors: {
    primary: '#c19a6b', // Brown/gold accent color
    primaryDark: '#a8825f',
    secondary: '#fafafa', // Light gray background
    background: '#fafafa',
    text: '#333',
    textSecondary: '#666',
    textLight: '#ddd',
    textDark: '#222',
    white: '#ffffff',
    black: '#000000',
    shadow: 'rgba(0, 0, 0, 0.1)',
    border: '#f0f0f0',
  },
  fonts: {
    primary: "'Playfair Display', 'Georgia', serif",
    secondary: "'Montserrat', 'Arial', sans-serif",
  },
  spacing: {
    xs: '5px',
    small: '10px',
    medium: '15px',
    large: '20px',
    xl: '25px',
    xxl: '30px',
    section: '100px',
    container: '20px',
  },
  breakpoints: {
    mobile: '768px',
    tablet: '992px',
    desktop: '1200px',
  },
  borderRadius: {
    none: '0',
    small: '2px',
    medium: '4px',
    large: '8px',
  },
  shadows: {
    light: '0 2px 5px rgba(0, 0, 0, 0.1)',
    medium: '0 5px 15px rgba(0, 0, 0, 0.05)',
    card: '0 5px 15px rgba(0, 0, 0, 0.05)',
    hover: '0 15px 30px rgba(0, 0, 0, 0.1)',
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

export type Theme = typeof theme;