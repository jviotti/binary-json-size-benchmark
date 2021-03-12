def encode(json, schema):
    payload = schema.Main()
    payload.name = json['name']
    payload.description = json['description']
    payload.version = json['version']
    payload.author.name = json['author']['name']
    payload.author.url = json['author']['url']
    payload.homepage = json['homepage']
    payload.repository.type = json['repository']['type']
    payload.repository.url = json['repository']['url']
    payload.bugs.url = json['bugs']['url']

    license1 = payload.licenses.add()
    license1.type = json['licenses'][0]['type']
    license1.url = json['licenses'][0]['url']
    payload.main = json['main']
    payload.scripts.test = json['scripts']['test']
    payload.engines.node = json['engines']['node']
    payload.keywords.extend(json['keywords'])

    payload.dependencies.async1 = json['dependencies']['async']
    payload.dependencies.coffeeScript = json['dependencies']['coffee-script']
    payload.dependencies.colors = json['dependencies']['colors']
    payload.dependencies.dateformat = json['dependencies']['dateformat']
    payload.dependencies.eventemitter2 = json['dependencies']['eventemitter2']
    payload.dependencies.findupSync = json['dependencies']['findup-sync']
    payload.dependencies.glob = json['dependencies']['glob']
    payload.dependencies.hooker = json['dependencies']['hooker']
    payload.dependencies.iconvLite = json['dependencies']['iconv-lite']
    payload.dependencies.minimatch = json['dependencies']['minimatch']
    payload.dependencies.nopt = json['dependencies']['nopt']
    payload.dependencies.rimraf = json['dependencies']['rimraf']
    payload.dependencies.lodash = json['dependencies']['lodash']
    payload.dependencies.underscoreString = json['dependencies']['underscore.string']
    payload.dependencies.which = json['dependencies']['which']
    payload.dependencies.jsYaml = json['dependencies']['js-yaml']
    payload.dependencies.exit = json['dependencies']['exit']
    payload.dependencies.getobject = json['dependencies']['getobject']
    payload.dependencies.gruntLegacyUtil = json['dependencies']['grunt-legacy-util']
    payload.dependencies.gruntLegacyLog = json['dependencies']['grunt-legacy-log']

    payload.devDependencies.temporary = json['devDependencies']['temporary']
    payload.devDependencies.gruntContribJshint = json['devDependencies']['grunt-contrib-jshint']
    payload.devDependencies.gruntContribNodeunit = json['devDependencies']['grunt-contrib-nodeunit']
    payload.devDependencies.gruntContribWatch = json['devDependencies']['grunt-contrib-watch']
    payload.devDependencies.difflet = json['devDependencies']['difflet']
    payload.devDependencies.semver = json['devDependencies']['semver']
    payload.devDependencies.shelljs = json['devDependencies']['shelljs']

    payload.readme = json['readme']
    payload._id = json['_id']
    payload._from = json['_from']

    return payload

def decode(payload):
    return {
        'name': payload.name,
        'description': payload.description,
        'version': payload.version,
        'author': {
            'name': payload.author.name,
            'url': payload.author.url
        },
        'homepage': payload.homepage,
        'repository': {
            'type': payload.repository.type,
            'url': payload.repository.url
        },
        'bugs': {
            'url': payload.bugs.url
        },
        'licenses': [
            {
                'type': payload.licenses[0].type,
                'url': payload.licenses[0].url
            }
        ],
        'main': payload.main,
        'scripts': {
            'test': payload.scripts.test
        },
        'engines': {
            'node': payload.engines.node
        },
        'keywords': list(payload.keywords),
        'dependencies': {
            'async': payload.dependencies.async1,
            'coffee-script': payload.dependencies.coffeeScript,
            'colors': payload.dependencies.colors,
            'dateformat': payload.dependencies.dateformat,
            'eventemitter2': payload.dependencies.eventemitter2,
            'findup-sync': payload.dependencies.findupSync,
            'glob': payload.dependencies.glob,
            'hooker': payload.dependencies.hooker,
            'iconv-lite': payload.dependencies.iconvLite,
            'minimatch': payload.dependencies.minimatch,
            'nopt': payload.dependencies.nopt,
            'rimraf': payload.dependencies.rimraf,
            'lodash': payload.dependencies.lodash,
            'underscore.string': payload.dependencies.underscoreString,
            'which': payload.dependencies.which,
            'js-yaml': payload.dependencies.jsYaml,
            'exit': payload.dependencies.exit,
            'getobject': payload.dependencies.getobject,
            'grunt-legacy-util': payload.dependencies.gruntLegacyUtil,
            'grunt-legacy-log': payload.dependencies.gruntLegacyLog
        },
        'devDependencies': {
            'temporary': payload.devDependencies.temporary,
            'grunt-contrib-jshint': payload.devDependencies.gruntContribJshint,
            'grunt-contrib-nodeunit': payload.devDependencies.gruntContribNodeunit,
            'grunt-contrib-watch': payload.devDependencies.gruntContribWatch,
            'difflet': payload.devDependencies.difflet,
            'semver': payload.devDependencies.semver,
            'shelljs': payload.devDependencies.shelljs,
        },
        'readme': payload.readme,
        '_id': payload._id,
        '_from': payload._from
    }
