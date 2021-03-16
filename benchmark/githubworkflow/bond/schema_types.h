
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/githubworkflow/bond/schema.bond
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
    
    struct Environment
    {
        std::string buildSuiteDir;
        
        Environment()
        {
        }

        
        // Compiler generated copy ctor OK
        Environment(const Environment&) = default;
        
        Environment(Environment&&) = default;
        
        
        // Compiler generated operator= OK
        Environment& operator=(const Environment&) = default;
        Environment& operator=(Environment&&) = default;

        bool operator==(const Environment& other) const
        {
            return true
                && (buildSuiteDir == other.buildSuiteDir);
        }

        bool operator!=(const Environment& other) const
        {
            return !(*this == other);
        }

        void swap(Environment& other)
        {
            using std::swap;
            swap(buildSuiteDir, other.buildSuiteDir);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Environment& left, ::benchmark::Environment& right)
    {
        left.swap(right);
    }

    
    struct With
    {
        std::string nodeVersion;
        
        With()
        {
        }

        
        // Compiler generated copy ctor OK
        With(const With&) = default;
        
        With(With&&) = default;
        
        
        // Compiler generated operator= OK
        With& operator=(const With&) = default;
        With& operator=(With&&) = default;

        bool operator==(const With& other) const
        {
            return true
                && (nodeVersion == other.nodeVersion);
        }

        bool operator!=(const With& other) const
        {
            return !(*this == other);
        }

        void swap(With& other)
        {
            using std::swap;
            swap(nodeVersion, other.nodeVersion);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::With& left, ::benchmark::With& right)
    {
        left.swap(right);
    }

    
    struct Step
    {
        ::bond::maybe<std::string> uses;
        ::bond::maybe<std::string> run;
        ::bond::maybe<std::string> workingDirectory;
        ::benchmark::With with;
        ::bond::maybe<std::string> name;
        
        Step()
        {
        }

        
        // Compiler generated copy ctor OK
        Step(const Step&) = default;
        
        Step(Step&&) = default;
        
        
        // Compiler generated operator= OK
        Step& operator=(const Step&) = default;
        Step& operator=(Step&&) = default;

        bool operator==(const Step& other) const
        {
            return true
                && (uses == other.uses)
                && (run == other.run)
                && (workingDirectory == other.workingDirectory)
                && (with == other.with)
                && (name == other.name);
        }

        bool operator!=(const Step& other) const
        {
            return !(*this == other);
        }

        void swap(Step& other)
        {
            using std::swap;
            swap(uses, other.uses);
            swap(run, other.run);
            swap(workingDirectory, other.workingDirectory);
            swap(with, other.with);
            swap(name, other.name);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Step& left, ::benchmark::Step& right)
    {
        left.swap(right);
    }

    
    struct Build
    {
        std::string runsOn;
        ::benchmark::Environment env;
        std::list< ::benchmark::Step> steps;
        
        Build()
        {
        }

        
        // Compiler generated copy ctor OK
        Build(const Build&) = default;
        
        Build(Build&&) = default;
        
        
        // Compiler generated operator= OK
        Build& operator=(const Build&) = default;
        Build& operator=(Build&&) = default;

        bool operator==(const Build& other) const
        {
            return true
                && (runsOn == other.runsOn)
                && (env == other.env)
                && (steps == other.steps);
        }

        bool operator!=(const Build& other) const
        {
            return !(*this == other);
        }

        void swap(Build& other)
        {
            using std::swap;
            swap(runsOn, other.runsOn);
            swap(env, other.env);
            swap(steps, other.steps);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Build& left, ::benchmark::Build& right)
    {
        left.swap(right);
    }

    
    struct Jobs
    {
        ::benchmark::Build build;
        
        Jobs()
        {
        }

        
        // Compiler generated copy ctor OK
        Jobs(const Jobs&) = default;
        
        Jobs(Jobs&&) = default;
        
        
        // Compiler generated operator= OK
        Jobs& operator=(const Jobs&) = default;
        Jobs& operator=(Jobs&&) = default;

        bool operator==(const Jobs& other) const
        {
            return true
                && (build == other.build);
        }

        bool operator!=(const Jobs& other) const
        {
            return !(*this == other);
        }

        void swap(Jobs& other)
        {
            using std::swap;
            swap(build, other.build);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Jobs& left, ::benchmark::Jobs& right)
    {
        left.swap(right);
    }

    
    struct Main
    {
        std::string name;
        std::list<std::string> on;
        ::benchmark::Jobs jobs;
        
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
                && (name == other.name)
                && (on == other.on)
                && (jobs == other.jobs);
        }

        bool operator!=(const Main& other) const
        {
            return !(*this == other);
        }

        void swap(Main& other)
        {
            using std::swap;
            swap(name, other.name);
            swap(on, other.on);
            swap(jobs, other.jobs);
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