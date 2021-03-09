struct CompilationOptions {
  1: required bool warningsAsErrors
}

struct Dependencies {
  1: required string microsoftBclImmutable,
  2: required string microsoftAspNetConfigurationModel,
  3: required string microsoftAspNetDependencyInjection,
  4: required string microsoftAspNetLogging,
  5: required string systemDataCommon
}

struct Net45Dependencies {
  1: required string systemRuntime,
  2: required string systemCollections
}

struct K10Dependencies {
  1: required string systemCollections,
  2: required string systemCollectionsConcurrent,
  3: required string systemComponentModel,
  4: required string systemConsole,
  5: required string systemDiagnosticsContracts,
  6: required string systemDiagnosticsDebug,
  7: required string systemGlobalization,
  8: required string systemLinq,
  9: required string systemLinqExpressions,
  10: required string systemLinqQueryable,
  11: required string systemReflection,
  12: required string systemReflectionExtensions,
  13: required string systemResourcesResourceManager,
  14: required string systemRuntime,
  15: required string systemRuntimeExtensions,
  16: required string systemThreading,
  17: required string systemThreadingTasks
}

struct Net45 {
  1: required Net45Dependencies dependencies
}

struct K10 {
  1: required K10Dependencies dependencies
}

struct Frameworks {
  1: required Net45 net45,
  2: required K10 k10
}

struct Main {
  1: required string version,
  2: required CompilationOptions compilationOptions,
  3: required Dependencies dependencies,
  4: required string code,
  5: required Frameworks frameworks
}
