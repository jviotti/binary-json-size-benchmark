
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/tslintextend/bond/schema.bond
//   Output filename: schema_reflection.h
//
// Changes to this file may cause incorrect behavior and will be lost when
// the code is regenerated.
// <auto-generated />
//------------------------------------------------------------------------------

#pragma once

#include "schema_types.h"
#include <bond/core/reflection.h>

namespace benchmark
{
    //
    // Main
    //
    struct Main::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_extends_metadata;

        public: struct var
        {
            // extends
            typedef struct extends_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                Main,
                std::list<std::string>,
                &Main::extends,
                &s_extends_metadata
            > {} extends;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::extends>::type fields1;

        public: typedef fields1::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Main", "benchmark.Main",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    
} // namespace benchmark