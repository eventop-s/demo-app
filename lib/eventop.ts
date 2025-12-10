import dotenv from 'dotenv';
import { Eventop } from '@eventop/sdk';

const evenApikey = process.env.EVENTOP_API_KEY;
if (!evenApikey) {
  throw new Error('EVENTOP_API_KEY is not set');
}

export const eventop = new Eventop({
  apiKey: evenApikey,
});