import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HfInference } from "@huggingface/inference";
import fs from "fs/promises";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

async function processText() {
  try {
    // Read file using Node.js fs module
    const text = await fs.readFile("data-feed.txt", "utf-8");

    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500,
      chunkOverlap: 50,
      separators: ["\n\n", "\n", " ", ""],
    });
    const output = await splitter.createDocuments([text]);

    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbURL = process.env.SUPABASE_URL;
    const HFApiKey = process.env.HF_API_KEY;

    if (!sbApiKey || !sbURL || !HFApiKey) {
      throw new Error("Missing required environment variables");
    }

    const client = createClient(sbURL, sbApiKey);
    
    // Create HF Inference client
    const hf = new HfInference(HFApiKey);
    
    // Create custom embeddings class that interfaces with LangChain
    class CustomHFEmbeddings {
      constructor(client, model) {
        this.client = client;
        this.model = model;
      }
      
      async embedDocuments(texts) {
        const embeddings = [];
        for (const text of texts) {
          const embedding = await this.embedQuery(text);
          embeddings.push(embedding);
        }
        return embeddings;
      }
      
      async embedQuery(text) {
        // Call HF API directly
        const response = await this.client.featureExtraction({
          model: this.model,
          inputs: text
        });
        return response;
      }
    }
    
    const embeddings = new CustomHFEmbeddings(
      hf, 
      "sentence-transformers/all-MiniLM-L6-v2"
    );

    // Store documents in Supabase
    const vectorStore = await SupabaseVectorStore.fromDocuments(
      output,
      embeddings,
      {
        client,
        tableName: "documents",
      }
    );

    console.log("Successfully stored documents in vector store");
    return vectorStore;
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

processText();
