import Ajv from 'ajv';

const ajv = new Ajv();

export function validateSchema(schema: any, data: any) {
    try {
        expect(ajv.validate(schema, data)).toBeTruthy();
    } catch (err) {
        throw new Error(ajv.errorsText());
    }
}
