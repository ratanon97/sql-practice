import React from 'react';
import { Challenge } from '../types';
import { Database } from 'lucide-react';

interface SidebarProps {
  challenges: Challenge[];
  selectedChallenge: string;
  onSelectChallenge: (id: string) => void;
}

export default function Sidebar({
  challenges,
  selectedChallenge,
  onSelectChallenge,
}: SidebarProps) {
  const difficultyOrder = { 'Easy': 0, 'Medium': 1, 'Hard': 2 };
  const sortedChallenges = [...challenges].sort((a, b) => {
    const diffDiff = difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    if (diffDiff !== 0) return diffDiff;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="w-64 bg-gray-800 text-white overflow-y-auto">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <Database className="w-6 h-6 text-blue-400" />
          <h1 className="text-xl font-bold">SQL Practice</h1>
        </div>
        <div className="space-y-4">
          {Object.entries(difficultyOrder).map(([difficulty]) => (
            <div key={difficulty}>
              <h2 className="text-sm font-semibold text-gray-400 mb-2">
                {difficulty}
              </h2>
              <div className="space-y-1">
                {sortedChallenges
                  .filter((challenge) => challenge.difficulty === difficulty)
                  .map((challenge) => (
                    <button
                      key={challenge.id}
                      onClick={() => onSelectChallenge(challenge.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedChallenge === challenge.id
                          ? 'bg-blue-600 text-white'
                          : 'hover:bg-gray-700 text-gray-300'
                      }`}
                    >
                      {challenge.title}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}