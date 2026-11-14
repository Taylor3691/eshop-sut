import "./tests/ia01-general-ui.test.js";
import "./tests/ia02-forms-controls.test.js";
import "./tests/ia03-navigation.test.js";
import "./tests/ia04-feedback-state.test.js";
import { runAll } from "./lib/test-runner.js";

await runAll();
