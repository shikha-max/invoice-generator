import { configureStore } from '@reduxjs/toolkit';
import invoice from './invoiceReducer'; // ✅ Import LicenseState
export const store = configureStore({
    reducer: {
        invoice: invoice,
    },
});
