# NAVAYR | The Intelligent Fashion Layer

**Autonomous Style Discovery, True-Fit Intelligence, and Real-Time Price Drop Radar.**

## ✦ Overview

NAVAYR is a fashion intelligence and discovery platform built to make finding, comparing, and exploring fashion more intuitive.

The project focuses on visual outfit discovery, cross-brand sizing intelligence, price tracking, curated thrift finds, and a more interactive shopping experience.

### Key Features

**Visual Search and Fit Twins**

Explore outfit inspiration from social media, street style, and fashion imagery to discover similar silhouettes and alternative pieces.

**Price Drop Radar**

A concept for tracking fashion product prices and notifying users when selected items become more affordable.

**Cross-Brand Size Intelligence**

Explore ways to compare sizing across brands and reduce the guesswork involved in choosing the right fit.

**Curated Thrift and Archive Finds**

Discover pre-loved fashion, vintage pieces, and alternative options at potentially lower prices.

**Freddy, the Interactive Mascot**

An animated style companion designed to respond to user interactions.

**Interactive Dot Matrix Footer**

A canvas-based particle grid featuring organic shape morphing, fluid transitions, and interactive cursor effects.

## ⚡ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 5 |
| Styling | Tailwind CSS, custom CSS |
| Icons | Lucide React |
| Animations | HTML5 Canvas, requestAnimationFrame |
| Backend Integration | Google Apps Script, Vercel Serverless Functions |
| Deployment | Vercel |

*The technologies and integrations listed above should be verified against the current implementation.*

## 📁 Project Structure

```text
navyr-main/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Comparison.jsx
│   │   ├── Discovery.jsx
│   │   ├── DotMatrixFooter.jsx
│   │   ├── FloatingNav.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Mascot.jsx
│   │   ├── NeverOverpay.jsx
│   │   ├── PartnershipPage.jsx
│   │   ├── SideRail.jsx
│   │   └── Waitlist.jsx
│   ├── context/
│   │   └── MascotContext.jsx
│   ├── data/
│   │   └── sections.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vercel.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### 1. Clone the Repository

```bash
git clone https://github.com/DeviPadmavathi-LE/navayr.git
cd navayr
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Locally

```bash
npm run dev
```

Open the local development URL printed in your terminal. With the default Vite configuration, this is usually:

`http://localhost:5173`

The development server supports Hot Module Replacement, allowing changes to appear in the browser as you edit the code.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

## 🔧 Integration Notes

- Configure any required environment variables before testing integrations.
- Keep API keys and private credentials out of frontend code and Git.
- Verify backend endpoints and external service connections before relying on them.
- Coordinate changes before merging into the official DripFeed repository.

## 📌 Project Status

An evolving fashion discovery project focused on visual search, price intelligence, sizing insights, and interactive experiences.



[View NAVAYR on GitHub](https://github.com/DeviPadmavathi-LE/navayr)

