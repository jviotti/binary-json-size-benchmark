#include <fstream>
#include "schema_reflection.h"

#include <bond/core/bond.h>
#include <bond/protocol/simple_json_writer.h>

int main(const int argc, const char ** argv) {
  const std::string binary_file{argv[1]};
  const std::string output_file{argv[2]};

  // Get runtime schema
  bond::OutputBuffer schema_output_buffer;
  bond::CompactBinaryWriter<bond::OutputBuffer> schema_writer(schema_output_buffer);
  bond::RuntimeSchema runtime_schema = bond::GetRuntimeSchema<benchmark::Main>();
  bond::Serialize(runtime_schema, schema_writer);
  bond::blob schema_buffer = schema_output_buffer.GetBuffer();
  boost::shared_ptr<bond::SchemaDef> schema(boost::make_shared<bond::SchemaDef>());
  {
    bond::CompactBinaryReader<bond::InputBuffer> schema_reader(schema_buffer);
    bond::Deserialize(schema_reader, *schema);
  }

  // Read binary file
  std::ifstream binary_stream{binary_file, std::ios::binary};
  std::vector<unsigned char> buffer(std::istreambuf_iterator<char>(binary_stream), {});
  bond::blob data{buffer.data(), static_cast<uint32_t>(buffer.size())};
  binary_stream.close();

  // Transcode to SimpleJSON
  bond::InputBuffer input(data);
  bond::CompactBinaryReader<bond::InputBuffer> reader(input);
  bond::bonded<void> payload(reader, schema);
  bond::OutputBuffer json;
  bond::SimpleJsonWriter<bond::OutputBuffer> writer(json);
  bond::Serialize(payload, writer);
  bond::blob output = json.GetBuffer();

  // Write JSON back to file
  std::ofstream output_file_stream;
  output_file_stream.open(output_file);
  output_file_stream.write(output.content(), output.size());
  output_file_stream.close();

  return 0;
}
