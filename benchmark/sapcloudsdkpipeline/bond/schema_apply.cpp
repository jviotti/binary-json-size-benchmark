
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/sapcloudsdkpipeline/bond/schema.bond
//   Output filename: schema_apply.cpp
//
// Changes to this file may cause incorrect behavior and will be lost when
// the code is regenerated.
// <auto-generated />
//------------------------------------------------------------------------------

#include "schema_apply.h"
#include "schema_reflection.h"

namespace bond
{
    
    //
    // Extern template specializations of Apply function with common
    // transforms for Main.
    //

    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main>& value);

    template 
    bool Apply(const ::bond::InitSchemaDef& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Null& transform,
               const ::bond::bonded< ::benchmark::Main, ::bond::SimpleBinaryReader< ::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);

    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);

    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);

    template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
} // namespace bond
