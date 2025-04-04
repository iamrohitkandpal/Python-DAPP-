import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

try {
  const result = await fetch("data-feed.txt");
  const text = await result.text();

  const splitter = new RecursiveCharacterTextSplitter();

  const output = await splitter.createDocuemnts([text]);

  console.log("Output:", output);
} catch (error) {
  console.error("Error fetching data:", error);
}
