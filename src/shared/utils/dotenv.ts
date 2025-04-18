import * as path from 'path';
import { config } from 'dotenv';

// Initializing dotenv
const envPath: string = path.resolve(__dirname, '../../../.env');
config({ path: envPath });
