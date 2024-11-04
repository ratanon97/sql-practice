import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import SchemaViewer from './components/SchemaViewer';
import { challenges } from './data/challenges';
import type { ChallengeState } from './types';

function App() {
  const [selectedChallengeId, setSelectedChallengeId] = useState(challenges[0].id);
  const [challengeStates, setChallengeStates] = useState<Record<string, ChallengeState>>(() => {
    // Initialize states for all challenges
    return challenges.reduce((acc, challenge) => ({
      ...acc,
      [challenge.id]: {
        currentQuery: challenge.initialQuery,
        isCorrect: null,
        showHint: false,
        showExplanation: false,
      },
    }), {});
  });

  const currentChallenge = challenges.find((c) => c.id === selectedChallengeId)!;
  const currentState = challengeStates[selectedChallengeId];

  const handleQueryChange = (query: string) => {
    setChallengeStates((prev) => ({
      ...prev,
      [selectedChallengeId]: {
        ...prev[selectedChallengeId],
        currentQuery: query,
      },
    }));
  };

  const handleRunQuery = () => {
    // In a real application, this would send the query to a backend
    // For now, we'll just compare with the expected result
    const isCorrect = currentState.currentQuery.trim().toLowerCase() ===
      currentChallenge.initialQuery.trim().toLowerCase();

    setChallengeStates((prev) => ({
      ...prev,
      [selectedChallengeId]: {
        ...prev[selectedChallengeId],
        isCorrect,
      },
    }));
  };

  const toggleHint = () => {
    setChallengeStates((prev) => ({
      ...prev,
      [selectedChallengeId]: {
        ...prev[selectedChallengeId],
        showHint: !prev[selectedChallengeId].showHint,
      },
    }));
  };

  const toggleExplanation = () => {
    setChallengeStates((prev) => ({
      ...prev,
      [selectedChallengeId]: {
        ...prev[selectedChallengeId],
        showExplanation: !prev[selectedChallengeId].showExplanation,
      },
    }));
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <Sidebar
        challenges={challenges}
        selectedChallenge={selectedChallengeId}
        onSelectChallenge={setSelectedChallengeId}
      />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <Editor
            challenge={currentChallenge}
            currentQuery={currentState.currentQuery}
            onQueryChange={handleQueryChange}
            onRunQuery={handleRunQuery}
            isCorrect={currentState.isCorrect}
            showHint={currentState.showHint}
            showExplanation={currentState.showExplanation}
            onToggleHint={toggleHint}
            onToggleExplanation={toggleExplanation}
          />
        </div>
        <div className="w-80 border-l border-gray-800">
          <SchemaViewer schema={currentChallenge.schema} />
        </div>
      </div>
    </div>
  );
}

export default App;