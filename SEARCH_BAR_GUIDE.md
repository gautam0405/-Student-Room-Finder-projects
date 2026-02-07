# Modern Search Bar Component - Documentation

## Overview

This package includes a modern, responsive search bar UI component for a Room and Hostel Finder website. It features a clean design similar to booking.com and Airbnb, with smooth animations and responsive layouts.

## Files Included

1. **search-hero.html** - Standalone HTML file with complete implementation
2. **search-styles.css** - Reusable CSS styles
3. **src/components/SearchBar.js** - React component version
4. **src/components/SearchBar.css** - React component styles

## Features

✅ **Modern Design**
- Clean, professional appearance
- Gradient background
- Soft shadows and rounded corners
- Smooth animations and transitions

✅ **Responsive Design**
- Desktop layout: Horizontal three-part search bar
- Tablet layout: Vertical stacked search bar
- Mobile layout: Optimized for touch interactions

✅ **Interactive Elements**
- Active field highlighting
- Smooth hover effects
- Loading and success states
- Focus states for accessibility

✅ **Functional**
- Three input fields (Location, Hostel, Price Range)
- Search button with loading state
- Form validation
- Keyboard shortcuts (Escape to clear)
- Optional callback for parent components

## Quick Start

### 1. Using the Standalone HTML File

Simply open `search-hero.html` in a browser:

```bash
# Open the file in your browser
open search-hero.html
```

Or use it as a template in your HTML project.

### 2. Using the React Component

Import and use the SearchBar component in your React application:

```jsx
import SearchBar from './components/SearchBar';

function App() {
  const handleSearch = (filters) => {
    console.log('Search filters:', filters);
    // Navigate to results or call API
  };

  return <SearchBar onSearch={handleSearch} />;
}

export default App;
```

### 3. Using the Standalone CSS

Import the CSS file in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="search-styles.css">
</head>
<body>
  <!-- Your search bar HTML here -->
</body>
</html>
```

## Component Props (React Version)

```typescript
interface SearchBarProps {
  onSearch?: (filters: SearchFilters) => void;
  defaultLocation?: string;
  defaultHostel?: string;
  defaultPrice?: string;
}

interface SearchFilters {
  location: string;
  hostel: string;
  priceRange: string;
}
```

### Props Description

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSearch` | Function | `null` | Callback function triggered on search submission |
| `defaultLocation` | String | `''` | Initial value for location input |
| `defaultHostel` | String | `''` | Initial value for hostel input |
| `defaultPrice` | String | `''` | Initial value for price select |

## Usage Examples

### Basic Usage

```jsx
<SearchBar />
```

### With Callback

```jsx
<SearchBar 
  onSearch={(filters) => {
    // Handle search
    console.log('Searching for:', filters);
    // Navigate to search results
    navigate(`/results?${new URLSearchParams(filters)}`);
  }}
/>
```

### With Default Values

```jsx
<SearchBar 
  defaultLocation="Delhi"
  defaultHostel="Budget Hostels"
  defaultPrice="500-1000"
/>
```

## Customization

### Colors

Edit the CSS variables in `search-styles.css` or `SearchBar.css`:

```css
:root {
  --primary-color: #667eea;
  --primary-dark: #764ba2;
  --text-primary: #333;
  --border-color: #f0f0f0;
  /* ... other variables */
}
```

### Price Ranges

Modify the price options in the component:

**React version** - Edit `priceRanges` array in `SearchBar.js`:
```jsx
const priceRanges = [
  { value: '0-500', label: '₹ 0 - 500' },
  { value: '500-1000', label: '₹ 500 - 1000' },
  // Add more ranges
];
```

**HTML version** - Edit the `<select>` options in `search-hero.html`:
```html
<select class="search-select" id="priceSelect">
  <option value="0-500">₹ 0 - 500</option>
  <option value="500-1000">₹ 500 - 1000</option>
  <!-- Add more options -->
</select>
```

### Icons

Change the emoji icons by updating the search-icon spans:

```html
<!-- Location icon -->
<span class="search-icon">📍</span>

<!-- Hostel icon -->
<span class="search-icon">🏠</span>

<!-- Price icon -->
<span class="search-icon">💰</span>
```

### Placeholders

Modify placeholder text in input fields:

```html
<input placeholder="Enter your city" />
<input placeholder="Find your residence" />
<select>
  <option>Pick your budget</option>
</select>
```

## Responsive Breakpoints

- **Desktop**: > 768px - Horizontal layout
- **Tablet**: 480px - 768px - Vertical layout
- **Mobile**: < 480px - Optimized for touch

## Browser Compatibility

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers

## Accessibility Features

- Semantic HTML structure
- ARIA labels (can be added)
- Keyboard navigation (Tab, Escape)
- Focus indicators
- Color contrast compliant
- Touch-friendly on mobile

## JavaScript Events (HTML Version)

### Form Submission
```javascript
const form = document.getElementById('searchForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = document.getElementById('locationInput').value;
  const hostel = document.getElementById('hostelInput').value;
  const price = document.getElementById('priceSelect').value;
  console.log({ location, hostel, price });
});
```

### Clear on Escape
Press `Escape` to clear all fields

### Field Focus Events
```javascript
const input = document.getElementById('locationInput');
input.addEventListener('focus', () => {
  console.log('Location field focused');
});
```

## Integration with Your Project

### Step 1: Copy Files
```bash
# Copy React component and styles
cp SearchBar.js src/components/
cp SearchBar.css src/components/
```

### Step 2: Import in Your Page

**Option A - Replace current Home.js search**
```jsx
import SearchBar from '../components/SearchBar';

function Home() {
  return (
    <div className="home">
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}
```

**Option B - Use with existing layout**
```jsx
import SearchBar from '../components/SearchBar';

function SearchPage() {
  return (
    <>
      <SearchBar onSearch={navigateToResults} />
      {/* Existing content */}
    </>
  );
}
```

### Step 3: Handle Search Results
```jsx
const handleSearch = (filters) => {
  // API call example
  fetch(`/api/search?${new URLSearchParams(filters)}`)
    .then(res => res.json())
    .then(data => setResults(data));
};
```

## Styling Integration

The component uses CSS Flexbox and modern CSS features:

- **CSS Grid**: Not used, pure Flexbox
- **CSS Variables**: For easy customization
- **Media Queries**: For responsive design
- **CSS Transitions**: For smooth animations
- **CSS Gradients**: For background effects

## Performance

- Lightweight component (~5KB React, ~3KB CSS)
- No external dependencies (React version)
- CSS-only animations (GPU accelerated)
- Optimized for mobile performance

## Dark Mode Support

The component includes dark mode support via `prefers-color-scheme` media query:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles applied automatically */
}
```

## FAQ

**Q: How do I change the search button text?**
A: In React version, modify the button JSX. In HTML version, edit the button content.

**Q: Can I use different icons?**
A: Yes, replace the emoji with any icon library (FontAwesome, Material Icons, etc.)

**Q: How do I integrate with my backend?**
A: Use the `onSearch` callback (React) or form submission handler (HTML) to make API calls.

**Q: Is it mobile-friendly?**
A: Yes! The component is fully responsive and optimized for all screen sizes.

**Q: Can I disable certain fields?**
A: Yes, add the `disabled` attribute to inputs or modify the component.

**Q: How do I add autocomplete?**
A: Use HTML `<datalist>` element or implement your own autocomplete logic.

## Support & Improvements

To add features:
1. Autocomplete suggestions
2. Recent searches
3. Advanced filters
4. Map integration
5. Voice search
6. Filter pills/tags

## License

Free to use and modify for your project.

---

**Created**: February 7, 2026
**Version**: 1.0
**Last Updated**: February 7, 2026
