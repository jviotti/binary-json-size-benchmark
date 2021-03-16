
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/openweathermap/bond/schema.bond
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
    
    struct Coord
    {
        double lon;
        double lat;
        
        Coord()
          : lon(),
            lat()
        {
        }

        
        // Compiler generated copy ctor OK
        Coord(const Coord&) = default;
        
        Coord(Coord&&) = default;
        
        
        // Compiler generated operator= OK
        Coord& operator=(const Coord&) = default;
        Coord& operator=(Coord&&) = default;

        bool operator==(const Coord& other) const
        {
            return true
                && (lon == other.lon)
                && (lat == other.lat);
        }

        bool operator!=(const Coord& other) const
        {
            return !(*this == other);
        }

        void swap(Coord& other)
        {
            using std::swap;
            swap(lon, other.lon);
            swap(lat, other.lat);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Coord& left, ::benchmark::Coord& right)
    {
        left.swap(right);
    }

    
    struct Weather
    {
        uint16_t id;
        std::string main;
        std::string description;
        std::string icon;
        
        Weather()
          : id()
        {
        }

        
        // Compiler generated copy ctor OK
        Weather(const Weather&) = default;
        
        Weather(Weather&&) = default;
        
        
        // Compiler generated operator= OK
        Weather& operator=(const Weather&) = default;
        Weather& operator=(Weather&&) = default;

        bool operator==(const Weather& other) const
        {
            return true
                && (id == other.id)
                && (main == other.main)
                && (description == other.description)
                && (icon == other.icon);
        }

        bool operator!=(const Weather& other) const
        {
            return !(*this == other);
        }

        void swap(Weather& other)
        {
            using std::swap;
            swap(id, other.id);
            swap(main, other.main);
            swap(description, other.description);
            swap(icon, other.icon);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Weather& left, ::benchmark::Weather& right)
    {
        left.swap(right);
    }

    
    struct MainObject
    {
        double temp;
        double feels_like;
        double temp_min;
        double temp_max;
        uint16_t pressure;
        uint8_t humidity;
        
        MainObject()
          : temp(),
            feels_like(),
            temp_min(),
            temp_max(),
            pressure(),
            humidity()
        {
        }

        
        // Compiler generated copy ctor OK
        MainObject(const MainObject&) = default;
        
        MainObject(MainObject&&) = default;
        
        
        // Compiler generated operator= OK
        MainObject& operator=(const MainObject&) = default;
        MainObject& operator=(MainObject&&) = default;

        bool operator==(const MainObject& other) const
        {
            return true
                && (temp == other.temp)
                && (feels_like == other.feels_like)
                && (temp_min == other.temp_min)
                && (temp_max == other.temp_max)
                && (pressure == other.pressure)
                && (humidity == other.humidity);
        }

        bool operator!=(const MainObject& other) const
        {
            return !(*this == other);
        }

        void swap(MainObject& other)
        {
            using std::swap;
            swap(temp, other.temp);
            swap(feels_like, other.feels_like);
            swap(temp_min, other.temp_min);
            swap(temp_max, other.temp_max);
            swap(pressure, other.pressure);
            swap(humidity, other.humidity);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::MainObject& left, ::benchmark::MainObject& right)
    {
        left.swap(right);
    }

    
    struct Wind
    {
        double speed;
        uint16_t deg;
        
        Wind()
          : speed(),
            deg()
        {
        }

        
        // Compiler generated copy ctor OK
        Wind(const Wind&) = default;
        
        Wind(Wind&&) = default;
        
        
        // Compiler generated operator= OK
        Wind& operator=(const Wind&) = default;
        Wind& operator=(Wind&&) = default;

        bool operator==(const Wind& other) const
        {
            return true
                && (speed == other.speed)
                && (deg == other.deg);
        }

        bool operator!=(const Wind& other) const
        {
            return !(*this == other);
        }

        void swap(Wind& other)
        {
            using std::swap;
            swap(speed, other.speed);
            swap(deg, other.deg);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Wind& left, ::benchmark::Wind& right)
    {
        left.swap(right);
    }

    
    struct Clouds
    {
        uint8_t all;
        
        Clouds()
          : all()
        {
        }

        
        // Compiler generated copy ctor OK
        Clouds(const Clouds&) = default;
        
        Clouds(Clouds&&) = default;
        
        
        // Compiler generated operator= OK
        Clouds& operator=(const Clouds&) = default;
        Clouds& operator=(Clouds&&) = default;

        bool operator==(const Clouds& other) const
        {
            return true
                && (all == other.all);
        }

        bool operator!=(const Clouds& other) const
        {
            return !(*this == other);
        }

        void swap(Clouds& other)
        {
            using std::swap;
            swap(all, other.all);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Clouds& left, ::benchmark::Clouds& right)
    {
        left.swap(right);
    }

    
    struct Sys
    {
        uint8_t type;
        uint16_t id;
        double message;
        std::string country;
        uint32_t sunrise;
        uint32_t sunset;
        
        Sys()
          : type(),
            id(),
            message(),
            sunrise(),
            sunset()
        {
        }

        
        // Compiler generated copy ctor OK
        Sys(const Sys&) = default;
        
        Sys(Sys&&) = default;
        
        
        // Compiler generated operator= OK
        Sys& operator=(const Sys&) = default;
        Sys& operator=(Sys&&) = default;

        bool operator==(const Sys& other) const
        {
            return true
                && (type == other.type)
                && (id == other.id)
                && (message == other.message)
                && (country == other.country)
                && (sunrise == other.sunrise)
                && (sunset == other.sunset);
        }

        bool operator!=(const Sys& other) const
        {
            return !(*this == other);
        }

        void swap(Sys& other)
        {
            using std::swap;
            swap(type, other.type);
            swap(id, other.id);
            swap(message, other.message);
            swap(country, other.country);
            swap(sunrise, other.sunrise);
            swap(sunset, other.sunset);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::benchmark::Sys& left, ::benchmark::Sys& right)
    {
        left.swap(right);
    }

    
    struct Main
    {
        ::benchmark::Coord coord;
        std::list< ::benchmark::Weather> weather;
        std::string base;
        ::benchmark::MainObject main;
        uint16_t visibility;
        ::benchmark::Wind wind;
        ::benchmark::Clouds clouds;
        uint32_t dt;
        ::benchmark::Sys sys;
        int32_t timezone;
        uint32_t id;
        std::string name;
        uint8_t cod;
        
        Main()
          : visibility(),
            dt(),
            timezone(),
            id(),
            cod()
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
                && (coord == other.coord)
                && (weather == other.weather)
                && (base == other.base)
                && (main == other.main)
                && (visibility == other.visibility)
                && (wind == other.wind)
                && (clouds == other.clouds)
                && (dt == other.dt)
                && (sys == other.sys)
                && (timezone == other.timezone)
                && (id == other.id)
                && (name == other.name)
                && (cod == other.cod);
        }

        bool operator!=(const Main& other) const
        {
            return !(*this == other);
        }

        void swap(Main& other)
        {
            using std::swap;
            swap(coord, other.coord);
            swap(weather, other.weather);
            swap(base, other.base);
            swap(main, other.main);
            swap(visibility, other.visibility);
            swap(wind, other.wind);
            swap(clouds, other.clouds);
            swap(dt, other.dt);
            swap(sys, other.sys);
            swap(timezone, other.timezone);
            swap(id, other.id);
            swap(name, other.name);
            swap(cod, other.cod);
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