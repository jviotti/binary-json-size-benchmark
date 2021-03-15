@0xfb7930e4f49c50cd;

struct CompilationOptions {
  warningsAsErrors @0 :Bool;
}

struct Dependencies {
  microsoftBclImmutable @0 :Text;
  microsoftAspNetConfigurationModel @1 :Text;
  microsoftAspNetDependencyInjection @2 :Text;
  microsoftAspNetLogging @3 :Text;
  systemDataCommon @4 :Text;
}

struct Net45Dependencies {
  systemRuntime @0 :Text;
  systemCollections @1 :Text;
}

struct K10Dependencies {
  systemCollections @0 :Text;
  systemCollectionsConcurrent @1 :Text;
  systemComponentModel @2 :Text;
  systemConsole @3 :Text;
  systemDiagnosticsContracts @4 :Text;
  systemDiagnosticsDebug @5 :Text;
  systemGlobalization @6 :Text;
  systemLinq @7 :Text;
  systemLinqExpressions @8 :Text;
  systemLinqQueryable @9 :Text;
  systemReflection @10 :Text;
  systemReflectionExtensions @11 :Text;
  systemResourcesResourceManager @12 :Text;
  systemRuntime @13 :Text;
  systemRuntimeExtensions @14 :Text;
  systemThreading @15 :Text;
  systemThreadingTasks @16 :Text;
}

struct Net45 {
  dependencies @0 :Net45Dependencies;
}

struct K10 {
  dependencies @0 :K10Dependencies;
}

struct Frameworks {
  net45 @0 :Net45;
  k10 @1 :K10;
}

struct Main {
  version @0 :Text;
  compilationOptions @1 :CompilationOptions;
  dependencies @2 :Dependencies;
  code @3 :Text;
  frameworks @4 :Frameworks;
}
