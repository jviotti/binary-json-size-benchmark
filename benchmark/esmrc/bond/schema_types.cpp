
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/esmrc/bond/schema.bond
//   Output filename: schema_types.cpp
//
// Changes to this file may cause incorrect behavior and will be lost when
// the code is regenerated.
// <auto-generated />
//------------------------------------------------------------------------------

#include "schema_reflection.h"
#include <bond/core/exception.h>

namespace benchmark
{
    
    const ::bond::Metadata Main::Schema::metadata
        = Main::Schema::GetMetadata();
    
    const ::bond::Metadata Main::Schema::s_cjs_metadata
        = ::bond::reflection::MetadataInit("cjs", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_mainFields_metadata
        = ::bond::reflection::MetadataInit("mainFields", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_mode_metadata
        = ::bond::reflection::MetadataInit("mode", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_force_metadata
        = ::bond::reflection::MetadataInit("force", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_cache_metadata
        = ::bond::reflection::MetadataInit("cache", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_sourceMap_metadata
        = ::bond::reflection::MetadataInit("sourceMap", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());

    
} // namespace benchmark