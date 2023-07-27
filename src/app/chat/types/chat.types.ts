export interface sourceDocumentProps {
    metadata: {
        docPath: string;
        loc: string;
        pageContent: string;
    }
}

export interface MessageResponse {
    text: string;
    sourceDocuments: sourceDocumentProps[];
}