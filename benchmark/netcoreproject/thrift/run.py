def encode(json, schema):
    payload = schema.Main()
    payload.version = json['version']
    payload.compilationOptions = schema.CompilationOptions()
    payload.compilationOptions.warningsAsErrors = \
            json['compilationOptions']['warningsAsErrors']

    payload.dependencies = schema.Dependencies()
    payload.dependencies.microsoftBclImmutable = \
            json['dependencies']['Microsoft.Bcl.Immutable']
    payload.dependencies.microsoftAspNetConfigurationModel = \
            json['dependencies']['Microsoft.AspNet.ConfigurationModel']
    payload.dependencies.microsoftAspNetDependencyInjection = \
            json['dependencies']['Microsoft.AspNet.DependencyInjection']
    payload.dependencies.microsoftAspNetLogging = \
            json['dependencies']['Microsoft.AspNet.Logging']
    payload.dependencies.systemDataCommon = \
            json['dependencies']['System.Data.Common']

    payload.code = json['code']
    payload.frameworks = schema.Frameworks()

    payload.frameworks.net45 = schema.Net45()
    payload.frameworks.net45.dependencies = schema.Net45Dependencies()
    payload.frameworks.net45.dependencies.systemRuntime = \
            json['frameworks']['net45']['dependencies']['System.Runtime']
    payload.frameworks.net45.dependencies.systemCollections = \
            json['frameworks']['net45']['dependencies']['System.Collections']

    payload.frameworks.k10 = schema.K10()
    payload.frameworks.k10.dependencies = schema.K10Dependencies()
    payload.frameworks.k10.dependencies.systemCollections = \
            json['frameworks']['k10']['dependencies']['System.Collections']
    payload.frameworks.k10.dependencies.systemCollectionsConcurrent = \
            json['frameworks']['k10']['dependencies']['System.Collections.Concurrent']
    payload.frameworks.k10.dependencies.systemComponentModel = \
            json['frameworks']['k10']['dependencies']['System.ComponentModel']
    payload.frameworks.k10.dependencies.systemConsole = \
            json['frameworks']['k10']['dependencies']['System.Console']
    payload.frameworks.k10.dependencies.systemDiagnosticsContracts = \
            json['frameworks']['k10']['dependencies']['System.Diagnostics.Contracts']
    payload.frameworks.k10.dependencies.systemDiagnosticsDebug = \
            json['frameworks']['k10']['dependencies']['System.Diagnostics.Debug']
    payload.frameworks.k10.dependencies.systemGlobalization = \
            json['frameworks']['k10']['dependencies']['System.Globalization']
    payload.frameworks.k10.dependencies.systemLinq = \
            json['frameworks']['k10']['dependencies']['System.Linq']
    payload.frameworks.k10.dependencies.systemLinqExpressions = \
            json['frameworks']['k10']['dependencies']['System.Linq.Expressions']
    payload.frameworks.k10.dependencies.systemLinqQueryable = \
            json['frameworks']['k10']['dependencies']['System.Linq.Queryable']
    payload.frameworks.k10.dependencies.systemReflection = \
            json['frameworks']['k10']['dependencies']['System.Reflection']
    payload.frameworks.k10.dependencies.systemReflectionExtensions = \
            json['frameworks']['k10']['dependencies']['System.Reflection.Extensions']
    payload.frameworks.k10.dependencies.systemResourcesResourceManager = \
            json['frameworks']['k10']['dependencies']['System.Resources.ResourceManager']
    payload.frameworks.k10.dependencies.systemRuntime = \
            json['frameworks']['k10']['dependencies']['System.Runtime']
    payload.frameworks.k10.dependencies.systemRuntimeExtensions = \
            json['frameworks']['k10']['dependencies']['System.Runtime.Extensions']
    payload.frameworks.k10.dependencies.systemThreading = \
            json['frameworks']['k10']['dependencies']['System.Threading']
    payload.frameworks.k10.dependencies.systemThreadingTasks = \
            json['frameworks']['k10']['dependencies']['System.Threading.Tasks']
    return payload

def decode(payload):
    return {
        'version': payload.version,
        'compilationOptions': {
            'warningsAsErrors': payload.compilationOptions.warningsAsErrors
        },
        'dependencies': {
            'Microsoft.Bcl.Immutable': payload.dependencies.microsoftBclImmutable,
            'Microsoft.AspNet.ConfigurationModel': payload.dependencies.microsoftAspNetConfigurationModel,
            'Microsoft.AspNet.DependencyInjection': payload.dependencies.microsoftAspNetDependencyInjection,
            'Microsoft.AspNet.Logging': payload.dependencies.microsoftAspNetLogging,
            'System.Data.Common': payload.dependencies.systemDataCommon
        },
        'code': payload.code,
        'frameworks': {
            'net45': {
                'dependencies': {
                    'System.Runtime': payload.frameworks.net45.dependencies.systemRuntime,
                    'System.Collections': payload.frameworks.net45.dependencies.systemCollections
                }
            },
            'k10': {
                'dependencies': {
                    'System.Collections': payload.frameworks.k10.dependencies.systemCollections,
                    'System.Collections.Concurrent': payload.frameworks.k10.dependencies.systemCollectionsConcurrent,
                    'System.ComponentModel': payload.frameworks.k10.dependencies.systemComponentModel,
                    'System.Console': payload.frameworks.k10.dependencies.systemConsole,
                    'System.Diagnostics.Contracts': payload.frameworks.k10.dependencies.systemDiagnosticsContracts,
                    'System.Diagnostics.Debug': payload.frameworks.k10.dependencies.systemDiagnosticsDebug,
                    'System.Globalization': payload.frameworks.k10.dependencies.systemGlobalization,
                    'System.Linq': payload.frameworks.k10.dependencies.systemLinq,
                    'System.Linq.Expressions': payload.frameworks.k10.dependencies.systemLinqExpressions,
                    'System.Linq.Queryable': payload.frameworks.k10.dependencies.systemLinqQueryable,
                    'System.Reflection': payload.frameworks.k10.dependencies.systemReflection,
                    'System.Reflection.Extensions': payload.frameworks.k10.dependencies.systemReflectionExtensions,
                    'System.Resources.ResourceManager': payload.frameworks.k10.dependencies.systemResourcesResourceManager,
                    'System.Runtime': payload.frameworks.k10.dependencies.systemRuntime,
                    'System.Runtime.Extensions': payload.frameworks.k10.dependencies.systemRuntimeExtensions,
                    'System.Threading': payload.frameworks.k10.dependencies.systemThreading,
                    'System.Threading.Tasks': payload.frameworks.k10.dependencies.systemThreadingTasks
                }
            }
        }
    }
