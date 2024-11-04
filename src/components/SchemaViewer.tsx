import React from 'react';
import { Database } from 'lucide-react';

interface SchemaViewerProps {
  schema: string;
}

export default function SchemaViewer({ schema }: SchemaViewerProps) {
  return (
    <div className="h-full bg-gray-900 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Database className="w-5 h-5 text-blue-400" />
        <h2 className="text-lg font-semibold text-white">Schema</h2>
      </div>
      <pre className="text-sm font-mono bg-gray-800 p-4 rounded-lg text-gray-300 overflow-x-auto whitespace-pre-wrap">
        {schema}
      </pre>
    </div>
  );
}