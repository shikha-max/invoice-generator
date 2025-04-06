import { createSlice } from '@reduxjs/toolkit';

const invoice = createSlice({
    name: 'Invoice',
    initialState: {
        invoiceList: {},
        values: {},
        messages: {},
        modal: [],
        loaderKeys: {},
        layoutType: 'vertical',
        layoutWidth: 'fluid',
        leftSideBarTheme: 'dark',
        leftSideBarType: 'default',
        topbarTheme: 'light',
    },
    reducers: {
        addInvoices: (state, action) => {
            state.invoiceList = action.payload;
        },
        addInvoice: (state, action) => {
            state.invoiceList[action.payload.id] =  action.payload
          },
        valueChange: (state, action) => {
            const [key, value] = action.payload;
            state.values[key] = value;
        },
       
        closeModal: (state) => {
            state.modal.pop();
        },
        openModal: (state, action) => {
            state.modal.push({
                options: action.payload.options || {},
                content: action.payload.content
            });
        },
        deletInvoice : (state,action)=>{
            delete state.invoiceList[action.payload]
        }
    }
});

export const {
    addLicenseData,
    addSelectedLicense,
    valueChange,
    openModal,
    addInvoice,
    addInvoices,
    closeModal,
    deletInvoice
} = invoice.actions;

export default invoice.reducer;
