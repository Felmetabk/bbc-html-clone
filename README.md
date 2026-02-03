# BBC Homepage Clone - Project Documentation

## 1. Project Overview
This project is a high-fidelity, responsive clone of the BBC homepage, built using vanilla HTML, CSS, and JavaScript. It serves as a fully functional prototype featuring dynamic content filtering, interactive article expansion, real-time search, and a secure user authentication flow.

---

## 2. Key Features
*   **Dynamic Filtering**: Users can filter news by categories (Technology, Science, Sport, Ethiopia, etc.) using either the sticky header or the comprehensive footer navigation.
*   **Immersive Article Viewer**: Clicking any news card opens the story in a full-screen modal overlay, creating a seamless, single-page application (SPA) feel without reloading the page.
*   **Real-time Search**: A robust search bar filters articles instantly by matching titles, summaries, and category tags.
*   **Secure Auth Flow**: Includes professionally styled Sign-in and Register pages with robust client-side validation.
    *   **Secure Passwords**: Enforces complex passwords (min 8 chars, uppercase, lowercase, number, and special character) using Regex.
    *   **Email Validation**: Ensures valid email formats during registration.
    *   **Interactive Feedback**: Visual error states and descriptive messages guide users through the authentication process.
*   **Fully Responsive**: The layout fluidly adapts from a 4-column desktop grid to a single-column mobile view using CSS Grid and Flexbox.
*   **Ethiopian Spotlight**: Features a dedicated section for positive news stories related to Ethiopia.

---

## 3. File Structure
*   `index.html`: The core landing page containing the header, news grid, and footer.
*   `signin.html`: A clean login portal with integrated credential validation.
*   `register.html`: A registration page featuring advanced regex-based form validation.
*   `index.css`: Central stylesheet managing layouts, animations, and responsive breakpoints.
*   `scripts.js`: The application's "brain," handling filtering logic, interactive states, and date generation for the homepage.
*   `*.jpg / *.png`: Optimized assets for article thumbnails.

---

## 4. Technical Implementation

### CSS Architecture
*   **CSS Variables**: At the root of the stylesheet, variables like `--bbc-red` and `--bbc-black` are defined. This allows for global, one-line changes to the site's color scheme, ensuring brand consistency and making maintenance effortless.
*   **Hybrid Layout**: The page intelligently combines CSS Flexbox and Grid. Flexbox is used for one-dimensional alignment in the header and footer, perfectly arranging items in a single row. CSS Grid is used for the complex, two-dimensional news gallery, allowing articles to span multiple columns and rows gracefully.
*   **Modal Viewer Styling**: The full-screen article viewer is an excellent example of CSS positioning. The container uses `position: fixed` to break out of the normal document flow and overlay the entire viewport. A high `z-index` ensures it sits above all other content. Its visibility is toggled by changing its `opacity` from 0 to 1, with a `transition` applied to create a smooth, professional fade effect.
*   **Validation Styling**: User feedback during form validation is handled by a simple but effective `.input-error` class. When validation fails, this class is added to the input field, applying a `2px solid red` border to instantly draw the user's attention to the field that requires correction.

### JavaScript Logic
*   **Unified Filter Engine**: The `filterArticles` function is the heart of the homepage's interactivity. It simultaneously checks two things on every user interaction: the `currentCategory` selected from the navigation and the `searchTerm` from the search bar. An article is only displayed if it matches both the active category (or if "Home" is selected) and the search query, creating a powerful, intersectional filter.
*   **Dynamic Modal Implementation**: The SPA-like article viewer is achieved through efficient DOM manipulation. When a news card is clicked:
    1.  The script captures the `src` of the image and the `textContent` of the title and full story from the clicked card.
    2.  It then populates the corresponding elements inside the single, hidden `#article-viewer` container.
    3.  Finally, it adds an `.viewer-active` class to the viewer to trigger the CSS fade-in `opacity` transition and a `.body-no-scroll` class to the `<body>` to prevent background scrolling. A listener on the "close" button simply reverses these class changes.
*   **Event-Driven Form Validation**: The sign-in and registration forms provide instant, client-side feedback without a page refresh. An event listener on the submit button prevents the default form submission and instead runs a validation sequence. It tests the input values against predefined rules (e.g., a secure password regex) and populates an `errors` array with user-friendly messages for any failures. If the array is empty, the action succeeds; otherwise, the errors are displayed.
*   **Modular Isolation**: To prevent errors, script logic is carefully isolated. `scripts.js` is built exclusively for the homepage and its specific DOM elements (like the news grid). The validation logic for `signin.html` and `register.html` is kept within those files as inline scripts. This prevents the homepage script from running on pages where its target elements don't exist, which would otherwise cause crashes.

---

