import express from 'express';
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { HfInference } from "@huggingface/inference";
import fs from "fs/promises";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint for processing queries
app.post('/api/query', async (req, res) => {
  try {
    const { query } = req.body;
    
    // Implement your vector search logic here
    // This would use your existing code but for searching instead of storing
    
    res.json({ response: "This is a placeholder response for: " + query });
  } catch (error) {
    console.error("Error processing query:", error);
    res.status(500).json({ error: "An error occurred while processing your query" });
  }
});

// API endpoint for processing data
app.post('/api/process', async (req, res) => {
  try {
    await processData();
    res.json({ success: true, message: "Data processed successfully" });
  } catch (error) {
    console.error("Error processing data:", error);
    res.status(500).json({ error: "An error occurred while processing data" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

async function processData() {
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
            inputs: text,
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