import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { paymentServices } from './payment.service';
import sendResponse from '../../utils/sendResponse';

const initiatePayment = catchAsync(async (req, res) => {
  const result = await paymentServices.initiatePayment(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Payment initiated successfully',
    data: result,
  });
});

const paymentConfirmation = catchAsync(async (req, res) => {
  const { transactionId } = req.query;

  const result = await paymentServices.paymentConfirmation(
    transactionId as string,
  );

  res.send(result);
});

export const paymentControllers = {
  initiatePayment,
  paymentConfirmation,
};
