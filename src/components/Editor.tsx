import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Challenge } from '../types';
import { Play, HelpCircle, Check, X, BookOpen } from 'lucide-react';

interface EditorProps {
  challenge: Challenge;
  currentQuery: string;
  onQueryChange: (value: string) => void;
  onRunQuery: () => void;
  isCorrect: boolean | null;
  showHint: boolean;
  showExplanation: boolean;
  onToggleHint: () => void;
  onToggleExplanation: () => void;
}

export default function Editor({
  challenge,
  currentQuery,
  onQueryChange,
  onRunQuery,
  isCorrect,
  showHint,
  showExplanation,
  onToggleHint,
  onToggleExplanation,
}: EditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-900 p-4 text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold">{challenge.title}</h2>
            <span className={`text-sm ${
              challenge.difficulty === 'Easy' ? 'text-green-500' :
              challenge.difficulty === 'Medium' ? 'text-yellow-500' : 'text-red-500'
            }`}>
              {challenge.difficulty}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onToggleHint}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Show hint"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
            <button
              onClick={onToggleExplanation}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              title="Show explanation"
            >
              <BookOpen className="w-5 h-5" />
            </button>
            <button
              onClick={onRunQuery}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
          </div>
        </div>
        <p className="text-gray-300 mb-4">{challenge.description}</p>
        {showHint && (
          <div className="bg-gray-800 p-3 rounded-lg mb-4">
            <p className="text-sm text-gray-300">💡 Hint: {challenge.hint}</p>
          </div>
        )}
        {showExplanation && (
          <div className="bg-gray-800/50 p-4 rounded-lg mb-4">
            <h3 className="text-lg font-semibold mb-2">Explanation</h3>
            <div className="text-sm text-gray-300 space-y-2 whitespace-pre-wrap">
              {challenge.explanation}
            </div>
          </div>
        )}
        {isCorrect !== null && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg mb-4 ${
            isCorrect ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'
          }`}>
            {isCorrect ? (
              <Check className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
            <span>
              {isCorrect ? 'Correct! Well done!' : 'Not quite right. Try again!'}
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 bg-[#1e1e1e]">
        <MonacoEditor
          height="100%"
          language="sql"
          theme="vs-dark"
          value={currentQuery}
          onChange={(value) => onQueryChange(value || '')}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
          }}
        />
      </div>
    </div>
  );
}