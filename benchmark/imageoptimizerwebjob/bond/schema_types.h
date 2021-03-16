
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/imageoptimizerwebjob/bond/schema.bond
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
    
    struct Optimization
    {
        std::list<std::string> includes;
        std::list<std::string> excludes;
        bool lossy;
        
        Optimization()
          : lossy()
        {
        }

        
        // Compiler generated copy ctor OK
        Optimization(const Optimization&) = default;
        
        Optimization(Optimization&&) = default;
        
        
        // Compiler generated operator= OK
        Optimization& operator=(const Optimization&) = default;
        Optimization& operator=(Optimization&&) = default;

        bool operator==(const Optimization& other) const
        {
            return true
                && (includes == other.includes)
                && (excludes == other.excludes)
                && (lossy == other.lossy);
        }

        bool operator!=(const Optimization& other) const
        {
            return !(*this == other);
        }

        void swap(Optimization& other)
        {
            using std::swap;
            swap(includes, other.includes);
            swap(excludes, other.excludes);
            swap(lossy, other.lossy);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Optimization& left, ::benchmark::Optimization& right)
    {
        left.swap(right);
    }

    
    struct Main
    {
        std::list< ::benchmark::Optimization> optimizations;
        
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
                && (optimizations == other.optimizations);
        }

        bool operator!=(const Main& other) const
        {
            return !(*this == other);
        }

        void swap(Main& other)
        {
            using std::swap;
            swap(optimizations, other.optimizations);
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