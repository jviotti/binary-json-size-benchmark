def encode(json, schema):
    payload = schema.Main()

    payload.basics = schema.Basics()
    payload.basics.name = json['basics']['name']
    payload.basics.label = json['basics']['label']
    payload.basics.picture = json['basics']['picture']
    payload.basics.email = json['basics']['email']
    payload.basics.phone = json['basics']['phone']
    payload.basics.website = json['basics']['website']
    payload.basics.summary = json['basics']['summary']

    payload.basics.location = schema.Location()
    payload.basics.location.address = json['basics']['location']['address']
    payload.basics.location.postalCode = json['basics']['location']['postalCode']
    payload.basics.location.city = json['basics']['location']['city']
    payload.basics.location.countryCode = json['basics']['location']['countryCode']
    payload.basics.location.region = json['basics']['location']['region']

    payload.basics.profiles = [
        schema.Profile(),
        schema.Profile()
    ]

    payload.basics.profiles[0].network = json['basics']['profiles'][0]['network']
    payload.basics.profiles[0].username = json['basics']['profiles'][0]['username']
    payload.basics.profiles[0].url = json['basics']['profiles'][0]['url']

    payload.basics.profiles[1].network = json['basics']['profiles'][1]['network']
    payload.basics.profiles[1].username = json['basics']['profiles'][1]['username']
    payload.basics.profiles[1].url = json['basics']['profiles'][1]['url']

    payload.work = [ schema.Work() ]
    payload.work[0].company = json['work'][0]['company']
    payload.work[0].position = json['work'][0]['position']
    payload.work[0].website = json['work'][0]['website']
    payload.work[0].startDate = json['work'][0]['startDate']
    payload.work[0].endDate = json['work'][0]['endDate']
    payload.work[0].summary = json['work'][0]['summary']
    payload.work[0].highlights = json['work'][0]['highlights']

    payload.volunteer = [ schema.Volunteer() ]
    payload.volunteer[0].organization = json['volunteer'][0]['organization']
    payload.volunteer[0].position = json['volunteer'][0]['position']
    payload.volunteer[0].website = json['volunteer'][0]['website']
    payload.volunteer[0].startDate = json['volunteer'][0]['startDate']
    payload.volunteer[0].endDate = json['volunteer'][0]['endDate']
    payload.volunteer[0].summary = json['volunteer'][0]['summary']
    payload.volunteer[0].highlights = json['volunteer'][0]['highlights']

    payload.education = [ schema.Education() ]
    payload.education[0].institution = json['education'][0]['institution']
    payload.education[0].area = json['education'][0]['area']
    payload.education[0].studyType = json['education'][0]['studyType']
    payload.education[0].startDate = json['education'][0]['startDate']
    payload.education[0].endDate = json['education'][0]['endDate']
    payload.education[0].gpa = json['education'][0]['gpa']
    payload.education[0].courses = json['education'][0]['courses']

    payload.awards = [ schema.Award() ]
    payload.awards[0].title = json['awards'][0]['title']
    payload.awards[0].date = json['awards'][0]['date']
    payload.awards[0].awarder = json['awards'][0]['awarder']
    payload.awards[0].summary = json['awards'][0]['summary']

    payload.publications = [ schema.Publication() ]
    payload.publications[0].name = json['publications'][0]['name']
    payload.publications[0].publisher = json['publications'][0]['publisher']
    payload.publications[0].releaseDate = json['publications'][0]['releaseDate']
    payload.publications[0].website = json['publications'][0]['website']
    payload.publications[0].summary = json['publications'][0]['summary']

    payload.skills = [ schema.Skill(), schema.Skill() ]
    payload.skills[0].name = json['skills'][0]['name']
    payload.skills[0].level = json['skills'][0]['level']
    payload.skills[0].keywords = json['skills'][0]['keywords']
    payload.skills[1].name = json['skills'][1]['name']
    payload.skills[1].level = json['skills'][1]['level']
    payload.skills[1].keywords = json['skills'][1]['keywords']

    payload.languages = [ schema.Language() ]
    payload.languages[0].language = json['languages'][0]['language']
    payload.languages[0].fluency = json['languages'][0]['fluency']

    payload.interests = [ schema.Interest() ]
    payload.interests[0].name = json['interests'][0]['name']
    payload.interests[0].keywords = json['interests'][0]['keywords']

    payload.references = [ schema.Reference() ]
    payload.references[0].name = json['references'][0]['name']
    payload.references[0].reference = json['references'][0]['reference']

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
          'highlights': payload.work[0].highlights
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
          'highlights': payload.volunteer[0].highlights
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
          'courses': payload.education[0].courses
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
          'keywords': payload.skills[0].keywords
        },
        {
          'name': payload.skills[1].name,
          'level': payload.skills[1].level,
          'keywords': payload.skills[1].keywords
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
          'keywords': payload.interests[0].keywords,
        }
      ],
      'references': [
        {
          'name': payload.references[0].name,
          'reference': payload.references[0].reference
        }
      ]
    }
