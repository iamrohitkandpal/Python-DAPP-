# Document AI Processing Pipeline (DAPP)

<div align="center">

![Python-DAPP](https://img.shields.io/badge/Python--DAPP-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Supabase](https://img.shields.io/badge/Supabase-Vector%20Store-orange)](https://supabase.io/)
[![Hugging Face](https://img.shields.io/badge/Hugging%20Face-Embeddings-red)](https://huggingface.co/)

</div>

## 📋 Overview

This project demonstrates a modern document processing pipeline that uses AI to process, analyze, and retrieve information from text documents. It showcases how to build a system that can ingest text data, split it into manageable chunks, generate vector embeddings, and store them in a vector database for semantic search and retrieval.

## 🚀 Technologies & Libraries

This project leverages several cutting-edge technologies:

- **LangChain**: Document processing and text splitting
- **Supabase**: Vector database for storing embeddings
- **Hugging Face**: AI models for generating embeddings
- **Node.js**: JavaScript runtime environment
- **Environmental Variables**: Secure configuration management

## 🧠 What You'll Learn

Through this project, you'll gain practical experience with:

- **Vector Embeddings**: Converting text into numerical representations that capture semantic meaning
- **Document Processing**: Splitting large documents into smaller, manageable chunks
- **Vector Databases**: Storing and retrieving information based on semantic similarity
- **API Integration**: Working with Hugging Face and Supabase APIs
- **Modern JavaScript**: Using ES modules, async/await, and modern JS patterns

## 🛠️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iamrohitkandpal/Python-DAPP-
   cd Python-DAPP
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file with the following variables:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_API_KEY=your_supabase_key
   HF_API_KEY=your_huggingface_key
   ```

4. **Set up Supabase**
   - Create a new Supabase project
   - Enable vector extensions
   - Create a 'documents' table with appropriate columns

## 📊 Project Structure

```
Python-DAPP/
├── .env                 # Environment variables
├── .gitignore           # Git ignore file
├── data-feed.txt        # Sample data for processing
├── index.js             # Main application code
├── index.html           # Web interface (minimal)
├── output.md            # Output sample
├── package.json         # Project dependencies
├── README.md            # Project documentation
└── style.css            # Minimal styling
```

## 🔄 How It Works

1. Text is loaded from a file
2. The document is split into manageable chunks
3. Each chunk is converted to a vector embedding using Hugging Face models
4. The embeddings are stored in a Supabase vector database
5. (Future capability) Semantic search and retrieval

## 💻 Usage Example

```javascript
// Process a document and store in vector database
node index.js

// Future: Perform semantic search on your documents
// node search.js "What are renewable energy technologies?"
```

## 🌟 Key Features

- **Document Chunking**: Intelligent splitting of documents
- **Vector Embeddings**: Convert text to semantic numerical representations
- **Persistent Storage**: Save embeddings for future retrieval
- **AI-Powered**: Utilizes state-of-the-art language models

## 🧩 Potential Extensions

- Add a query interface for semantic search
- Implement RAG (Retrieval Augmented Generation)
- Create a web UI for document uploading and searching
- Add support for PDF and other document formats

## 📚 Resources for Learning

- [LangChain Documentation](https://js.langchain.com/docs/)
- [Supabase Vector Store Guide](https://supabase.com/docs/guides/ai)
- [Hugging Face Transformers](https://huggingface.co/docs/transformers/index)
- [Vector Embeddings Explained](https://www.pinecone.io/learn/vector-embeddings/)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions welcome! Please feel free to submit a Pull Request.
