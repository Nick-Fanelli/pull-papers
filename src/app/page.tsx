"use client";

import { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const getAllFields = (doc: Docxtemplater<PizZip>): string[] => {
    const text = doc.getFullText();
    const matches = text.match(/{(.*?)}/g);
    if (!matches) return [];
    const placeholders = matches.map((m) => m.slice(1, -1));
    return Array.from(new Set(placeholders));
};

export default function Home() {
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [replacement, setReplacement] = useState("");
    const [fields, setFields] = useState<string[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
            setUrl("");
        }
    };

    const loadDocFromUrl = async (docUrl: string) => {
        const res = await fetch(docUrl);
        const arrayBuffer = await res.arrayBuffer();
        return arrayBuffer;
    };

    const onClick = async () => {
        if (!placeholder) return;

        let arrayBuffer: ArrayBuffer | null = null;

        if (file) {
            arrayBuffer = await file.arrayBuffer();
        } else if (url) {
            arrayBuffer = await loadDocFromUrl(url);
        }

        if (!arrayBuffer) return;

        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        const foundFields = getAllFields(doc);
        setFields(foundFields);

        console.log("Fields:", foundFields);
        // At this point you could apply replacements and generate a blob
    };

    return (
        <div className="p-6 max-w-2xl mx-auto">
            <div className="card shadow-xl bg-base-100 p-6">
                <h2 className="text-2xl font-bold mb-4">Dynamic DOCX Find & Replace</h2>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Upload .docx File</span>
                    </label>
                    <input
                        type="file"
                        accept=".docx"
                        onChange={handleFileChange}
                        className="file-input file-input-bordered w-full"
                    />
                </div>

                <div className="divider">OR</div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Enter .docx URL</span>
                    </label>
                    <input
                        type="url"
                        placeholder="https://example.com/template.docx"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setFile(null);
                        }}
                        className="input input-bordered w-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                        type="text"
                        placeholder="Placeholder (e.g., name)"
                        value={placeholder}
                        onChange={(e) => setPlaceholder(e.target.value)}
                        className="input input-bordered w-full"
                    />
                    <input
                        type="text"
                        placeholder="Replacement (e.g., Nick)"
                        value={replacement}
                        onChange={(e) => setReplacement(e.target.value)}
                        className="input input-bordered w-full"
                    />
                </div>

                <button
                    onClick={onClick}
                    disabled={(!file && !url) || !placeholder}
                    className="btn btn-primary w-full"
                >
                    Replace & Open
                </button>

                {fields.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Found Fields</h3>
                        <ul className="list-disc list-inside">
                            {fields.map((f) => (
                                <li key={f}>{f}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
