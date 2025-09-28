"use client";

import { useState } from "react";

import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

const getAllFields = (doc: Docxtemplater<PizZip>) : string[] => {

    const text = doc.getFullText();
    const matches = text.match(/{(.*?)}/g);
    
    if(!matches) return [];

    const placeholders = matches.map((m) => m.slice(1, -1));

    return Array.from(new Set(placeholders));

}

export default function Home() {

    const [file, setFile] = useState<File | null>(null);
    const [placeholder, setPlaceholder] = useState("");
    const [replacement, setReplacement] = useState("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const onClick = async () => {
        if (!file || !placeholder) return;

        const arrayBuffer = await file.arrayBuffer();
        const zip = new PizZip(arrayBuffer);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

        console.log(getAllFields(doc));

    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>Dynamic DOCX Find & Replace</h2>
            <input type="file" accept=".docx" onChange={handleFileChange} />
            <div style={{ marginTop: "1rem" }}>
                <input
                    type="text"
                    placeholder="Placeholder (e.g., name)"
                    value={placeholder}
                    onChange={(e) => setPlaceholder(e.target.value)}
                    style={{ marginRight: "1rem" }}
                />
                <input
                    type="text"
                    placeholder="Replacement (e.g., Nick)"
                    value={replacement}
                    onChange={(e) => setReplacement(e.target.value)}
                />
            </div>
            <button
                onClick={onClick}
                disabled={!file || !placeholder}
                style={{ marginTop: "1rem" }}
            >
                Replace & Open
            </button>
        </div>
    );

}
