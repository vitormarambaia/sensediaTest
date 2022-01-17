import TestCaseHookDefinition from '@cucumber/cucumber/lib/models/test_step_hook_definition';
import { messages } from '@cucumber/messages';
export interface Spec {
    document: messages.GherkinDocument.IFeature;
    afterEach: TestCaseHookDefinition[];
    afterAll: TestCaseHookDefinition[];
    beforeEach: TestCaseHookDefinition[];
    beforeAll: TestCaseHookDefinition[];
    skip: Boolean;
    suites: any;
}
export declare function parseSuite(cwd: any, feature: string, extensions: string[], cucumberSupportCode: any): Spec;
