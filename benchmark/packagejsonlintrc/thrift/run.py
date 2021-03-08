def encode(json, schema):
    payload = schema.Main()
    payload.rules = schema.Rules()

    payload.rules.requireAuthor = json['rules']['require-author']
    payload.rules.requireDescription = json['rules']['require-description']
    payload.rules.requireEngines = json['rules']['require-engines']
    payload.rules.requireLicense = json['rules']['require-license']
    payload.rules.requireName = json['rules']['require-name']
    payload.rules.requireRepository = json['rules']['require-repository']
    payload.rules.requireVersion = json['rules']['require-version']
    payload.rules.requireBugs = json['rules']['require-bugs']
    payload.rules.requireHomepage = json['rules']['require-homepage']
    payload.rules.requireKeywords = json['rules']['require-keywords']
    payload.rules.binType = json['rules']['bin-type']
    payload.rules.configType = json['rules']['config-type']
    payload.rules.descriptionType = json['rules']['description-type']
    payload.rules.devDependenciesType = json['rules']['devDependencies-type']
    payload.rules.directoriesType = json['rules']['directories-type']
    payload.rules.enginesType = json['rules']['engines-type']
    payload.rules.filesType = json['rules']['files-type']
    payload.rules.homepageType = json['rules']['homepage-type']
    payload.rules.keywordsType = json['rules']['keywords-type']
    payload.rules.licenseType = json['rules']['license-type']
    payload.rules.mainType = json['rules']['main-type']
    payload.rules.manType = json['rules']['man-type']
    payload.rules.nameType = json['rules']['name-type']
    payload.rules.preferGlobalType = json['rules']['preferGlobal-type']
    payload.rules.privateType = json['rules']['private-type']
    payload.rules.repositoryType = json['rules']['repository-type']
    payload.rules.scriptsType = json['rules']['scripts-type']
    payload.rules.versionType = json['rules']['version-type']

    payload.rules.validValuesAuthor = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.validValuesAuthor[0].textual = \
        json['rules']['valid-values-author'][0]
    payload.rules.validValuesAuthor[1].options = \
        json['rules']['valid-values-author'][1]

    payload.rules.validValuesPrivate = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.validValuesPrivate[0].textual = \
        json['rules']['valid-values-private'][0]
    payload.rules.validValuesPrivate[1].booleanOptions = \
        json['rules']['valid-values-private'][1]

    payload.rules.noRestrictedDependencies = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.noRestrictedDependencies[0].textual = \
        json['rules']['no-restricted-dependencies'][0]
    payload.rules.noRestrictedDependencies[1].options = \
        json['rules']['no-restricted-dependencies'][1]

    payload.rules.noRestrictedPreReleaseDependencies = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.noRestrictedPreReleaseDependencies[0].textual = \
        json['rules']['no-restricted-pre-release-dependencies'][0]
    payload.rules.noRestrictedPreReleaseDependencies[1].options = \
        json['rules']['no-restricted-pre-release-dependencies'][1]

    payload.rules.noRestrictedInvalidDevDependencies = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.noRestrictedInvalidDevDependencies[0].textual = \
        json['rules']['no-restricted-invalid-devDependencies'][0]
    payload.rules.noRestrictedInvalidDevDependencies[1].options = \
        json['rules']['no-restricted-invalid-devDependencies'][1]

    payload.rules.noRestrictedPreReleaseDevDependencies = [
        schema.ComplexRule(),
        schema.ComplexRule()
    ]
    payload.rules.noRestrictedPreReleaseDevDependencies[0].textual = \
        json['rules']['no-restricted-pre-release-devDependencies'][0]
    payload.rules.noRestrictedPreReleaseDevDependencies[1].options = \
        json['rules']['no-restricted-pre-release-devDependencies'][1]

    payload.rules.nameFormat = json['rules']['name-format']
    payload.rules.versionFormat = json['rules']['version-format']

    return payload

def decode(payload):
    return {
      'rules': {
        'require-author': payload.rules.requireAuthor,
        'require-description': payload.rules.requireDescription,
        'require-engines': payload.rules.requireEngines,
        'require-license': payload.rules.requireLicense,
        'require-name': payload.rules.requireName,
        'require-repository': payload.rules.requireRepository,
        'require-version': payload.rules.requireVersion,
        'require-bugs': payload.rules.requireBugs,
        'require-homepage': payload.rules.requireHomepage,
        'require-keywords': payload.rules.requireKeywords,
        'bin-type': payload.rules.binType,
        'config-type': payload.rules.configType,
        'description-type': payload.rules.descriptionType,
        'devDependencies-type': payload.rules.devDependenciesType,
        'directories-type': payload.rules.directoriesType,
        'engines-type': payload.rules.enginesType,
        'files-type': payload.rules.filesType,
        'homepage-type': payload.rules.homepageType,
        'keywords-type': payload.rules.keywordsType,
        'license-type': payload.rules.licenseType,
        'main-type': payload.rules.mainType,
        'man-type': payload.rules.manType,
        'name-type': payload.rules.nameType,
        'preferGlobal-type': payload.rules.preferGlobalType,
        'private-type': payload.rules.privateType,
        'repository-type': payload.rules.repositoryType,
        'scripts-type': payload.rules.scriptsType,
        'version-type': payload.rules.versionType,
        'valid-values-author': [
            payload.rules.validValuesAuthor[0].textual,
            payload.rules.validValuesAuthor[1].options
        ],
        'valid-values-private': [
            payload.rules.validValuesPrivate[0].textual,
            payload.rules.validValuesPrivate[1].booleanOptions
        ],
        'no-restricted-dependencies': [
            payload.rules.noRestrictedDependencies[0].textual,
            payload.rules.noRestrictedDependencies[1].options
        ],
        'no-restricted-pre-release-dependencies': [
            payload.rules.noRestrictedPreReleaseDependencies[0].textual,
            payload.rules.noRestrictedPreReleaseDependencies[1].options
        ],
        'no-restricted-invalid-devDependencies': [
            payload.rules.noRestrictedInvalidDevDependencies[0].textual,
            payload.rules.noRestrictedInvalidDevDependencies[1].options
        ],
        'no-restricted-pre-release-devDependencies': [
            payload.rules.noRestrictedPreReleaseDevDependencies[0].textual,
            payload.rules.noRestrictedPreReleaseDevDependencies[1].options
        ],
        'name-format': payload.rules.nameFormat,
        'version-format': payload.rules.versionFormat
      }
    }
