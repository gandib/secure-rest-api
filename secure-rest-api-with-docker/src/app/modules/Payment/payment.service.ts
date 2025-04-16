/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { join } from 'path';
import { readFileSync } from 'fs';
import { User } from '../Auth/auth.model';
import config from '../../config';
import { verifyPayment } from './payment.utils';

const initiatePayment = async (paymentData: any) => {
  const user = await User.findById(paymentData.userId);
  const transactionId = `secure-rest-api-${Date.now()}`;

  try {
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      signature_key: config.signature_key,
      tran_id: `${paymentData.userId}-${transactionId}`,
      success_url: `http://localhost:5000/api/v1/payments/confirmation?transactionId=${paymentData.userId}-${transactionId}&status=success`,
      fail_url: `http://localhost:5000/api/v1/payments/confirmation?transactionId=${paymentData.userId}-${transactionId}&status=failed`,
      cancel_url: 'http://localhost:3000/',
      amount: paymentData.amount,
      currency: 'BDT',
      desc: 'Merchant Registration Payment',
      cus_name: user?.name,
      cus_email: user?.email,
      cus_add1: 'N/A',
      cus_add2: 'N/A',
      cus_city: 'N/A',
      cus_state: 'N/A',
      cus_postcode: 'N/A',
      cus_country: 'N/A',
      cus_phone: 'N/A',
      type: 'json',
    });

    await User.findByIdAndUpdate(
      paymentData?.userId,
      { transactionId: `${paymentData.userId}-${transactionId}` },
      { new: true },
    );

    return response.data;
  } catch (err) {
    throw new Error('Payment initiation failed!');
  }
};

const paymentConfirmation = async (transactionId: string) => {
  const verifyResponse = await verifyPayment(transactionId);

  let message = '';
  const trnxId = (transactionId as string)?.split('-secure-rest-api')[0];

  if (verifyResponse && verifyResponse.pay_status === 'Successful') {
    await User.findByIdAndUpdate(trnxId, {
      paymentStatus: 'Paid',
    });

    message = 'Successfully Paid!';
  } else {
    message = 'Payment Failed!';
  }

  // const filePath = join(
  //   __dirname,
  //   '../../../../dist/app/modules/Views/confirmation.html',
  // );
  const filePath = join(__dirname, '../../../../public/confirmation.html');
  let template = readFileSync(filePath, 'utf-8');

  template = template.replace('{{message}}', message);

  return template;
};

export const paymentServices = {
  initiatePayment,
  paymentConfirmation,
};
