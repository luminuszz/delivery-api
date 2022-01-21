import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

export default {
    moduleFileExtensions: ['js', 'json', 'ts'],
    coveragePathIgnorePatterns: ['node_modules', 'dist', 'prisma'],
    globalSetup: './scripts/setup.ts',
    rootDir: '.',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.(t|j)s$': 'ts-jest',
    },
    collectCoverageFrom: ['**/*.(service|controller|pipe|guard).(t|j)s'],
    coverageDirectory: './coverage',
    verbose: true,
    testEnvironment: 'node',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>',
    }),
} as Config.InitialOptions;
