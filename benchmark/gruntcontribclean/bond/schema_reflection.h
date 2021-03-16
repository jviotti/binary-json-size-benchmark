
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/gruntcontribclean/bond/schema.bond
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
    // Options
    //
    struct Options::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_force_metadata;
        private: static const ::bond::Metadata s_noWrite_metadata;

        public: struct var
        {
            // force
            typedef struct force_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                Options,
                bool,
                &Options::force,
                &s_force_metadata
            > {} force;
        
            // noWrite
            typedef struct noWrite_type : ::bond::reflection::FieldTemplate<
                1,
                ::bond::reflection::required_field_modifier,
                Options,
                bool,
                &Options::noWrite,
                &s_noWrite_metadata
            > {} noWrite;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::noWrite>::type fields1;
        private: typedef boost::mpl::push_front<fields1, var::force>::type fields2;

        public: typedef fields2::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Options", "benchmark.Options",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    //
    // Files
    //
    struct Files::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        

        public: struct var
        {};

        private: typedef boost::mpl::list<> fields0;
        

        public: typedef fields0::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Files", "benchmark.Files",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    //
    // MainOptions
    //
    struct MainOptions::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_files_metadata;
        private: static const ::bond::Metadata s_src_metadata;

        public: struct var
        {
            // files
            typedef struct files_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                MainOptions,
                ::benchmark::Files,
                &MainOptions::files,
                &s_files_metadata
            > {} files;
        
            // src
            typedef struct src_type : ::bond::reflection::FieldTemplate<
                1,
                ::bond::reflection::required_field_modifier,
                MainOptions,
                std::list<std::string>,
                &MainOptions::src,
                &s_src_metadata
            > {} src;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::src>::type fields1;
        private: typedef boost::mpl::push_front<fields1, var::files>::type fields2;

        public: typedef fields2::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("MainOptions", "benchmark.MainOptions",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    //
    // Main
    //
    struct Main::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_foo_metadata;
        private: static const ::bond::Metadata s_main_metadata;
        private: static const ::bond::Metadata s_options_metadata;

        public: struct var
        {
            // foo
            typedef struct foo_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                Main,
                std::list<std::string>,
                &Main::foo,
                &s_foo_metadata
            > {} foo;
        
            // main
            typedef struct main_type : ::bond::reflection::FieldTemplate<
                1,
                ::bond::reflection::required_field_modifier,
                Main,
                ::benchmark::MainOptions,
                &Main::main,
                &s_main_metadata
            > {} main;
        
            // options
            typedef struct options_type : ::bond::reflection::FieldTemplate<
                2,
                ::bond::reflection::required_field_modifier,
                Main,
                ::benchmark::Options,
                &Main::options,
                &s_options_metadata
            > {} options;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::options>::type fields1;
        private: typedef boost::mpl::push_front<fields1, var::main>::type fields2;
        private: typedef boost::mpl::push_front<fields2, var::foo>::type fields3;

        public: typedef fields3::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Main", "benchmark.Main",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    
} // namespace benchmark