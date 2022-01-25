import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../tsconfig.json';

export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    globalSetup: '../scripts/setup.e2e.ts',
    globalTeardown: '../scripts/teardown.e2e.ts',
    testEnvironment: 'node',
    testRegex: '.e2e-spec.ts$',
    verbose: true,
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/../',
    }),
} as Config.InitialOptions;
