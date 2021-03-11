struct Globals {
  1: required bool abortOnAssertionFailure,
  2: required bool abortOnElementLocateError,
  3: required i16 waitForConditionPollInterval,
  4: required i16 waitForConditionTimeout,
  5: required bool throwOnMultipleElementsReturned,
  6: required bool suppressWarningsOnMultipleElementsReturned,
  7: required i16 asyncHookTimeout,
  8: required i16 unitTestsTimeout,
  9: required i16 customReporterCallbackTimeout,
  10: required i16 retryAssertionTimeout
}

struct Empty {}

struct Selenium {
  1: required bool start_process,
  2: required Empty cli_args,
  3: optional string server_path,
  4: required string log_path,
  5: required i16 check_process_delay,
  6: required byte max_status_poll_tries,
  7: required i16 status_poll_interval
}

struct WebDriver {
  1: required bool start_process,
  2: required Empty cli_args,
  3: optional string server_path,
  4: required string log_path,
  5: required byte check_process_delay,
  6: required byte max_status_poll_tries,
  7: required i16 status_poll_interval,
  8: required i32 process_create_timeout,
  9: required Empty timeout_options
}

struct DesiredCapabilities {
  1: required string browserName
}

struct Main {
  1: optional string custom_commands_path,
  2: optional string custom_assertions_path,
  3: optional string page_objects_path,
  4: optional string globals_path,
  5: required Globals globals,
  6: required Empty dotenv,
  7: required bool persist_globals,
  8: required string output_folder,
  9: optional string src_folders,
  10: required bool live_output,
  11: required bool disable_colors,
  12: required byte parallel_process_delay,
  13: required Selenium selenium,
  14: required bool start_session,
  15: required bool end_session_on_fail,
  16: required bool test_workers,
  17: required string test_runner,
  18: required WebDriver webdriver,
  19: required Empty test_settings,
  20: required string launch_url,
  21: required bool silent,
  22: required bool output,
  23: required bool detailed_output,
  24: required bool output_timestamp,
  25: required bool disable_error_log,
  26: required bool screenshots,
  27: required bool log_screenshot_data,
  28: required DesiredCapabilities desiredCapabilities,
  29: optional string exclude,
  30: optional string filter,
  31: required string skipgroup,
  32: required bool sync_test_names,
  33: required string skiptags,
  34: required bool use_xpath,
  35: required bool parallel_mode,
  36: required string report_prefix,
  37: required bool unit_tests_mode,
  38: required string default_reporter
}
