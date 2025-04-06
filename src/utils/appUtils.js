import { DASHBOARD, INVOICES } from "../constants/routeConstant";
import {  faDesktop, faGear } from '@fortawesome/free-solid-svg-icons';
import { OPEN_INVOICE_MODAL } from "../constants/modalConstant";
import { openModal } from "../store/invoiceReducer";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export function getSideBarContents() {
    const menu = [
      // { label: 'Dashboard', to: DASHBOARD, icon: faDesktop, isActivePath: [DASHBOARD], hasChildren: false },
      { label: 'Invoice',
        to: INVOICES,
        icon: faGear,
        isActivePath: [INVOICES],
        hasSubMenu: false,
       
      },
    ];
    return menu;
  }


export const OpenInvoice = () => {
  return (dispatch,getState) =>{
    const modalOpt = {options : { title:"Create New Invoice", size:"lg"}, content:OPEN_INVOICE_MODAL}
    dispatch(openModal(modalOpt))
  }
}



export function getValue(key, values) {
  const ret = values[key];
  return typeof ret === 'undefined' ? '' : ret;
}

export const downloadInvoicePDF = () => {
  const input = document.getElementById('invoice-to-pdf');
  html2canvas(input, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice.pdf');
  });
};