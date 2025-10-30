'use client';

import React from 'react';

interface UXMapProps {
  currentStep: string;
}

type TreeNode = {
  label: string;
  key: string;
  children?: TreeNode[];
};

const TREE: TreeNode = {
  label: 'Loading',
  key: 'Loading',
  children: [
    {
      label: 'Auth',
      key: 'Auth',
      children: [
        { label: 'My Cards', key: 'My Cards' },
        {
          label: 'My Cards',
          key: 'My Cards Root',
          children: [
            { label: 'OTC Card', key: 'OTC Card' },
            { label: 'Uber Card', key: 'Uber Card' },
            { label: 'Discover Card', key: 'Discover Card' },
            { label: 'Walmart Card', key: 'Walmart Card' }
          ]
        },
        {
          label: 'My Actions',
          key: 'My Actions',
          children: [{ label: 'Action Detail', key: 'Action Detail' }]
        },
        { label: 'My Program', key: 'My Program' },
        { label: 'Help', key: 'Help' },
        {
          label: 'Scanner',
          key: 'Scanner',
          children: [
            { label: 'Launch Scanner', key: 'Launch Scanner' },
            { label: 'Report Missing Product', key: 'Report Missing Product' }
          ]
        }
      ]
    }
  ]
};

function normalizeStep(step: string): string {
  if (step.startsWith('Action Detail')) return 'Action Detail';
  return step;
}

export default function UXMap({ currentStep }: UXMapProps) {
  const active = normalizeStep(currentStep);

  const renderNode = (node: TreeNode, depth = 0) => {
    const isActive = node.key === active;
    return (
      <div key={`${node.key}-${depth}`} className="relative">
        <div className="flex items-start">
          {/* Connector column */}
          <div className="flex flex-col items-center mr-2">
            {depth > 0 && <div className="w-px h-5 bg-gray-300" />}
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-blue-600' : 'bg-gray-300'}`} />
          </div>

          {/* Node pill */}
          <div
            className={`text-xs px-3 py-1.5 rounded-full border mb-2 ${
              isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 text-gray-700 border-gray-200'
            }`}
          >
            {node.label}
          </div>
        </div>

        {/* Children with left border tree line */}
        {node.children && node.children.length > 0 && (
          <div className="ml-3 pl-3 border-l border-gray-300">
            {node.children.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-[400px] mt-4 md:mt-0 md:sticky md:top-8">
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-gray-900">Demo UX Map</h3>
          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600">{currentStep}</span>
        </div>

        <div>
          {renderNode(TREE)}
        </div>
      </div>
    </div>
  );
}


