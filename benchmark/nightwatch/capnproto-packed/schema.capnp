@0xe6ed5ee6788b7f50;

struct Globals {
  abortOnAssertionFailure @0 :Bool;
  abortOnElementLocateError @1 :Bool;
  waitForConditionPollInterval @2 :UInt16;
  waitForConditionTimeout @3 :UInt16;
  throwOnMultipleElementsReturned @4 :Bool;
  suppressWarningsOnMultipleElementsReturned @5 :Bool;
  asyncHookTimeout @6 :UInt16;
  unitTestsTimeout @7 :UInt16;
  customReporterCallbackTimeout @8 :UInt16;
  retryAssertionTimeout @9 :UInt16;
}

struct Empty {}

struct Selenium {
  startProcess @0 :Bool;
  cliArgs @1 :Empty;
  serverPath @2 :Void;
  logPath @3 :Text;
  checkProcessDelay @4 :UInt16;
  maxStatusPollTries @5 :UInt16;
  statusPollInterval @6 :UInt16;
}

struct WebDriver {
  startProcess @0 :Bool;
  cliArgs @1 :Empty;
  serverPath @2 :Void;
  logPath @3 :Text;
  checkProcessDelay @4 :UInt16;
  maxStatusPollTries @5 :UInt16;
  statusPollInterval @6 :UInt16;
  processCreateTimeout @7 :UInt32;
  timeoutOptions @8 :Empty;
}

struct DesiredCapabilities {
  browserName @0 :Text;
}

struct Main {
  customCommandsPath @0 :Void;
  customAssertionsPath @1 :Void;
  pageObjectsPath @2 :Void;
  globalsPath @3 :Void;
  globals @4 :Globals;
  dotenv @5 :Empty;
  persistGlobals @6 :Bool;
  outputFolder @7 :Text;
  srcFolders @8 :Void;
  liveOutput @9 :Bool;
  disableColors @10 :Bool;
  parallelProcessDelay @11 :UInt16;
  selenium @12 :Selenium;
  startSession @13 :Bool;
  endSessionOnFail @14 :Bool;
  testWorkers @15 :Bool;
  testRunner @16 :Text;
  webdriver @17 :WebDriver;
  testSettings @18 :Empty;
  launchUrl @19 :Text;
  silent @20 :Bool;
  output @21 :Bool;
  detailedOutput @22 :Bool;
  outputTimestamp @23 :Bool;
  disableErrorLog @24 :Bool;
  screenshots @25 :Bool;
  logScreenshotData @26 :Bool;
  desiredCapabilities @27 :DesiredCapabilities;
  exclude @28 :Void;
  filter @29 :Void;
  skipgroup @30 :Text;
  syncTestNames @31 :Bool;
  skiptags @32 :Text;
  useXpath @33 :Bool;
  parallelMode @34 :Bool;
  reportPrefix @35 :Text;
  unitTestsMode @36 :Bool;
  defaultReporter @37 :Text;
}
