import { init, tx, id } from '@instantdb/react';
import { Schema } from '../../types/schema';

const db = init<Schema>({ appId: process.env.NEXT_PUBLIC_INSTANT_DB_APP_ID })

export { db, tx, id };
