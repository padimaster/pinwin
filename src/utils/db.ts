import { Chroma } from "langchain/vectorstores/chroma";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import path from "path";

/* export const loadDocuments = async () => {
    const directory = path.join(__dirname, "docs/files/");

    const loader = new DirectoryLoader(directory, {
        ".pdf": (currentPath) => new PDFLoader(currentPath)
    });
    const docsLoaded = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
    const docs = await textSplitter.splitDocuments(docsLoaded);

    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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",
    });
    const vectorDB = await Chroma.fromDocuments(docs, embeddings, {
        collectionName: "a-test-collection",
    });

    return vectorDB;
}; */

export const loadDb = async () => {
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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",
    });

    const vectorDB = await Chroma.fromExistingCollection(embeddings, {
        collectionName: "a-test-collection",
    });

    return vectorDB;
}