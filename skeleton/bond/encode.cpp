#include <sstream>
#include <fstream>

#include "schema_reflection.h"

#include <bond/core/bond.h>
#include <bond/protocol/simple_json_reader.h>

// From https://stackoverflow.com/a/116220
std::string slurp(std::ifstream& input_stream) {
  std::ostringstream string_stream;
  string_stream << input_stream.rdbuf();
  return string_stream.str();
}

int main(const int argc, const char ** argv) {
  const std::string json_file{argv[1]};
  const std::string output_file{argv[2]};

  // Read JSON file
  std::ifstream json_file_stream{json_file};
  std::string json_string = slurp(json_file_stream);
  json_file_stream.close();

  // Deserialize JSON
  benchmark::Main payload;
  bond::SimpleJsonReader<const char *> json_reader(json_string.c_str());
  bond::Deserialize(json_reader, payload);

  // Serialize to CompactBinary protocol
  bond::OutputBuffer output;
  bond::CompactBinaryWriter<bond::OutputBuffer> writer(output);
  bond::Serialize(payload, writer);
  bond::blob data = output.GetBuffer();

  // Write results to file
  std::ofstream file;
  file.open(output_file);
  file.write(data.content(), data.length());
  file.close();

  return 0;
}
