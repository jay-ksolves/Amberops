
import mongoose, { Schema } from 'mongoose';
import type { DocumentationArticle as IDocumentationArticle } from '@amberops/lib';

const DocumentationSchema = new Schema<IDocumentationArticle>({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true });

export const Documentation = mongoose.models.Documentation || mongoose.model<IDocumentationArticle>('Documentation', DocumentationSchema);
