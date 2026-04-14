Act as a Senior Product Designer and Lead UI/UX Engineer specializing in luxury SaaS platforms, cinematic digital experiences, and high-end visual asset delivery systems.

Design a production-ready web platform for:

"IVY BRIDAL" — a private, premium visual delivery system for creative studios (photography, portrait, fashion, event, commercial).

This is NOT a social platform.
This is NOT a public gallery website.

This is a CLOSED, CONTROLLED, CINEMATIC VIEWING SYSTEM where:
- Admin has full control
- Client can ONLY view what is permitted
- The experience feels like a private digital exhibition

-----------------------------------
1. STRICT VISUAL IDENTITY (DO NOT DEVIATE)
-----------------------------------

Theme:
- Dark Mode ONLY
- Cinematic, editorial, minimal, luxury

Color Palette:
- Main Background: #2C3939 (Deep Slate Teal)
- Surface/Cards: #1F2828 (Darker Slate)
- Typography & Primary Actions: #EAE6D8 (Elegant Cream)
- DO NOT use pure white (#FFFFFF)
- Avoid bright generic colors (blue links, harsh red)
- All states must be muted and refined

Typography:
- Headings / Titles: Playfair Display (Serif, cinematic, elegant)
- Body / UI: Montserrat (Light 300–400)
- Use uppercase + wide letter-spacing for labels
- Typography must feel like a fashion/editorial magazine

Layout Principles:
- Extreme negative space
- Minimal UI noise
- Photography must occupy ~90% of visual focus

Imagery:
- Use high-end editorial photography ONLY:
  - Wedding
  - Portrait
  - Fashion
  - Event
  - Commercial
- No illustrations, no flat graphics

-----------------------------------
2. CORE PRODUCT PHILOSOPHY
-----------------------------------

- The system must NOT feel like a website
- It must feel like a private cinematic viewer or digital exhibition
- No global navigation, no homepage browsing
- No cross-project discovery
- Each project is isolated

User Flow is strictly linear:
ENTER → VIEW → EXIT

No distractions, no branching paths

-----------------------------------
3. CLOSED ACCESS & SECURITY SYSTEM
-----------------------------------

- Access ONLY via private link
- No public entry points
- Each project is isolated

Authentication Screen:
- Minimal interface
- Password / PIN required
- Background: blurred cinematic image
- Focus on exclusivity and privacy

Restrictions:
- Disable right-click (where possible)
- Prevent opening images in new tabs
- Prevent unintended downloads
- No external navigation

-----------------------------------
4. ADMIN CONTROL SYSTEM (CRITICAL)
-----------------------------------

Admin has full control over visibility and permissions.

Album Lifecycle:
- Draft (hidden)
- Editing (internal)
- Delivered (accessible)
- Expired (locked / blurred)

Each state must have subtle visual indicators.

Download Permissions:
- OFF by default
- When OFF → no download UI visible at all
- When ON → allow:
  - Full album download
  - Optional individual image download

Expiration:
- Albums can auto-lock after a defined time

-----------------------------------
5. NO CLIENT INTERACTION
-----------------------------------

- No like, no comment, no favorite
- No selection tools
- No sharing features
- No social behavior

Client is strictly a viewer

-----------------------------------
6. CORE SCREENS
-----------------------------------

### SCREEN 1: ADMIN DASHBOARD (WORKSPACE)

Purpose: Efficient project management

Layout:
- Minimal header with logo
- Storage usage indicator (e.g., 450GB / 1TB)
- Search + Filter (by project title, date, status)

Primary Action:
- "Create New Project"

Content:
- Grid of Project Cards (4:3 ratio)

Each Card:
- Cover image (dark overlay)
- Project Title (Serif)
- Metadata (date, image count)
- Status badge (Draft / Delivered / etc.)

Hover:
- Reveal minimal actions:
  - Copy link
  - Archive
  - Delete

Include:
- Upload progress (subtle, cinematic)
- Bulk actions support

-----------------------------------

### SCREEN 2: AUTHENTICATION (ENTRY GATE)

- Full-screen blurred background image
- Single centered password input
- Minimal "Enter" button
- Subtle glow on focus

Tone: Exclusive, private, cinematic

-----------------------------------

### SCREEN 3: CLIENT GALLERY (CINEMATIC REVEAL)

Hero Section:
- 80vh full-width image
- Centered Project Title (Serif, large)
- Subtitle (date or description)

Sticky Bar:
- Logo (left)
- Optional "Download All" (only if enabled)

Gallery:
- Masonry layout (varying heights)
- Large spacing between images
- No borders, no shadows

Sections (optional):
- Allow grouping (e.g., Portrait / Event / Campaign)

-----------------------------------

### SCREEN 4: LIGHTBOX (THEATER MODE)

- Background: near black (#000000, 95%)
- Single centered high-resolution image

Controls:
- Close (top right)
- Download (only if enabled)

Rules:
- Stay within system (no new tabs)
- No UI clutter

-----------------------------------
7. INTERACTION & MOTION (CINEMATIC)
-----------------------------------

- Images fade in slowly (film-like reveal)
- Hover:
  - slight zoom
  - slight exposure lift
- Lightbox transition:
  - smooth crossfade (NOT instant)
- Scroll:
  - soft, inertia-like

Avoid:
- sharp, fast, mechanical animations

-----------------------------------
8. PERFORMANCE & LOADING
-----------------------------------

- Lazy load images
- Use low-quality preview → high-res transition
- Blur-to-sharp loading effect
- Optimize for large image sets

Perceived performance must feel fast and smooth

-----------------------------------
9. MOBILE EXPERIENCE (MANDATORY)
-----------------------------------

- Swipe navigation in Lightbox
- Tap to show/hide UI
- Full-screen vertical optimization
- One-hand usability

No desktop-only assumptions

-----------------------------------
10. EMOTIONAL & BRAND EXPERIENCE
-----------------------------------

Use neutral, cinematic microcopy:

Examples:
- "A curated visual collection"
- "Captured in light and time"
- "Private archive"

Avoid:
- wedding-only wording
- overly romantic assumptions

Tone must adapt to:
- Portrait
- Fashion
- Event
- Commercial

-----------------------------------
11. DESIGN SYSTEM REQUIREMENTS
-----------------------------------

- Use Auto-layout for all components
- Build reusable components:
  - Cards
  - Buttons
  - Inputs
  - Lightbox
- Maintain strict spacing consistency

-----------------------------------
OUTPUT REQUIREMENT
-----------------------------------

Generate:
- High-fidelity UI (Figma-ready)
- Clean component system
- Cinematic, luxury visual hierarchy

The final result must feel like:
A fusion of high-fashion editorial + premium digital exhibition + controlled asset delivery system.