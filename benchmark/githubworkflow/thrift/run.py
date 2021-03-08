def encode(json, schema):
    payload = schema.Main()
    payload.name = json['name']
    payload.on = json['on']
    payload.jobs = schema.Jobs()
    payload.jobs.build = schema.Build()
    payload.jobs.build.runsOn = json['jobs']['build']['runs-on']
    payload.jobs.build.env = schema.Environment()
    payload.jobs.build.env.buildSuiteDir = json['jobs']['build']['env']['build-suite-dir']
    payload.jobs.build.steps = [
        schema.Step(),
        schema.Step(),
        schema.Step(),
        schema.Step()
    ]

    payload.jobs.build.steps[0].uses = json['jobs']['build']['steps'][0]['uses']

    payload.jobs.build.steps[1].uses = json['jobs']['build']['steps'][1]['uses']
    payload.jobs.build.steps[1].with1 = schema.With()
    payload.jobs.build.steps[1].with1.nodeVersion = json['jobs']['build']['steps'][1]['with']['node-version']

    payload.jobs.build.steps[2].name = json['jobs']['build']['steps'][2]['name']
    payload.jobs.build.steps[2].run = json['jobs']['build']['steps'][2]['run']

    payload.jobs.build.steps[3].name = json['jobs']['build']['steps'][3]['name']
    payload.jobs.build.steps[3].run = json['jobs']['build']['steps'][3]['run']
    payload.jobs.build.steps[3].workingDirectory = json['jobs']['build']['steps'][3]['working-directory']

    return payload

def decode(payload):
    return {
        'name': payload.name,
        'on': payload.on,
        'jobs': {
            'build': {
                'runs-on': payload.jobs.build.runsOn,
                'env': {
                    'build-suite-dir': payload.jobs.build.env.buildSuiteDir
                },
                'steps': [
                    {
                        'uses': payload.jobs.build.steps[0].uses
                    },
                    {
                        'uses': payload.jobs.build.steps[1].uses,
                        'with': {
                            'node-version': payload.jobs.build.steps[1].with1.nodeVersion
                        }
                    },
                    {
                        'name': payload.jobs.build.steps[2].name,
                        'run': payload.jobs.build.steps[2].run
                    },
                    {
                        'name': payload.jobs.build.steps[3].name,
                        'run': payload.jobs.build.steps[3].run,
                        'working-directory': payload.jobs.build.steps[3].workingDirectory
                    }
                ]
            }
        }
    }
