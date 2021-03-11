def encode(json, schema):
    payload = schema.Main()
    payload.version = json['version']
    job = payload.workflows.test.jobs.add()
    job.m1.matrix.parameters.a.extend(json['workflows']['test']['jobs'][0]['m1']['matrix']['parameters']['a'])
    return payload

def decode(payload):
    return {
        'version': payload.version,
        'workflows': {
            'test': {
                'jobs': [
                    {
                        'm1': {
                            'matrix': {
                                'parameters': {
                                    'a': payload.workflows.test.jobs[0].m1.matrix.parameters.a._values
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
