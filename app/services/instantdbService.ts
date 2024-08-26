import { init, tx, id } from '@instantdb/react';
import { Schema } from '../../types/schema';

// Visit https://instantdb.com/dash to get your APP_ID :)
const db = init<Schema>({ appId: process.env.NEXT_PUBLIC_APP_ID })

export { db, tx, id };
