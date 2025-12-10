import dotenv from 'dotenv';
import { Eventop } from '@eventop/sdk';

const evenApikey = process.env.EVENTOP_API_KEY;
if (!evenApikey) {
  throw new Error('EVENTOP_API_KEY is not set');
}

export const eventop = new Eventop({
  apiKey: evenApikey,
});

export const PLANS = {
  basic: {
    id: 'miuqwtoz-gyc75d2y',
    name: 'Basic',
    price: 0.40,
    interval: 'month',
    features: [
      'HD streaming',
      '1 device at a time',
      'Unlimited movies & TV shows',
      'Cancel anytime'
    ]
  },
  standard: {
    id: 'miu41lsc-78ssn2d4',
    name: 'Standard',
    price: 5,
    interval: 'month',
    features: [
      'Full HD streaming',
      '2 devices at a time',
      'Unlimited movies & TV shows',
      'Download on 2 devices',
      'Cancel anytime'
    ]
  },
  // premium: {
  //   id: 'premium-monthly',
  //   name: 'Premium',
  //   price: 19.99,
  //   interval: 'month',
  //   features: [
  //     '4K + HDR streaming',
  //     '4 devices at a time',
  //     'Unlimited movies & TV shows',
  //     'Download on 4 devices',
  //     'Cancel anytime'
  //   ]
  // }
};