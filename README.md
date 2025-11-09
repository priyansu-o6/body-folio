Welcome to Body-Folio

## Project info



1. User Authentication (Login)

Users can log in to access their dashboard and health data.

Provides a secure entry point for the app (placeholder in current prototype).

2. Dashboard

Displays a summary of the user’s data and options to navigate to other features.

Acts as the central hub for quick access.

3. Add Vitals

Users can input key health measurements:

Heart Rate (bpm)

SpO2 (%)

Blood Pressure (Systolic/Diastolic)

Temperature (°F)

Data is stored in the backend.

Includes a live display of all previously recorded vitals, fetched from the backend.

Supports dynamic updates, so the latest vitals are displayed immediately after submission.

4. Device Sync

Allows connecting with health devices such as Fitbit, Google Fit, or uploading CSV files.

Mock sync functionality implemented (logs to console and shows toast notifications).

5. API Integration

Frontend communicates with backend via REST endpoints:

POST /api/vitals → to save vitals

GET /api/vitals → to fetch all vitals

Supports CORS, allowing the frontend (Vite) and backend (Express) to run on different ports.

6. Notifications & Feedback

Uses Sonner toast notifications for success or error messages.

Provides immediate feedback on data submission or device sync actions.

7. Health Check

Backend has a /health endpoint returning { status: "ok" }.

Useful to verify server connectivity.

8. Modular & Extensible

Frontend uses React with Vite and a component-based structure:

Components: Header, Card, Dialog, Input, Button, etc.

Pages: AddVitals, Dashboard, Appointments, Reports.

Easy to extend with new features (like appointments, reports, or SOS alerts).

9. Prototype-Ready

Can be run locally on localhost, with both frontend and backend working together.

Ready to demonstrate data entry, storage, and live display.

