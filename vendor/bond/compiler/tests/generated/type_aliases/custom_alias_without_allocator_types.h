
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



namespace test
{
    template <typename T>
    using List = my::list<T>;

    template <typename T>
    using Vector = my::vector<T>;

    template <typename T>
    using Set = my::set<T>;

    template <typename K, typename T>
    using Map = my::map<K, T>;

    using String = my::string;

    using NestedAliases = ::test::Set< ::test::List< ::test::Map<int32_t, ::test::String> > >;

    
    struct foo
    {
        using allocator_type = arena;

        ::test::List<bool> l;
        ::test::Vector<bool> v;
        ::test::Set<bool> s;
        ::test::Map< ::test::String, bool> m;
        ::test::String st;
        ::test::String d;
        ::bond::maybe< ::test::List<bool> > l1;
        ::bond::maybe< ::test::Vector<bool> > v1;
        ::bond::maybe< ::test::Set<bool> > s1;
        ::bond::maybe< ::test::Map< ::test::String, bool> > m1;
        ::bond::maybe< ::test::String> st1;
        ::test::NestedAliases na;
        
        foo()
          : l(),
            v(),
            s(),
            m(),
            st(),
            d("foo"),
            na()
        {
        }

        
        // Compiler generated copy ctor OK
        foo(const foo&) = default;
        
        foo(foo&&) = default;
        
        explicit
        foo(const arena&)
          : l(),
            v(),
            s(),
            m(),
            st(),
            d("foo"),
            l1(),
            v1(),
            s1(),
            m1(),
            st1(),
            na()
        {
        }
        
        
        // Compiler generated operator= OK
        foo& operator=(const foo&) = default;
        foo& operator=(foo&&) = default;

        bool operator==(const foo& other) const
        {
            return true
                && (l == other.l)
                && (v == other.v)
                && (s == other.s)
                && (m == other.m)
                && (st == other.st)
                && (d == other.d)
                && (l1 == other.l1)
                && (v1 == other.v1)
                && (s1 == other.s1)
                && (m1 == other.m1)
                && (st1 == other.st1)
                && (na == other.na);
        }

        bool operator!=(const foo& other) const
        {
            return !(*this == other);
        }

        void swap(foo& other)
        {
            using std::swap;
            swap(l, other.l);
            swap(v, other.v);
            swap(s, other.s);
            swap(m, other.m);
            swap(st, other.st);
            swap(d, other.d);
            swap(l1, other.l1);
            swap(v1, other.v1);
            swap(s1, other.s1);
            swap(m1, other.m1);
            swap(st1, other.st1);
            swap(na, other.na);
        }

        struct Schema;

    protected:
        void InitMetadata(const char*, const char*)
        {
        }
    };

    inline void swap(::test::foo& left, ::test::foo& right)
    {
        left.swap(right);
    }
} // namespace test
