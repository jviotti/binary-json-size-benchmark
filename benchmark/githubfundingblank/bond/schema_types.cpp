
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/githubfundingblank/bond/schema.bond
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
    
    const ::bond::Metadata Main::Schema::s_github_metadata
        = ::bond::reflection::MetadataInit("github", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_patreon_metadata
        = ::bond::reflection::MetadataInit("patreon", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_open_collective_metadata
        = ::bond::reflection::MetadataInit("open_collective", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_ko_fi_metadata
        = ::bond::reflection::MetadataInit("ko_fi", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_tidelift_metadata
        = ::bond::reflection::MetadataInit("tidelift", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_community_bridge_metadata
        = ::bond::reflection::MetadataInit("community_bridge", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_liberapay_metadata
        = ::bond::reflection::MetadataInit("liberapay", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_issuehunt_metadata
        = ::bond::reflection::MetadataInit("issuehunt", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_otechie_metadata
        = ::bond::reflection::MetadataInit("otechie", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());
    
    const ::bond::Metadata Main::Schema::s_custom_metadata
        = ::bond::reflection::MetadataInit("custom", ::bond::reflection::required_field_modifier::value,
                ::bond::reflection::Attributes());

    
} // namespace benchmark