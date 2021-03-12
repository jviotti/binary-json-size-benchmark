def encode(json, schema):
    payload = schema.Main()

    payload.basics.name = json['basics']['name']
    payload.basics.label = json['basics']['label']
    payload.basics.picture = json['basics']['picture']
    payload.basics.email = json['basics']['email']
    payload.basics.phone = json['basics']['phone']
    payload.basics.website = json['basics']['website']
    payload.basics.summary = json['basics']['summary']

    payload.basics.location.address = json['basics']['location']['address']
    payload.basics.location.postalCode = json['basics']['location']['postalCode']
    payload.basics.location.city = json['basics']['location']['city']
    payload.basics.location.countryCode = json['basics']['location']['countryCode']
    payload.basics.location.region = json['basics']['location']['region']

    profile1 = payload.basics.profiles.add()
    profile2 = payload.basics.profiles.add()

    profile1.network = json['basics']['profiles'][0]['network']
    profile1.username = json['basics']['profiles'][0]['username']
    profile1.url = json['basics']['profiles'][0]['url']

    profile2.network = json['basics']['profiles'][1]['network']
    profile2.username = json['basics']['profiles'][1]['username']
    profile2.url = json['basics']['profiles'][1]['url']

    work1 = payload.work.add()
    work1.company = json['work'][0]['company']
    work1.position = json['work'][0]['position']
    work1.website = json['work'][0]['website']
    work1.startDate = json['work'][0]['startDate']
    work1.endDate = json['work'][0]['endDate']
    work1.summary = json['work'][0]['summary']
    work1.highlights.extend(json['work'][0]['highlights'])

    volunteer1 = payload.volunteer.add()
    volunteer1.organization = json['volunteer'][0]['organization']
    volunteer1.position = json['volunteer'][0]['position']
    volunteer1.website = json['volunteer'][0]['website']
    volunteer1.startDate = json['volunteer'][0]['startDate']
    volunteer1.endDate = json['volunteer'][0]['endDate']
    volunteer1.summary = json['volunteer'][0]['summary']
    volunteer1.highlights.extend(json['volunteer'][0]['highlights'])

    education1 = payload.education.add()
    education1.institution = json['education'][0]['institution']
    education1.area = json['education'][0]['area']
    education1.studyType = json['education'][0]['studyType']
    education1.startDate = json['education'][0]['startDate']
    education1.endDate = json['education'][0]['endDate']
    education1.gpa = json['education'][0]['gpa']
    education1.courses.extend(json['education'][0]['courses'])

    award1 = payload.awards.add()
    award1.title = json['awards'][0]['title']
    award1.date = json['awards'][0]['date']
    award1.awarder = json['awards'][0]['awarder']
    award1.summary = json['awards'][0]['summary']

    publication1 = payload.publications.add()
    publication1.name = json['publications'][0]['name']
    publication1.publisher = json['publications'][0]['publisher']
    publication1.releaseDate = json['publications'][0]['releaseDate']
    publication1.website = json['publications'][0]['website']
    publication1.summary = json['publications'][0]['summary']

    skill1 = payload.skills.add()
    skill2 = payload.skills.add()
    skill1.name = json['skills'][0]['name']
    skill1.level = json['skills'][0]['level']
    skill1.keywords.extend(json['skills'][0]['keywords'])
    skill2.name = json['skills'][1]['name']
    skill2.level = json['skills'][1]['level']
    skill2.keywords.extend(json['skills'][1]['keywords'])

    language1 = payload.languages.add()
    language1.language = json['languages'][0]['language']
    language1.fluency = json['languages'][0]['fluency']

    interest1 = payload.interests.add()
    interest1.name = json['interests'][0]['name']
    interest1.keywords.extend(json['interests'][0]['keywords'])

    reference1 = payload.references.add()
    reference1.name = json['references'][0]['name']
    reference1.reference = json['references'][0]['reference']

    return payload

def decode(payload):
    return {
      'basics': {
        'name': payload.basics.name,
        'label': payload.basics.label,
        'picture': payload.basics.picture,
        'email': payload.basics.email,
        'phone': payload.basics.phone,
        'website': payload.basics.website,
        'summary': payload.basics.summary,
        'location': {
          'address': payload.basics.location.address,
          'postalCode': payload.basics.location.postalCode,
          'city': payload.basics.location.city,
          'countryCode': payload.basics.location.countryCode,
          'region': payload.basics.location.region
        },
        'profiles': [
          {
            'network': payload.basics.profiles[0].network,
            'username': payload.basics.profiles[0].username,
            'url': payload.basics.profiles[0].url
          },
          {
            'network': payload.basics.profiles[1].network,
            'username': payload.basics.profiles[1].username,
            'url': payload.basics.profiles[1].url
          }
        ]
      },
      'work': [
        {
          'company': payload.work[0].company,
          'position': payload.work[0].position,
          'website': payload.work[0].website,
          'startDate': payload.work[0].startDate,
          'endDate': payload.work[0].endDate,
          'summary': payload.work[0].summary,
          'highlights': list(payload.work[0].highlights)
        }
      ],
      'volunteer': [
        {
          'organization': payload.volunteer[0].organization,
          'position': payload.volunteer[0].position,
          'website': payload.volunteer[0].website,
          'startDate': payload.volunteer[0].startDate,
          'endDate': payload.volunteer[0].endDate,
          'summary': payload.volunteer[0].summary,
          'highlights': list(payload.volunteer[0].highlights)
        }
      ],
      'education': [
        {
          'institution': payload.education[0].institution,
          'area': payload.education[0].area,
          'studyType': payload.education[0].studyType,
          'startDate': payload.education[0].startDate,
          'endDate': payload.education[0].endDate,
          'gpa': payload.education[0].gpa,
          'courses': list(payload.education[0].courses)
        }
      ],
      'awards': [
        {
          'title': payload.awards[0].title,
          'date': payload.awards[0].date,
          'awarder': payload.awards[0].awarder,
          'summary': payload.awards[0].summary
        }
      ],
      'publications': [
        {
          'name': payload.publications[0].name,
          'publisher': payload.publications[0].publisher,
          'releaseDate': payload.publications[0].releaseDate,
          'website': payload.publications[0].website,
          'summary': payload.publications[0].summary
        }
      ],
      'skills': [
        {
          'name': payload.skills[0].name,
          'level': payload.skills[0].level,
          'keywords': list(payload.skills[0].keywords)
        },
        {
          'name': payload.skills[1].name,
          'level': payload.skills[1].level,
          'keywords': list(payload.skills[1].keywords)
        }
      ],
      'languages': [
        {
          'language': payload.languages[0].language,
          'fluency': payload.languages[0].fluency
        }
      ],
      'interests': [
        {
          'name': payload.interests[0].name,
          'keywords': list(payload.interests[0].keywords)
        }
      ],
      'references': [
        {
          'name': payload.references[0].name,
          'reference': payload.references[0].reference
        }
      ]
    }
