import Ajv from 'ajv';
import { apiLogger } from '../config/logger.config';

const ajv = new Ajv();

export function validateSchema(schema: any, data: any) {
    try {
        apiLogger.info(`Validating schema: \n${JSON.stringify(schema)} \n with data: \n${JSON.stringify(data)}`);
        expect(ajv.validate(schema, data)).toBeTruthy();
        apiLogger.info('Schema is valid !');
    } catch (err) {
        apiLogger.error(`Schema validation error ${ajv.errorsText()}`);
        throw new Error(ajv.errorsText());
    }
}
