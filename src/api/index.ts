import { OpenAPI } from 'generated/api';

//@ts-ignore
OpenAPI.BASE = process.env.REACT_APP_API_HOST;

OpenAPI.CREDENTIALS = 'include';

OpenAPI.WITH_CREDENTIALS = true;

export * from 'generated/api';
