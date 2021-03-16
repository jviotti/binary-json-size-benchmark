
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/netcoreproject/bond/schema.bond
//   Output filename: schema_types.h
//
// Changes to this file may cause incorrect behavior and will be lost when
// the code is regenerated.
// <auto-generated />
//------------------------------------------------------------------------------

#pragma once

#include <bond/core/bond_version.h>

#if BOND_VERSION < 0x0902
#error This file was generated by a newer version of the Bond compiler and is incompatible with your version of the Bond library.
#endif

#if BOND_MIN_CODEGEN_VERSION > 0x0c10
#error This file was generated by an older version of the Bond compiler and is incompatible with your version of the Bond library.
#endif

#include <bond/core/config.h>
#include <bond/core/containers.h>



namespace benchmark
{
    
    struct CompilationOptions
    {
        bool warningsAsErrors;
        
        CompilationOptions()
          : warningsAsErrors()
        {
        }

        
        // Compiler generated copy ctor OK
        CompilationOptions(const CompilationOptions&) = default;
        
        CompilationOptions(CompilationOptions&&) = default;
        
        
        // Compiler generated operator= OK
        CompilationOptions& operator=(const CompilationOptions&) = default;
        CompilationOptions& operator=(CompilationOptions&&) = default;

        bool operator==(const CompilationOptions& other) const
        {
            return true
                && (warningsAsErrors == other.warningsAsErrors);
        }

        bool operator!=(const CompilationOptions& other) const
        {
            return !(*this == other);
        }

        void swap(CompilationOptions& other)
        {
            using std::swap;
            swap(warningsAsErrors, other.warningsAsErrors);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::CompilationOptions& left, ::benchmark::CompilationOptions& right)
    {
        left.swap(right);
    }

    
    struct Dependencies
    {
        std::string microsoftBclImmutable;
        std::string microsoftAspNetConfigurationModel;
        std::string microsoftAspNetDependencyInjection;
        std::string microsoftAspNetLogging;
        std::string systemDataCommon;
        
        Dependencies()
        {
        }

        
        // Compiler generated copy ctor OK
        Dependencies(const Dependencies&) = default;
        
        Dependencies(Dependencies&&) = default;
        
        
        // Compiler generated operator= OK
        Dependencies& operator=(const Dependencies&) = default;
        Dependencies& operator=(Dependencies&&) = default;

        bool operator==(const Dependencies& other) const
        {
            return true
                && (microsoftBclImmutable == other.microsoftBclImmutable)
                && (microsoftAspNetConfigurationModel == other.microsoftAspNetConfigurationModel)
                && (microsoftAspNetDependencyInjection == other.microsoftAspNetDependencyInjection)
                && (microsoftAspNetLogging == other.microsoftAspNetLogging)
                && (systemDataCommon == other.systemDataCommon);
        }

        bool operator!=(const Dependencies& other) const
        {
            return !(*this == other);
        }

        void swap(Dependencies& other)
        {
            using std::swap;
            swap(microsoftBclImmutable, other.microsoftBclImmutable);
            swap(microsoftAspNetConfigurationModel, other.microsoftAspNetConfigurationModel);
            swap(microsoftAspNetDependencyInjection, other.microsoftAspNetDependencyInjection);
            swap(microsoftAspNetLogging, other.microsoftAspNetLogging);
            swap(systemDataCommon, other.systemDataCommon);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Dependencies& left, ::benchmark::Dependencies& right)
    {
        left.swap(right);
    }

    
    struct Net45Dependencies
    {
        std::string systemRuntime;
        std::string systemCollections;
        
        Net45Dependencies()
        {
        }

        
        // Compiler generated copy ctor OK
        Net45Dependencies(const Net45Dependencies&) = default;
        
        Net45Dependencies(Net45Dependencies&&) = default;
        
        
        // Compiler generated operator= OK
        Net45Dependencies& operator=(const Net45Dependencies&) = default;
        Net45Dependencies& operator=(Net45Dependencies&&) = default;

        bool operator==(const Net45Dependencies& other) const
        {
            return true
                && (systemRuntime == other.systemRuntime)
                && (systemCollections == other.systemCollections);
        }

        bool operator!=(const Net45Dependencies& other) const
        {
            return !(*this == other);
        }

        void swap(Net45Dependencies& other)
        {
            using std::swap;
            swap(systemRuntime, other.systemRuntime);
            swap(systemCollections, other.systemCollections);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Net45Dependencies& left, ::benchmark::Net45Dependencies& right)
    {
        left.swap(right);
    }

    
    struct K10Dependencies
    {
        std::string systemCollections;
        std::string systemCollectionsConcurrent;
        std::string systemComponentModel;
        std::string systemConsole;
        std::string systemDiagnosticsContracts;
        std::string systemDiagnosticsDebug;
        std::string systemGlobalization;
        std::string systemLinq;
        std::string systemLinqExpressions;
        std::string systemLinqQueryable;
        std::string systemReflection;
        std::string systemReflectionExtensions;
        std::string systemResourcesResourceManager;
        std::string systemRuntime;
        std::string systemRuntimeExtensions;
        std::string systemThreading;
        std::string systemThreadingTasks;
        
        K10Dependencies()
        {
        }

        
        // Compiler generated copy ctor OK
        K10Dependencies(const K10Dependencies&) = default;
        
        K10Dependencies(K10Dependencies&&) = default;
        
        
        // Compiler generated operator= OK
        K10Dependencies& operator=(const K10Dependencies&) = default;
        K10Dependencies& operator=(K10Dependencies&&) = default;

        bool operator==(const K10Dependencies& other) const
        {
            return true
                && (systemCollections == other.systemCollections)
                && (systemCollectionsConcurrent == other.systemCollectionsConcurrent)
                && (systemComponentModel == other.systemComponentModel)
                && (systemConsole == other.systemConsole)
                && (systemDiagnosticsContracts == other.systemDiagnosticsContracts)
                && (systemDiagnosticsDebug == other.systemDiagnosticsDebug)
                && (systemGlobalization == other.systemGlobalization)
                && (systemLinq == other.systemLinq)
                && (systemLinqExpressions == other.systemLinqExpressions)
                && (systemLinqQueryable == other.systemLinqQueryable)
                && (systemReflection == other.systemReflection)
                && (systemReflectionExtensions == other.systemReflectionExtensions)
                && (systemResourcesResourceManager == other.systemResourcesResourceManager)
                && (systemRuntime == other.systemRuntime)
                && (systemRuntimeExtensions == other.systemRuntimeExtensions)
                && (systemThreading == other.systemThreading)
                && (systemThreadingTasks == other.systemThreadingTasks);
        }

        bool operator!=(const K10Dependencies& other) const
        {
            return !(*this == other);
        }

        void swap(K10Dependencies& other)
        {
            using std::swap;
            swap(systemCollections, other.systemCollections);
            swap(systemCollectionsConcurrent, other.systemCollectionsConcurrent);
            swap(systemComponentModel, other.systemComponentModel);
            swap(systemConsole, other.systemConsole);
            swap(systemDiagnosticsContracts, other.systemDiagnosticsContracts);
            swap(systemDiagnosticsDebug, other.systemDiagnosticsDebug);
            swap(systemGlobalization, other.systemGlobalization);
            swap(systemLinq, other.systemLinq);
            swap(systemLinqExpressions, other.systemLinqExpressions);
            swap(systemLinqQueryable, other.systemLinqQueryable);
            swap(systemReflection, other.systemReflection);
            swap(systemReflectionExtensions, other.systemReflectionExtensions);
            swap(systemResourcesResourceManager, other.systemResourcesResourceManager);
            swap(systemRuntime, other.systemRuntime);
            swap(systemRuntimeExtensions, other.systemRuntimeExtensions);
            swap(systemThreading, other.systemThreading);
            swap(systemThreadingTasks, other.systemThreadingTasks);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::K10Dependencies& left, ::benchmark::K10Dependencies& right)
    {
        left.swap(right);
    }

    
    struct Net45
    {
        ::benchmark::Net45Dependencies dependencies;
        
        Net45()
        {
        }

        
        // Compiler generated copy ctor OK
        Net45(const Net45&) = default;
        
        Net45(Net45&&) = default;
        
        
        // Compiler generated operator= OK
        Net45& operator=(const Net45&) = default;
        Net45& operator=(Net45&&) = default;

        bool operator==(const Net45& other) const
        {
            return true
                && (dependencies == other.dependencies);
        }

        bool operator!=(const Net45& other) const
        {
            return !(*this == other);
        }

        void swap(Net45& other)
        {
            using std::swap;
            swap(dependencies, other.dependencies);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Net45& left, ::benchmark::Net45& right)
    {
        left.swap(right);
    }

    
    struct K10
    {
        ::benchmark::K10Dependencies dependencies;
        
        K10()
        {
        }

        
        // Compiler generated copy ctor OK
        K10(const K10&) = default;
        
        K10(K10&&) = default;
        
        
        // Compiler generated operator= OK
        K10& operator=(const K10&) = default;
        K10& operator=(K10&&) = default;

        bool operator==(const K10& other) const
        {
            return true
                && (dependencies == other.dependencies);
        }

        bool operator!=(const K10& other) const
        {
            return !(*this == other);
        }

        void swap(K10& other)
        {
            using std::swap;
            swap(dependencies, other.dependencies);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::K10& left, ::benchmark::K10& right)
    {
        left.swap(right);
    }

    
    struct Frameworks
    {
        ::benchmark::Net45 net45;
        ::benchmark::K10 k10;
        
        Frameworks()
        {
        }

        
        // Compiler generated copy ctor OK
        Frameworks(const Frameworks&) = default;
        
        Frameworks(Frameworks&&) = default;
        
        
        // Compiler generated operator= OK
        Frameworks& operator=(const Frameworks&) = default;
        Frameworks& operator=(Frameworks&&) = default;

        bool operator==(const Frameworks& other) const
        {
            return true
                && (net45 == other.net45)
                && (k10 == other.k10);
        }

        bool operator!=(const Frameworks& other) const
        {
            return !(*this == other);
        }

        void swap(Frameworks& other)
        {
            using std::swap;
            swap(net45, other.net45);
            swap(k10, other.k10);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Frameworks& left, ::benchmark::Frameworks& right)
    {
        left.swap(right);
    }

    
    struct Main
    {
        std::string version;
        ::benchmark::CompilationOptions compilationOptions;
        ::benchmark::Dependencies dependencies;
        std::string code;
        ::benchmark::Frameworks frameworks;
        
        Main()
        {
        }

        
        // Compiler generated copy ctor OK
        Main(const Main&) = default;
        
        Main(Main&&) = default;
        
        
        // Compiler generated operator= OK
        Main& operator=(const Main&) = default;
        Main& operator=(Main&&) = default;

        bool operator==(const Main& other) const
        {
            return true
                && (version == other.version)
                && (compilationOptions == other.compilationOptions)
                && (dependencies == other.dependencies)
                && (code == other.code)
                && (frameworks == other.frameworks);
        }

        bool operator!=(const Main& other) const
        {
            return !(*this == other);
        }

        void swap(Main& other)
        {
            using std::swap;
            swap(version, other.version);
            swap(compilationOptions, other.compilationOptions);
            swap(dependencies, other.dependencies);
            swap(code, other.code);
            swap(frameworks, other.frameworks);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Main& left, ::benchmark::Main& right)
    {
        left.swap(right);
    }
} // namespace benchmark
