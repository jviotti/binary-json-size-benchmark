struct Location {
  1: required string address,
  2: required string postalCode,
  3: required string city,
  4: required string countryCode,
  5: required string region
}

struct Profile {
  1: required string network,
  2: required string username,
  3: required string url
}

struct Basics {
  1: required string name,
  2: required string label,
  3: required string picture,
  4: required string email,
  5: required string phone,
  6: required string website,
  7: required string summary,
  8: required Location location,
  9: required list<Profile> profiles
}

struct Work {
  1: required string company,
  2: required string position,
  3: required string website,
  4: required string startDate,
  5: required string endDate,
  6: required string summary,
  7: required list<string> highlights
}

struct Volunteer {
  1: required string organization,
  2: required string position,
  3: required string website,
  4: required string startDate,
  5: required string endDate,
  6: required string summary,
  7: required list<string> highlights
}

struct Education {
  1: required string institution,
  2: required string area,
  3: required string studyType,
  4: required string startDate,
  5: required string endDate,
  6: required string gpa,
  7: required list<string> courses
}

struct Award {
  1: required string title,
  2: required string date,
  3: required string awarder,
  4: required string summary
}

struct Publication {
  1: required string name,
  2: required string publisher,
  3: required string releaseDate,
  4: required string website,
  5: required string summary
}

struct Skill {
  1: required string name,
  2: required string level,
  3: required list<string> keywords
}

struct Language {
  1: required string language,
  2: required string fluency
}

struct Interest {
  1: required string name,
  2: required list<string> keywords
}

struct Reference {
  1: required string name,
  2: required string reference
}

struct Main {
  1: required Basics basics,
  2: required list<Work> work,
  3: required list<Volunteer> volunteer,
  4: required list<Education> education,
  5: required list<Award> awards,
  6: required list<Publication> publications,
  7: required list<Skill> skills,
  8: required list<Language> languages,
  9: required list<Interest> interests,
  10: required list<Reference> references
}
