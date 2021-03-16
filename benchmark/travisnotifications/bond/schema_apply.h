
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/travisnotifications/bond/schema.bond
//   Output filename: schema_apply.h
//
// Changes to this file may cause incorrect behavior and will be lost when
// the code is regenerated.
// <auto-generated />
//------------------------------------------------------------------------------

#pragma once

#include "schema_types.h"
#include <bond/core/bond.h>
#include <bond/stream/output_buffer.h>


namespace bond
{
    
    //
    // Extern template specializations of Apply function with common
    // transforms for Notification.
    //

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);

    extern template 
    bool Apply(const ::bond::InitSchemaDef& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Null& transform,
               const ::bond::bonded< ::benchmark::Notification, ::bond::SimpleBinaryReader< ::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded<void,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded<void,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notification>& transform,
               const ::bond::bonded<void,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notification& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notification,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    //
    // Extern template specializations of Apply function with common
    // transforms for Notifications.
    //

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);

    extern template 
    bool Apply(const ::bond::InitSchemaDef& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Null& transform,
               const ::bond::bonded< ::benchmark::Notifications, ::bond::SimpleBinaryReader< ::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded<void,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded<void,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Notifications>& transform,
               const ::bond::bonded<void,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Notifications& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Notifications,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    //
    // Extern template specializations of Apply function with common
    // transforms for Main.
    //

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main>& value);

    extern template 
    bool Apply(const ::bond::InitSchemaDef& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Null& transform,
               const ::bond::bonded< ::benchmark::Main, ::bond::SimpleBinaryReader< ::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::CompactBinaryWriter<::bond::OutputBuffer>::Pass0 >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::FastBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);

    extern template 
    bool Apply(const ::bond::To< ::benchmark::Main>& transform,
               const ::bond::bonded<void,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Serializer< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::benchmark::Main& value);

    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::CompactBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::FastBinaryReader<::bond::InputBuffer>&>& value);
    
    extern template 
    bool Apply(const ::bond::Marshaler< ::bond::SimpleBinaryWriter<::bond::OutputBuffer> >& transform,
               const ::bond::bonded< ::benchmark::Main,  ::bond::SimpleBinaryReader<::bond::InputBuffer>&>& value);
    
} // namespace bond