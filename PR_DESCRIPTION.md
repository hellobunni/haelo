# Contact Form & Calendly Integration + Project Categories Enhancement

## Overview
This PR implements Calendly integration for virtual consultations, contact form email functionality, social media links, and enhances project categorization to support multiple categories.

## Features Added

### 1. Contact Form Email Integration
- ✅ Integrated Gmail SMTP using Nodemailer for sending contact form submissions
- ✅ Form submissions are sent to `hello@haelostudios.com`
- ✅ Email includes all form fields (name, email, company, budget, message)
- ✅ Reply-to is set to the form submitter's email for easy responses
- ✅ Success state replaces only the form box (not entire page) with a thank you message

### 2. Calendly Integration
- ✅ Added Calendly popup widget to contact page
- ✅ "Book a Call" section now opens Calendly scheduling modal
- ✅ Updated CTASection to support Calendly links
- ✅ Calendly URL stored in `content.json` for easy configuration

### 3. Social Media Links Component
- ✅ Created reusable `SocialLinks` component
- ✅ Supports GitHub, X (Twitter), LinkedIn, and Instagram
- ✅ Added to contact page and site footer
- ✅ Two variants: `light` (for contact page) and `dark` (for footer)
- ✅ Links stored in `content.json` for easy management

### 4. Project Categories Enhancement
- ✅ Updated projects to support multiple categories (max 3)
- ✅ Changed from single `category` string to `categories` array
- ✅ Updated filtering logic to work with multiple categories
- ✅ Category badges display all categories for each project
- ✅ Filter shows projects that match any of their categories

### 5. Content Updates
- ✅ Updated about page content (years of experience, email, bio)
- ✅ Fixed JSON syntax errors in about.json
- ✅ Added new projects to portfolio
- ✅ Updated contact page copy

### 6. UI/UX Improvements
- ✅ Improved form submission UX with inline success message
- ✅ Better error handling and user feedback
- ✅ Fixed Button component to properly handle `type="submit"`
- ✅ Added proper TypeScript types throughout

## Technical Changes

### New Files
- `src/app/api/contact/route.ts` - Contact form API endpoint
- `src/components/SocialLinks.tsx` - Reusable social media links component

### Modified Files
- `src/components/pages/contact.tsx` - Added Calendly popup, email form submission
- `src/components/pages/work.tsx` - Updated for multiple categories
- `src/components/home/SelectedWorks.tsx` - Updated for multiple categories
- `src/components/layout/site-footer/site-footer.tsx` - Added social links
- `src/components/home/CTASection.tsx` - Updated to support Calendly links
- `src/components/ui/button.tsx` - Fixed submit button type handling
- `src/types/project.ts` - Updated PortfolioProject interface
- `src/lib/data/projects.json` - Converted to categories array
- `src/lib/data/content.json` - Added Calendly URL and social links
- `src/lib/data/about.json` - Content updates and JSON fixes

### Dependencies Added
- `nodemailer` - For Gmail SMTP email sending
- `@types/nodemailer` - TypeScript types for nodemailer
- `react-calendly` - Already installed, now integrated

## Environment Variables Required

Add to `.env.local`:
```bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
CONTACT_EMAIL=hello@haelostudios.com
```

## Testing Checklist
- [x] Contact form submits successfully
- [x] Emails are received at hello@haelostudios.com
- [x] Calendly popup opens correctly
- [x] Social media links work and open in new tabs
- [x] Project filtering works with multiple categories
- [x] All category badges display correctly
- [x] Form validation works
- [x] Success state displays correctly
- [x] No linting errors

## Notes
- Gmail requires 2FA and an App Password for SMTP authentication
- Calendly URL can be updated in `content.json`
- Social media links can be added/removed in `content.json`
- Projects can have 1-3 categories maximum

## Related Issue
Closes #24 - CTA links for FinalCTA need to be connected to Calendly

