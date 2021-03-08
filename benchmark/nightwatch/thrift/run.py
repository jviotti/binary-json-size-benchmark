def encode(json, schema):
    payload = schema.Main()

    payload.custom_commands_path = json['custom_commands_path']
    payload.custom_assertions_path = json['custom_assertions_path']
    payload.page_objects_path = json['page_objects_path']
    payload.globals_path = json['globals_path']

    payload.globals = schema.Globals()
    payload.globals.abortOnAssertionFailure = json['globals']['abortOnAssertionFailure']
    payload.globals.abortOnElementLocateError = json['globals']['abortOnElementLocateError']
    payload.globals.waitForConditionPollInterval = json['globals']['waitForConditionPollInterval']
    payload.globals.waitForConditionTimeout = json['globals']['waitForConditionTimeout']
    payload.globals.throwOnMultipleElementsReturned = json['globals']['throwOnMultipleElementsReturned']
    payload.globals.suppressWarningsOnMultipleElementsReturned = json['globals']['suppressWarningsOnMultipleElementsReturned']
    payload.globals.asyncHookTimeout = json['globals']['asyncHookTimeout']
    payload.globals.unitTestsTimeout = json['globals']['unitTestsTimeout']
    payload.globals.customReporterCallbackTimeout = json['globals']['customReporterCallbackTimeout']
    payload.globals.retryAssertionTimeout = json['globals']['retryAssertionTimeout']

    payload.dotenv = schema.Empty()
    payload.persist_globals = json['persist_globals']
    payload.output_folder = json['output_folder']
    payload.src_folders = json['src_folders']
    payload.live_output = json['live_output']
    payload.disable_colors = json['disable_colors']
    payload.parallel_process_delay = json['parallel_process_delay']

    payload.selenium = schema.Selenium()
    payload.selenium.start_process = json['selenium']['start_process']
    payload.selenium.cli_args = schema.Empty()
    payload.selenium.server_path = json['selenium']['server_path']
    payload.selenium.log_path = json['selenium']['log_path']
    payload.selenium.check_process_delay = json['selenium']['check_process_delay']
    payload.selenium.max_status_poll_tries = json['selenium']['max_status_poll_tries']
    payload.selenium.status_poll_interval = json['selenium']['status_poll_interval']

    payload.start_session = json['start_session']
    payload.end_session_on_fail = json['end_session_on_fail']
    payload.test_workers = json['test_workers']
    payload.test_runner = json['test_runner']

    payload.webdriver = schema.WebDriver()
    payload.webdriver.start_process = json['webdriver']['start_process']
    payload.webdriver.cli_args = schema.Empty()
    payload.webdriver.server_path = json['webdriver']['server_path']
    payload.webdriver.log_path = json['webdriver']['log_path']
    payload.webdriver.check_process_delay = json['webdriver']['check_process_delay']
    payload.webdriver.max_status_poll_tries = json['webdriver']['max_status_poll_tries']
    payload.webdriver.status_poll_interval = json['webdriver']['status_poll_interval']
    payload.webdriver.process_create_timeout = json['webdriver']['process_create_timeout']
    payload.webdriver.timeout_options = schema.Empty()

    payload.test_settings = schema.Empty()
    payload.launch_url = json['launch_url']
    payload.silent = json['silent']
    payload.output = json['output']
    payload.detailed_output = json['detailed_output']
    payload.output_timestamp = json['output_timestamp']
    payload.disable_error_log = json['disable_error_log']
    payload.screenshots = json['screenshots']
    payload.log_screenshot_data = json['log_screenshot_data']

    payload.desiredCapabilities = schema.DesiredCapabilities()
    payload.desiredCapabilities.browserName = json['desiredCapabilities']['browserName']

    payload.exclude = json['exclude']
    payload.filter = json['filter']
    payload.skipgroup = json['skipgroup']
    payload.sync_test_names = json['sync_test_names']
    payload.skiptags = json['skiptags']
    payload.use_xpath = json['use_xpath']
    payload.parallel_mode = json['parallel_mode']
    payload.report_prefix = json['report_prefix']
    payload.unit_tests_mode = json['unit_tests_mode']
    payload.default_reporter = json['default_reporter']

    return payload

def decode(payload):
    return {
      'custom_commands_path': payload.custom_commands_path,
      'custom_assertions_path': payload.custom_assertions_path,
      'page_objects_path': payload.page_objects_path,
      'globals_path': payload.globals_path,
      'globals': {
        'abortOnAssertionFailure': payload.globals.abortOnAssertionFailure,
        'abortOnElementLocateError': payload.globals.abortOnElementLocateError,
        'waitForConditionPollInterval': payload.globals.waitForConditionPollInterval,
        'waitForConditionTimeout': payload.globals.waitForConditionTimeout,
        'throwOnMultipleElementsReturned': payload.globals.throwOnMultipleElementsReturned,
        'suppressWarningsOnMultipleElementsReturned': payload.globals.suppressWarningsOnMultipleElementsReturned,
        'asyncHookTimeout': payload.globals.asyncHookTimeout,
        'unitTestsTimeout': payload.globals.unitTestsTimeout,
        'customReporterCallbackTimeout': payload.globals.customReporterCallbackTimeout,
        'retryAssertionTimeout': payload.globals.retryAssertionTimeout
      },
      'dotenv': payload.dotenv.__dict__,
      'persist_globals': payload.persist_globals,
      'output_folder': payload.output_folder,
      'src_folders': payload.src_folders,
      'live_output': payload.live_output,
      'disable_colors': payload.disable_colors,
      'parallel_process_delay': payload.parallel_process_delay,
      'selenium': {
        'start_process': payload.selenium.start_process,
        'cli_args': payload.selenium.cli_args.__dict__,
        'server_path': payload.selenium.server_path,
        'log_path': payload.selenium.log_path,
        'check_process_delay': payload.selenium.check_process_delay,
        'max_status_poll_tries': payload.selenium.max_status_poll_tries,
        'status_poll_interval': payload.selenium.status_poll_interval
      },
      'start_session': payload.start_session,
      'end_session_on_fail': payload.end_session_on_fail,
      'test_workers': payload.test_workers,
      'test_runner': payload.test_runner,
      'webdriver': {
        'start_process': payload.webdriver.start_process,
        'cli_args': payload.webdriver.cli_args.__dict__,
        'server_path': payload.webdriver.server_path,
        'log_path': payload.webdriver.log_path,
        'check_process_delay': payload.webdriver.check_process_delay,
        'max_status_poll_tries': payload.webdriver.max_status_poll_tries,
        'status_poll_interval': payload.webdriver.status_poll_interval,
        'process_create_timeout': payload.webdriver.process_create_timeout,
        'timeout_options': payload.webdriver.timeout_options.__dict__
      },
      'test_settings': payload.test_settings.__dict__,
      'launch_url': payload.launch_url,
      'silent': payload.silent,
      'output': payload.output,
      'detailed_output': payload.detailed_output,
      'output_timestamp': payload.output_timestamp,
      'disable_error_log': payload.disable_error_log,
      'screenshots': payload.screenshots,
      'log_screenshot_data': payload.log_screenshot_data,
      'desiredCapabilities': {
        'browserName': payload.desiredCapabilities.browserName
      },
      'exclude': payload.exclude,
      'filter': payload.filter,
      'skipgroup': payload.skipgroup,
      'sync_test_names': payload.sync_test_names,
      'skiptags': payload.skiptags,
      'use_xpath': payload.use_xpath,
      'parallel_mode': payload.parallel_mode,
      'report_prefix': payload.report_prefix,
      'unit_tests_mode': payload.unit_tests_mode,
      'default_reporter': payload.default_reporter
    }
