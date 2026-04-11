#!/bin/bash
# Git setup and commit history for Al Hayen website
# Run this script from the "new site" directory

cd "$(dirname "$0")"

# Configure git if needed
git config user.email "alhayen@servegategroup.com" 2>/dev/null
git config user.name "Al Hayen Dev" 2>/dev/null

# Check if repo exists
if [ ! -d ".git" ]; then
  git init
fi

# Commit 1: Initial single-page site
git add index.html css/style.css js/main.js images/ .gitignore
git commit -m "feat: initial single-page site — hero, services, why-us, projects, contact, floating CTAs

- Navy/Gold design system (The Precision Engineer)
- Glassmorphism navigation
- Hero with 3 CTA buttons (Call, WhatsApp, Get Quote)
- 4 service categories overview
- Why Choose Us section with feature list
- Projects gallery grid
- Contact form with WhatsApp integration
- Floating WhatsApp button with pulse animation
- Mobile sticky CTA bar
- Full SEO: meta tags, JSON-LD structured data
- Responsive design (mobile, tablet, desktop)"

# Commit 2: Multi-page architecture
git add services.html about.html projects.html contact.html
git commit -m "feat: split into multi-page architecture

- services.html — detailed service blocks with alternating layout
- about.html — company story, timeline, values, UAE coverage
- projects.html — filterable gallery with category filters
- contact.html — full contact page with Google Maps embed
- Updated all navigation links across pages
- Each page has consistent nav, footer, floating WhatsApp"

# Commit 3: Hero image swap
git add index.html
git commit -m "fix: swap hero image to industrial machinery photo

- Replaced ig_colkmxpncfr with fb_post2_image_05 per client request
- Better represents industrial/machine services"

# Commit 4: Enhanced counter animations
git add css/style.css
git commit -m "feat: enhanced stat counter animations

- Added scale-up bounce animation (stat-pop-in keyframes)
- Staggered animation delays for each stat
- Larger font size (2rem → 2.5rem)
- Golden text glow effect
- Hover glow intensification"

echo ""
echo "✅ Git history created successfully!"
echo ""
git log --oneline
