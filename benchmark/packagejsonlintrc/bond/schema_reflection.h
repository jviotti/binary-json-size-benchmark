
//------------------------------------------------------------------------------
// This code was generated by a tool.
//
//   Tool : Bond Compiler 0.12.1.0
//   Input filename:  benchmark/packagejsonlintrc/bond/schema.bond
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
    // ComplexRule
    //
    struct ComplexRule::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_level_metadata;
        private: static const ::bond::Metadata s_options_metadata;
        private: static const ::bond::Metadata s_booleanOptions_metadata;

        public: struct var
        {
            // level
            typedef struct level_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::optional_field_modifier,
                ComplexRule,
                ::bond::maybe<std::string>,
                &ComplexRule::level,
                &s_level_metadata
            > {} level;
        
            // options
            typedef struct options_type : ::bond::reflection::FieldTemplate<
                1,
                ::bond::reflection::optional_field_modifier,
                ComplexRule,
                ::bond::maybe<std::list<std::string> >,
                &ComplexRule::options,
                &s_options_metadata
            > {} options;
        
            // booleanOptions
            typedef struct booleanOptions_type : ::bond::reflection::FieldTemplate<
                2,
                ::bond::reflection::optional_field_modifier,
                ComplexRule,
                ::bond::maybe<std::list<bool> >,
                &ComplexRule::booleanOptions,
                &s_booleanOptions_metadata
            > {} booleanOptions;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::booleanOptions>::type fields1;
        private: typedef boost::mpl::push_front<fields1, var::options>::type fields2;
        private: typedef boost::mpl::push_front<fields2, var::level>::type fields3;

        public: typedef fields3::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("ComplexRule", "benchmark.ComplexRule",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    //
    // Rules
    //
    struct Rules::Schema
    {
        typedef ::bond::no_base base;

        static const ::bond::Metadata metadata;
        
        private: static const ::bond::Metadata s_requireAuthor_metadata;
        private: static const ::bond::Metadata s_requireDescription_metadata;
        private: static const ::bond::Metadata s_requireEngines_metadata;
        private: static const ::bond::Metadata s_requireLicense_metadata;
        private: static const ::bond::Metadata s_requireName_metadata;
        private: static const ::bond::Metadata s_requireRepository_metadata;
        private: static const ::bond::Metadata s_requireVersion_metadata;
        private: static const ::bond::Metadata s_requireBugs_metadata;
        private: static const ::bond::Metadata s_requireHomepage_metadata;
        private: static const ::bond::Metadata s_requireKeywords_metadata;
        private: static const ::bond::Metadata s_binType_metadata;
        private: static const ::bond::Metadata s_configType_metadata;
        private: static const ::bond::Metadata s_descriptionType_metadata;
        private: static const ::bond::Metadata s_devDependenciesType_metadata;
        private: static const ::bond::Metadata s_directoriesType_metadata;
        private: static const ::bond::Metadata s_enginesType_metadata;
        private: static const ::bond::Metadata s_filesType_metadata;
        private: static const ::bond::Metadata s_homepageType_metadata;
        private: static const ::bond::Metadata s_keywordsType_metadata;
        private: static const ::bond::Metadata s_licenseType_metadata;
        private: static const ::bond::Metadata s_mainType_metadata;
        private: static const ::bond::Metadata s_manType_metadata;
        private: static const ::bond::Metadata s_nameType_metadata;
        private: static const ::bond::Metadata s_preferGlobalType_metadata;
        private: static const ::bond::Metadata s_privateType_metadata;
        private: static const ::bond::Metadata s_repositoryType_metadata;
        private: static const ::bond::Metadata s_scriptsType_metadata;
        private: static const ::bond::Metadata s_versionType_metadata;
        private: static const ::bond::Metadata s_validValuesAuthor_metadata;
        private: static const ::bond::Metadata s_validValuesPrivate_metadata;
        private: static const ::bond::Metadata s_noRestrictedDependencies_metadata;
        private: static const ::bond::Metadata s_noRestrictedPreReleaseDependencies_metadata;
        private: static const ::bond::Metadata s_noRestrictedInvalidDevDependencies_metadata;
        private: static const ::bond::Metadata s_noRestrictedPreReleaseDevDependencies_metadata;
        private: static const ::bond::Metadata s_nameFormat_metadata;
        private: static const ::bond::Metadata s_versionFormat_metadata;

        public: struct var
        {
            // requireAuthor
            typedef struct requireAuthor_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireAuthor,
                &s_requireAuthor_metadata
            > {} requireAuthor;
        
            // requireDescription
            typedef struct requireDescription_type : ::bond::reflection::FieldTemplate<
                1,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireDescription,
                &s_requireDescription_metadata
            > {} requireDescription;
        
            // requireEngines
            typedef struct requireEngines_type : ::bond::reflection::FieldTemplate<
                2,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireEngines,
                &s_requireEngines_metadata
            > {} requireEngines;
        
            // requireLicense
            typedef struct requireLicense_type : ::bond::reflection::FieldTemplate<
                3,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireLicense,
                &s_requireLicense_metadata
            > {} requireLicense;
        
            // requireName
            typedef struct requireName_type : ::bond::reflection::FieldTemplate<
                4,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireName,
                &s_requireName_metadata
            > {} requireName;
        
            // requireRepository
            typedef struct requireRepository_type : ::bond::reflection::FieldTemplate<
                5,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireRepository,
                &s_requireRepository_metadata
            > {} requireRepository;
        
            // requireVersion
            typedef struct requireVersion_type : ::bond::reflection::FieldTemplate<
                6,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireVersion,
                &s_requireVersion_metadata
            > {} requireVersion;
        
            // requireBugs
            typedef struct requireBugs_type : ::bond::reflection::FieldTemplate<
                7,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireBugs,
                &s_requireBugs_metadata
            > {} requireBugs;
        
            // requireHomepage
            typedef struct requireHomepage_type : ::bond::reflection::FieldTemplate<
                8,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireHomepage,
                &s_requireHomepage_metadata
            > {} requireHomepage;
        
            // requireKeywords
            typedef struct requireKeywords_type : ::bond::reflection::FieldTemplate<
                9,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::requireKeywords,
                &s_requireKeywords_metadata
            > {} requireKeywords;
        
            // binType
            typedef struct binType_type : ::bond::reflection::FieldTemplate<
                10,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::binType,
                &s_binType_metadata
            > {} binType;
        
            // configType
            typedef struct configType_type : ::bond::reflection::FieldTemplate<
                11,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::configType,
                &s_configType_metadata
            > {} configType;
        
            // descriptionType
            typedef struct descriptionType_type : ::bond::reflection::FieldTemplate<
                12,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::descriptionType,
                &s_descriptionType_metadata
            > {} descriptionType;
        
            // devDependenciesType
            typedef struct devDependenciesType_type : ::bond::reflection::FieldTemplate<
                13,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::devDependenciesType,
                &s_devDependenciesType_metadata
            > {} devDependenciesType;
        
            // directoriesType
            typedef struct directoriesType_type : ::bond::reflection::FieldTemplate<
                14,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::directoriesType,
                &s_directoriesType_metadata
            > {} directoriesType;
        
            // enginesType
            typedef struct enginesType_type : ::bond::reflection::FieldTemplate<
                15,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::enginesType,
                &s_enginesType_metadata
            > {} enginesType;
        
            // filesType
            typedef struct filesType_type : ::bond::reflection::FieldTemplate<
                16,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::filesType,
                &s_filesType_metadata
            > {} filesType;
        
            // homepageType
            typedef struct homepageType_type : ::bond::reflection::FieldTemplate<
                17,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::homepageType,
                &s_homepageType_metadata
            > {} homepageType;
        
            // keywordsType
            typedef struct keywordsType_type : ::bond::reflection::FieldTemplate<
                18,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::keywordsType,
                &s_keywordsType_metadata
            > {} keywordsType;
        
            // licenseType
            typedef struct licenseType_type : ::bond::reflection::FieldTemplate<
                19,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::licenseType,
                &s_licenseType_metadata
            > {} licenseType;
        
            // mainType
            typedef struct mainType_type : ::bond::reflection::FieldTemplate<
                20,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::mainType,
                &s_mainType_metadata
            > {} mainType;
        
            // manType
            typedef struct manType_type : ::bond::reflection::FieldTemplate<
                21,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::manType,
                &s_manType_metadata
            > {} manType;
        
            // nameType
            typedef struct nameType_type : ::bond::reflection::FieldTemplate<
                22,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::nameType,
                &s_nameType_metadata
            > {} nameType;
        
            // preferGlobalType
            typedef struct preferGlobalType_type : ::bond::reflection::FieldTemplate<
                23,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::preferGlobalType,
                &s_preferGlobalType_metadata
            > {} preferGlobalType;
        
            // privateType
            typedef struct privateType_type : ::bond::reflection::FieldTemplate<
                24,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::privateType,
                &s_privateType_metadata
            > {} privateType;
        
            // repositoryType
            typedef struct repositoryType_type : ::bond::reflection::FieldTemplate<
                25,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::repositoryType,
                &s_repositoryType_metadata
            > {} repositoryType;
        
            // scriptsType
            typedef struct scriptsType_type : ::bond::reflection::FieldTemplate<
                26,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::scriptsType,
                &s_scriptsType_metadata
            > {} scriptsType;
        
            // versionType
            typedef struct versionType_type : ::bond::reflection::FieldTemplate<
                27,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::versionType,
                &s_versionType_metadata
            > {} versionType;
        
            // validValuesAuthor
            typedef struct validValuesAuthor_type : ::bond::reflection::FieldTemplate<
                28,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::validValuesAuthor,
                &s_validValuesAuthor_metadata
            > {} validValuesAuthor;
        
            // validValuesPrivate
            typedef struct validValuesPrivate_type : ::bond::reflection::FieldTemplate<
                29,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::validValuesPrivate,
                &s_validValuesPrivate_metadata
            > {} validValuesPrivate;
        
            // noRestrictedDependencies
            typedef struct noRestrictedDependencies_type : ::bond::reflection::FieldTemplate<
                30,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::noRestrictedDependencies,
                &s_noRestrictedDependencies_metadata
            > {} noRestrictedDependencies;
        
            // noRestrictedPreReleaseDependencies
            typedef struct noRestrictedPreReleaseDependencies_type : ::bond::reflection::FieldTemplate<
                31,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::noRestrictedPreReleaseDependencies,
                &s_noRestrictedPreReleaseDependencies_metadata
            > {} noRestrictedPreReleaseDependencies;
        
            // noRestrictedInvalidDevDependencies
            typedef struct noRestrictedInvalidDevDependencies_type : ::bond::reflection::FieldTemplate<
                32,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::noRestrictedInvalidDevDependencies,
                &s_noRestrictedInvalidDevDependencies_metadata
            > {} noRestrictedInvalidDevDependencies;
        
            // noRestrictedPreReleaseDevDependencies
            typedef struct noRestrictedPreReleaseDevDependencies_type : ::bond::reflection::FieldTemplate<
                33,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::list< ::benchmark::ComplexRule>,
                &Rules::noRestrictedPreReleaseDevDependencies,
                &s_noRestrictedPreReleaseDevDependencies_metadata
            > {} noRestrictedPreReleaseDevDependencies;
        
            // nameFormat
            typedef struct nameFormat_type : ::bond::reflection::FieldTemplate<
                34,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::nameFormat,
                &s_nameFormat_metadata
            > {} nameFormat;
        
            // versionFormat
            typedef struct versionFormat_type : ::bond::reflection::FieldTemplate<
                35,
                ::bond::reflection::required_field_modifier,
                Rules,
                std::string,
                &Rules::versionFormat,
                &s_versionFormat_metadata
            > {} versionFormat;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::versionFormat>::type fields1;
        private: typedef boost::mpl::push_front<fields1, var::nameFormat>::type fields2;
        private: typedef boost::mpl::push_front<fields2, var::noRestrictedPreReleaseDevDependencies>::type fields3;
        private: typedef boost::mpl::push_front<fields3, var::noRestrictedInvalidDevDependencies>::type fields4;
        private: typedef boost::mpl::push_front<fields4, var::noRestrictedPreReleaseDependencies>::type fields5;
        private: typedef boost::mpl::push_front<fields5, var::noRestrictedDependencies>::type fields6;
        private: typedef boost::mpl::push_front<fields6, var::validValuesPrivate>::type fields7;
        private: typedef boost::mpl::push_front<fields7, var::validValuesAuthor>::type fields8;
        private: typedef boost::mpl::push_front<fields8, var::versionType>::type fields9;
        private: typedef boost::mpl::push_front<fields9, var::scriptsType>::type fields10;
        private: typedef boost::mpl::push_front<fields10, var::repositoryType>::type fields11;
        private: typedef boost::mpl::push_front<fields11, var::privateType>::type fields12;
        private: typedef boost::mpl::push_front<fields12, var::preferGlobalType>::type fields13;
        private: typedef boost::mpl::push_front<fields13, var::nameType>::type fields14;
        private: typedef boost::mpl::push_front<fields14, var::manType>::type fields15;
        private: typedef boost::mpl::push_front<fields15, var::mainType>::type fields16;
        private: typedef boost::mpl::push_front<fields16, var::licenseType>::type fields17;
        private: typedef boost::mpl::push_front<fields17, var::keywordsType>::type fields18;
        private: typedef boost::mpl::push_front<fields18, var::homepageType>::type fields19;
        private: typedef boost::mpl::push_front<fields19, var::filesType>::type fields20;
        private: typedef boost::mpl::push_front<fields20, var::enginesType>::type fields21;
        private: typedef boost::mpl::push_front<fields21, var::directoriesType>::type fields22;
        private: typedef boost::mpl::push_front<fields22, var::devDependenciesType>::type fields23;
        private: typedef boost::mpl::push_front<fields23, var::descriptionType>::type fields24;
        private: typedef boost::mpl::push_front<fields24, var::configType>::type fields25;
        private: typedef boost::mpl::push_front<fields25, var::binType>::type fields26;
        private: typedef boost::mpl::push_front<fields26, var::requireKeywords>::type fields27;
        private: typedef boost::mpl::push_front<fields27, var::requireHomepage>::type fields28;
        private: typedef boost::mpl::push_front<fields28, var::requireBugs>::type fields29;
        private: typedef boost::mpl::push_front<fields29, var::requireVersion>::type fields30;
        private: typedef boost::mpl::push_front<fields30, var::requireRepository>::type fields31;
        private: typedef boost::mpl::push_front<fields31, var::requireName>::type fields32;
        private: typedef boost::mpl::push_front<fields32, var::requireLicense>::type fields33;
        private: typedef boost::mpl::push_front<fields33, var::requireEngines>::type fields34;
        private: typedef boost::mpl::push_front<fields34, var::requireDescription>::type fields35;
        private: typedef boost::mpl::push_front<fields35, var::requireAuthor>::type fields36;

        public: typedef fields36::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Rules", "benchmark.Rules",
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
        
        private: static const ::bond::Metadata s_rules_metadata;

        public: struct var
        {
            // rules
            typedef struct rules_type : ::bond::reflection::FieldTemplate<
                0,
                ::bond::reflection::required_field_modifier,
                Main,
                ::benchmark::Rules,
                &Main::rules,
                &s_rules_metadata
            > {} rules;
        };

        private: typedef boost::mpl::list<> fields0;
        private: typedef boost::mpl::push_front<fields0, var::rules>::type fields1;

        public: typedef fields1::type fields;
        
        
        static ::bond::Metadata GetMetadata()
        {
            return ::bond::reflection::MetadataInit("Main", "benchmark.Main",
                ::bond::reflection::Attributes()
            );
        }
    };
    

    
} // namespace benchmark
