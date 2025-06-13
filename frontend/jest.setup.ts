// jest.setup.ts
import '@testing-library/jest-dom';

// Optional: Mock next/router if using Next.js
// import { useRouter } from 'next/router';
// jest.mock('next/router', () => ({
//   useRouter: jest.fn(),
// }));

// Optional: Silence console.error for specific warnings
// const originalError = console.error;
// beforeAll(() => {
//   console.error = (...args) => {
//     if (/Warning.*not wrapped in act/.test(args[0])) {
//       return;
//     }
//     originalError.call(console, ...args);
//   };
// });
// afterAll(() => {
//   console.error = originalError;
// });
