import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const convertVoidPaymentToRegistrationForm = (voidedPayment: any, mdt: string) => {
  // vaccc

  var vaccinTypePayment = [];
  for (let i in voidedPayment.PaymentVaccDetail) {
    // let dataGetByIdMedic = await priceListApi.getByIdPayment(
    //   voidedPayment.PaymentVaccDetail[i].MedicineId
    // );
    // console.log('dataGetByIdMedic', dataGetByIdMedic?.data?.usesMedDetail.);
    var vaccinTypePaymentItem = {
      vaccineTypeId: voidedPayment.PaymentVaccDetail[i].MedicineId,
      medicineId: voidedPayment.PaymentVaccDetail[i].MedicineId,
      quantity: voidedPayment.PaymentVaccDetail[i].Quantity,
    };
    vaccinTypePayment.push(vaccinTypePaymentItem);
  }
  // voidedPayment.PaymentVaccDetail = [...paymentVaccData];
  // console.log('dataVaccine.paymentVaccData', dataVaccine.paymentVaccData);
  //sêrvice
  var vaccinServicePayment = [];
  for (let i in voidedPayment.PaymentServiceDetail) {
    var vaccinServicePaymentItem = {
      serviceId: voidedPayment.PaymentServiceDetail[i].PaymentServiceId,
      quantity: voidedPayment.PaymentServiceDetail[i].Quantity,
    };
    vaccinServicePayment.push(vaccinServicePaymentItem);
  }
  // dataVaccine.paymentServiceData = [...paymentServiceData];
  // console.log('dataVaccine.paymentVaccData', dataVaccine.paymentServiceData);
  // dataVaccine.total = phieuCu.TotalPrice;

  return {
    mdt: mdt,
    vaccinTypePayment: [...vaccinTypePayment],
    vaccinServicePayment: [...vaccinServicePayment],
  };
};

export const checkStatusIsFive = (data: any) => {
  for (let i in data) {
    const numericI = i as unknown as number;
    if (numericI !== 5) {
      return false;
    }
  }
  return true;
};
