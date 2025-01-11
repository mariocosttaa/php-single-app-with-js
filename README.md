# SPA Content Loader with Dynamic Script Execution

This JavaScript code snippet provides a **Single Page Application (SPA)** like behavior to your website by enabling **AJAX-based content loading** without reloading the entire page. It dynamically fetches content, updates the DOM, and ensures that the interactive components (like tooltips, modals, etc.) continue to work after the content has been replaced.

## Features

- **Dynamic Content Loading**: Load only the specific part of the page instead of the whole page, making the app feel faster and more responsive.
- **AJAX Navigation**: Replace page content by fetching new HTML content without reloading the entire page.
- **History Management**: Update the browser’s history state to reflect the new URL while staying on the same page.
- **Interactive Components**: Reinitialize interactive components (like Bootstrap tooltips) after content is updated.
- **Loading Indicator**: Show a loading spinner while the content is being fetched and hide it when the content is loaded.

## How It Works

1. **Intercept Clicks on Links**: 
   - The script listens for click events on all links (`<a>` tags) and intercepts the default behavior to handle AJAX navigation.
   - It ensures that only links leading to valid URLs (not JavaScript links, empty links, or anchor links) are processed.

2. **AJAX Request**:
   - When a valid link is clicked, an AJAX `GET` request is made to the URL.
   - Upon success, the script fetches the content and extracts the new content from a specific container (`#single-page-content`).

3. **Content Replacement**:
   - The new content is used to replace the existing content inside the `#single-page-content` div.
   - All `<script>` tags from the new content are re-executed to ensure that any interactive features (e.g., tooltips, modals) continue to work.

4. **Loading Indicator**:
   - While the request is being processed, a loading indicator is displayed. The indicator is hidden once the content has been fully loaded.

5. **History Management**:
   - The browser’s history is updated with the new URL, making it possible to bookmark or share the current page state.
   - The "Back" button in the browser triggers a page reload to reset the application state.
