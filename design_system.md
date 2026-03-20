# Lingo Leap Design System

## 1. Brand Identity & Aesthetic
**Style:** Kawaii Neo-Brutalist  
A unique blend of **Kawaii** (approachable, playful, cute graphics) and **Neo-Brutalist** (bold, high-contrast, structured). It is designed to be engaging, stress-free, and fun for ESL exam (IELTS & CELPIP) students.

## 2. Color Palette
The color palette uses vibrant, flat colors to stay true to its Neo-Brutalist roots, utilizing a dark charcoal/black for high-contrast outlines and shadows.

### Core Colors
*   **Vibrant Green (Primary):** `#22C55E` – Used for primary buttons, success indicators, and the brand mascot.
*   **Soft Blue (Secondary):** `#BFDBFE` – Used for calm accents, secondary buttons, and backgrounds.
*   **Coral/Pink (Accent):** `#FCA5A5` – Used for highlights, urgent/important alerts, and energetic elements.

### Base Colors
*   **Cream/Off-White (Background):** `#F5F3F0` – Default app and page background for reduced eye strain and a paper-like feel.
*   **Pure White (Surface):** `#FFFFFF` – Used for cards, containers, and elevated elements.

### Text & Borders
*   **Dark Charcoal (Main Text):** `#1F2937` – Primary text and core outlines.
*   **Muted Grey (Muted Text):** `#6B7280` – Secondary text, descriptions, and subtle details.
*   **Solid Black (Border):** `#000000` – Mandatory for all structural borders and hard drop shadows.

## 3. Typography
**Primary Font:** `Plus Jakarta Sans`, sans-serif.

*   **Headings (H1 - H6):**
    *   **Font Weight:** `800` (Extra Bold)
    *   **Line Height:** `1.1`
    *   **Color:** Dark Charcoal (`#1F2937`)
    *   **Usage:** Bold, impactful headers. Often stylized with Kawaii visual flair (pill tags above headers).
*   **Body Text:**
    *   **Font Weight:** `400` (Regular) / `600` (Semi-bold) / `700` (Bold)
    *   **Line Height:** `1.6`
    *   **Color:** Dark Charcoal or Muted Grey depending on context.

## 4. UI Components & Neo-Brutalist Tokens

### Global Tokens
*   **Border Width:** `2px` (Solid Black)
*   **Shadow Offset:** `4px` (Hard black shadow, no blur, e.g., `4px 4px 0 0 #000000`)
*   **Radii:**
    *   `--radius-full`: `9999px` (Pills, Buttons)
    *   `--radius-lg`: `20px` (Cards, Modules)

### Buttons
All buttons feature thick black borders and sharp hover animations that provide tactile, playful feedback.
*   **Primary Button (`.btn-primary`):** Vibrant Green background, `4px 4px` solid shadow.
    *   *Interaction:* On hover, translates up/left (`-3px, -3px`), rotates `-1deg`, and increases shadow to `7px 7px`.
*   **Secondary Button (`.btn-secondary`):** White background.
    *   *Interaction:* Background changes to Soft Blue, translates up/left, shadow increases to `6px 6px`.

### Cards (`.brutalist-card`, `.feature-card`)
*   **Background:** White (`#FFFFFF`)
*   **Border:** `2px solid #000000`
*   **Corner Radius:** `20px`
*   **Shadow:** Hard offset shadow (e.g., `8px 8px 0 0 #000000`).
*   *Interaction:* Lifts (`translate(-5px, -5px)`), rotates (`rotate(1deg)`), and shadow expands (e.g., `10px 10px`).

### Pills & Tags (`.pill`)
*   **Styling:** Fully rounded (`9999px`), `2px` black border, `2px 2px` solid black drop shadow.
*   **Backgrounds:** Can vary (White, Green, or Pink/Accent).
*   **Text:** Small (`0.875rem`) and bold (`700`).

## 5. Animation & Imagery Guidelines

### Motion & Micro-interactions
*   **Playful Feedback:** Elements should feature bouncy, energetic animations.
*   **Floating Elements:** Badges and decorative icons often use `@keyframes float`, `@keyframes floatBadge1`, or `@keyframes wiggle` to constantly slowly move, giving the feeling of a living ecosystem.
*   **Attention Hooks:** Use `@keyframes pulse` or `@keyframes popIn` to highlight calls to action or score achievements.

### Imagery & Assets
*   **Flat Design Only:** No gradients, 3D shading, or soft drop-shadows. Shadows must be 100% solid.
*   **Thick Outlines:** All graphics, icons (`.icon-box`), and avatars require a prominent dark stroke (consistent `2px` border) to match the UI elements.
*   **Kawaii Embellishments:** Use floating emojis or tiny symbols (✨, ⭐, ✏️, A+) to add charm, fill empty space creatively, and break up brutalist rigidity.
