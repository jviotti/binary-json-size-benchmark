def encode(json, schema):
    payload = schema.Main()
    payload.version = json['version']
    payload.workflows = schema.Workflows()
    payload.workflows.test = schema.TestWorkflow()
    payload.workflows.test.jobs = [
        schema.Job()
    ]

    payload.workflows.test.jobs[0].m1 = schema.M1()
    payload.workflows.test.jobs[0].m1.matrix = schema.Matrix()
    payload.workflows.test.jobs[0].m1.matrix.parameters = schema.Parameters()
    payload.workflows.test.jobs[0].m1.matrix.parameters.a = \
            json['workflows']['test']['jobs'][0]['m1']['matrix']['parameters']['a']

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
                                    'a': payload.workflows.test.jobs[0].m1.matrix.parameters.a
                                }
                            }
                        }
                    }
                ]
            }
        }
    }
