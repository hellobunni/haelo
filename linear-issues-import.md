# Linear Issues: shadcn Component Replacements

## High Priority Issues

### 1. Replace alert() calls with shadcn Toast component

**Priority:** High  
**Type:** Enhancement  
**Description:**
Replace all native `alert()` calls throughout the codebase with shadcn toast notifications for better UX and consistency.

**Files to update:**

- `src/components/pages/contact.tsx` (lines 28, 39)
- `src/features/admin/components/tabs/InvoicesTab.tsx` (lines 81, 141, 184)
- `src/features/admin/components/tabs/ProjectsTab.tsx` (line 79)
- `src/features/admin/components/dialogs/PdfUploadDialog.tsx` (lines 44, 71)
- `src/features/admin/components/AdminCashboardContent.tsx` (lines 37, 43)

**Acceptance Criteria:**

- [ ] Install shadcn toast component
- [ ] Create toast utility/hook for consistent usage
- [ ] Replace all `alert()` calls with toast notifications
- [ ] Test all error and success messages display correctly
- [ ] Ensure toasts are dismissible and auto-dismiss after appropriate time

---

### 2. Replace custom error messages with shadcn Alert component

**Priority:** High  
**Type:** Enhancement  
**Description:**
Standardize all error and success message displays using shadcn Alert component instead of custom styled divs.

**Files to update:**

- `src/features/auth/components/LoginForm.tsx` (line 145-148) - custom red error box
- `src/features/admin/components/dialogs/AddInvoiceDialog.tsx` (line 267-270) - custom error message
- `src/features/admin/components/tabs/ClientsTab.tsx` (line 59-69) - custom error display
- `src/features/admin/components/dialogs/AddClientDialog.tsx` (lines 120-122, 139-141) - custom error paragraphs

**Acceptance Criteria:**

- [ ] Install shadcn alert component
- [ ] Replace all custom error message divs with Alert component
- [ ] Use appropriate Alert variants (destructive for errors, default for info)
- [ ] Ensure consistent styling across all error displays
- [ ] Test error messages display correctly in all contexts

---

### 3. Add shadcn Select component for dropdowns

**Priority:** High  
**Type:** Enhancement  
**Description:**
Replace status selection in EditInvoiceDialog (currently using Badge buttons) and add Select component for budget range and other form dropdowns.

**Files to update:**

- `src/features/admin/components/dialogs/EditInvoiceDialog.tsx` (line 135-154) - status selection using Badge buttons
- `src/components/pages/contact.tsx` - budget range input (could use Select)
- Any other locations needing dropdown/select functionality

**Acceptance Criteria:**

- [ ] Install shadcn select component
- [ ] Replace Badge button status selection with Select dropdown in EditInvoiceDialog
- [ ] Add Select for budget range in contact form (optional enhancement)
- [ ] Ensure Select components are accessible and keyboard navigable
- [ ] Test all Select components work correctly

---

### 4. Replace custom loading spinners with shadcn Skeleton component

**Priority:** High  
**Type:** Enhancement  
**Description:**
Replace custom loading spinners using Loader2 icon with shadcn Skeleton components for better loading states.

**Files to update:**

- `src/app/(dashboard)/invoices/[id]/loading.tsx` - custom Loader2 spinner
- `src/features/admin/components/tabs/ClientsTab.tsx` (line 51-56) - custom loading spinner
- `src/features/admin/components/tabs/InvoicesTab.tsx` (line 190-195) - custom loading spinner
- `src/app/(dashboard)/client-portal/page.tsx` (line 145-149) - custom loading spinner

**Acceptance Criteria:**

- [ ] Install shadcn skeleton component
- [ ] Replace all custom Loader2 spinners with appropriate Skeleton components
- [ ] Use Skeleton components that match the content structure (e.g., table rows, cards)
- [ ] Ensure loading states provide good UX feedback
- [ ] Test all loading states display correctly

---

### 5. Replace mobile menu with shadcn Sheet component

**Priority:** High  
**Type:** Enhancement  
**Description:**
Replace custom mobile menu overlay implementation with shadcn Sheet component for better accessibility and consistency.

**Files to update:**

- `src/components/layout/site-header/mobile-menu.tsx` - custom full-screen overlay

**Acceptance Criteria:**

- [ ] Install shadcn sheet component
- [ ] Replace custom mobile menu with Sheet component
- [ ] Maintain all existing functionality (navigation links, close button, etc.)
- [ ] Ensure Sheet is accessible (keyboard navigation, focus management)
- [ ] Test mobile menu works correctly on all screen sizes

---

## Medium Priority Issues

### 6. Replace custom divider with shadcn Separator component

**Priority:** Medium  
**Type:** Enhancement  
**Description:**
Replace custom divider implementation in PdfUploadDialog with shadcn Separator component.

**Files to update:**

- `src/features/admin/components/dialogs/PdfUploadDialog.tsx` (line 140-149) - "Or enter URL" divider

**Acceptance Criteria:**

- [ ] Install shadcn separator component
- [ ] Replace custom divider with Separator component
- [ ] Ensure styling matches design system
- [ ] Test separator displays correctly

---

### 7. Replace navigation pill with shadcn Popover component

**Priority:** Medium  
**Type:** Enhancement  
**Description:**
Replace custom navigation pill menu overlay with shadcn Popover component for better accessibility.

**Files to update:**

- `src/components/layout/site-header/desktop-pill-nav.tsx` - custom navigation overlay

**Acceptance Criteria:**

- [ ] Install shadcn popover component
- [ ] Replace custom navigation overlay with Popover component
- [ ] Maintain all existing navigation functionality
- [ ] Ensure Popover is accessible and keyboard navigable
- [ ] Test navigation works correctly

---

### 8. Replace status Badge selection with shadcn Radio Group

**Priority:** Medium  
**Type:** Enhancement  
**Description:**
Replace status selection using clickable Badge buttons with shadcn Radio Group component for better form semantics and accessibility.

**Files to update:**

- `src/features/admin/components/dialogs/EditInvoiceDialog.tsx` (line 135-154) - status selection using Badge buttons

**Acceptance Criteria:**

- [ ] Install shadcn radio-group component
- [ ] Replace Badge button status selection with Radio Group
- [ ] Ensure Radio Group is accessible and keyboard navigable
- [ ] Maintain existing status options (Draft, Sent, Paid, Overdue)
- [ ] Test status selection works correctly

---

### 9. Standardize empty state components

**Priority:** Medium  
**Type:** Enhancement  
**Description:**
Create a reusable empty state component to standardize "no data" displays across the application.

**Files to update:**

- `src/features/admin/components/tabs/ClientsTab.tsx` (line 110-115) - custom empty state
- `src/features/admin/components/tabs/DocumentsTab.tsx` (line 205-210) - custom empty state
- `src/app/(dashboard)/client-portal/page.tsx` (line 392-401) - custom empty state

**Acceptance Criteria:**

- [ ] Create reusable EmptyState component
- [ ] Replace all custom empty state divs with EmptyState component
- [ ] Component should accept icon, title, and description props
- [ ] Ensure consistent styling across all empty states
- [ ] Test all empty states display correctly

---

### 10. Add shadcn Form component for better validation

**Priority:** Medium  
**Type:** Enhancement  
**Description:**
Implement shadcn Form component with react-hook-form integration for better form validation and error handling.

**Files to update:**

- `src/features/admin/components/dialogs/AddClientDialog.tsx` - form validation
- `src/components/pages/contact.tsx` - contact form validation

**Acceptance Criteria:**

- [ ] Install shadcn form component and react-hook-form
- [ ] Replace manual form validation with Form component
- [ ] Implement proper error handling and display
- [ ] Ensure all form fields have proper validation rules
- [ ] Test all forms validate correctly

---

## Low Priority Issues (Nice to Have)

### 11. Add shadcn Tooltip component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add tooltips to action buttons, status badges, and icon buttons for better UX.

**Potential locations:**

- Action buttons in tables
- Status badges
- Icon buttons in admin panel

**Acceptance Criteria:**

- [ ] Install shadcn tooltip component
- [ ] Add tooltips to key interactive elements
- [ ] Ensure tooltips are accessible
- [ ] Test tooltips display correctly

---

### 12. Add shadcn Switch component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add Switch component for toggle settings in admin panel or feature flags.

**Acceptance Criteria:**

- [ ] Install shadcn switch component
- [ ] Identify use cases for Switch component
- [ ] Implement Switch where appropriate
- [ ] Test Switch components work correctly

---

### 13. Add shadcn Checkbox component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add Checkbox component for forms requiring multi-select options or terms acceptance.

**Potential use cases:**

- Terms and conditions acceptance
- Multi-select options in forms
- Filter checkboxes

**Acceptance Criteria:**

- [ ] Install shadcn checkbox component
- [ ] Implement checkboxes where needed
- [ ] Ensure checkboxes are accessible
- [ ] Test checkbox functionality

---

### 14. Add shadcn Accordion component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add Accordion component for collapsible content sections like FAQs or expandable details.

**Acceptance Criteria:**

- [ ] Install shadcn accordion component
- [ ] Identify use cases for Accordion
- [ ] Implement Accordion where appropriate
- [ ] Test Accordion functionality

---

### 15. Add shadcn Command/Palette component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add Command component for quick navigation/search functionality in admin panel.

**Acceptance Criteria:**

- [ ] Install shadcn command component
- [ ] Implement command palette for admin navigation
- [ ] Add keyboard shortcut (Cmd/Ctrl+K) to open
- [ ] Test command palette functionality

---

### 16. Add shadcn Avatar component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Add Avatar component for user profile displays and client avatars in admin panel.

**Acceptance Criteria:**

- [ ] Install shadcn avatar component
- [ ] Add avatars to user/client displays
- [ ] Ensure fallback for missing images
- [ ] Test avatar displays correctly

---

### 17. Add shadcn Scroll Area component

**Priority:** Low  
**Type:** Enhancement  
**Description:**
Replace native scrollbars with shadcn Scroll Area component for better styling consistency.

**Potential locations:**

- Dialog content with overflow
- Long lists/tables
- Sidebar navigation

**Acceptance Criteria:**

- [ ] Install shadcn scroll-area component
- [ ] Replace native scrollbars where appropriate
- [ ] Ensure Scroll Area works correctly
- [ ] Test scrolling functionality

---

## Implementation Notes

### Installation Commands

For each shadcn component, use:

```bash
npx shadcn@latest add [component-name]
```

### Components Already Installed

- ✅ Button
- ✅ Input
- ✅ Textarea
- ✅ Label
- ✅ Dialog
- ✅ Card
- ✅ Badge
- ✅ Table
- ✅ Tabs
- ✅ Progress

### Testing Checklist

- [ ] All components work in light mode
- [ ] All components work in dark mode (if applicable)
- [ ] All components are keyboard accessible
- [ ] All components are screen reader accessible
- [ ] All components match design system
- [ ] No console errors or warnings
- [ ] Performance is not degraded

---

## Import Instructions for Linear

1. Copy each issue section above
2. Create a new issue in Linear for each item
3. Set appropriate priority (High/Medium/Low)
4. Set issue type (Enhancement)
5. Add acceptance criteria as checklist items
6. Link related issues where dependencies exist
7. Assign to appropriate team member
8. Add labels: `shadcn`, `ui-components`, `refactoring`
