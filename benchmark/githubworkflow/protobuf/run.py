def encode(json, schema):
    payload = schema.Main()
    payload.name = json['name']
    payload.on.extend(json['on'])

    payload.jobs.build.runsOn = json['jobs']['build']['runs-on']
    payload.jobs.build.env.buildSuiteDir = json['jobs']['build']['env']['build-suite-dir']

    step1 = payload.jobs.build.steps.add()
    step2 = payload.jobs.build.steps.add()
    step3 = payload.jobs.build.steps.add()
    step4 = payload.jobs.build.steps.add()

    step1.uses = json['jobs']['build']['steps'][0]['uses']

    step2.uses = json['jobs']['build']['steps'][1]['uses']
    step2.with1.nodeVersion = json['jobs']['build']['steps'][1]['with']['node-version']

    step3.name = json['jobs']['build']['steps'][2]['name']
    step3.run = json['jobs']['build']['steps'][2]['run']

    step4.name = json['jobs']['build']['steps'][3]['name']
    step4.run = json['jobs']['build']['steps'][3]['run']
    step4.workingDirectory = json['jobs']['build']['steps'][3]['working-directory']

    return payload

def decode(payload):
    return {
        'name': payload.name,
        'on': list(payload.on),
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
