
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/sapcloudsdkpipeline/bond/schema.bond
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
    
    const ::bond::Metadata Main::Schema::s_general_metadata
        = ::bond::reflection::MetadataInit("general", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_stages_metadata
        = ::bond::reflection::MetadataInit("stages", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_steps_metadata
        = ::bond::reflection::MetadataInit("steps", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());

    
} // namespace benchmark
