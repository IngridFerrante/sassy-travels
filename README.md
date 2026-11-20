# Sarine e amici - Italy

A responsive, English-language travel guide for sharing Italian city highlights, general itinerary inspiration and recommendations for Milano, Modena, Napoli and Roma.

## Open the guide

Open `index.html` in your browser, or visit the GitHub Pages site after deployment. No dependencies are required. In **Files**, open the public city-guide PDF or Word document.

## Public and private files

Only the general city guides are included in `public-files/` and shared on the public website.

Personal travel attachments (flight, hotel, train and restaurant confirmations) remain in the local `travel-files/` folder. This folder is excluded from Git. Do not publish or share booking references, passenger names, exact travel dates or reservation documents.

## Customization

- `data.js`: itinerary, dates, recommendations, checklist and attachment index.
- `app.js`: navigation, document filters, search and guide rendering.
- `assets/sassy.css`: Italy-specific components; `assets/styles.css` provides the responsive design.
- `docs/`: sanitized GitHub Pages build; contains only public site files and general travel guides.
