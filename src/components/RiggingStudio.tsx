import React, { useState } from 'react';
import { SVGPuppetDefinition } from '../types/tuber';
import { Upload, CheckCircle, Sliders, Layers, Sparkles, X } from 'lucide-react';

interface RiggingStudioProps {
  onAddCustomPuppet: (puppet: SVGPuppetDefinition) => void;
  onClose: () => void;
}

const RIGGING_LAYER_FIELDS = [
  { key: 'head', label: 'Head Base Layer ID', default: 'head_base_group' },
  { key: 'body', label: 'Body & Clothes Group ID', default: 'body_group' },
  { key: 'hairFront', label: 'Hair Front Strand ID', default: 'hair_front_group' },
  { key: 'hairBack', label: 'Hair Back Strand ID', default: 'hair_back_group' },
  { key: 'eyeLeft', label: 'Left Eye Group ID', default: 'eye_left_group' },
  { key: 'eyeRight', label: 'Right Eye Group ID', default: 'eye_right_group' },
  { key: 'nose', label: 'Nose Layer ID', default: 'nose_group' },
  { key: 'mouth', label: 'Mouth Container ID', default: 'mouth_group' },
  { key: 'ears', label: 'Ears / Accessories ID', default: 'ears_group' },
  { key: 'eyebrows', label: 'Eyebrows Group ID', default: 'eyebrows_group' },
  { key: 'eyeLeftClosed', label: 'Left Closed Eye ID', default: 'eye_left_closed' },
  { key: 'eyeRightClosed', label: 'Right Closed Eye ID', default: 'eye_right_closed' },
  { key: 'irisLeft', label: 'Left Iris ID', default: 'iris_left' },
  { key: 'irisRight', label: 'Right Iris ID', default: 'iris_right' },
  { key: 'mouthClosed', label: 'Mouth Closed Line ID', default: 'mouth_closed' },
  { key: 'mouthSmile', label: 'Mouth Smile Shape ID', default: 'mouth_smile' },
  { key: 'mouthOpenWide', label: 'Mouth Open Wide ID', default: 'mouth_open_wide' },
  { key: 'mouthO', label: 'Mouth O-Shape ID', default: 'mouth_o' },
  { key: 'exprBlush', label: 'Expression: Blush ID', default: 'expr_blush' },
  { key: 'exprAngry', label: 'Expression: Angry ID', default: 'expr_angry' },
  { key: 'exprShock', label: 'Expression: Shock ID', default: 'expr_shock' },
  { key: 'exprTears', label: 'Expression: Tears ID', default: 'expr_tears' },
  { key: 'exprStars', label: 'Expression: Stars ID', default: 'expr_stars' },
  { key: 'exprHearts', label: 'Expression: Hearts ID', default: 'expr_hearts' },
];

export const RiggingStudio = React.memo<RiggingStudioProps>(({ onAddCustomPuppet, onClose }) => {
  const [svgRaw, setSvgRaw] = useState<string | null>(null);
  const [puppetName, setPuppetName] = useState<string>('My Custom Puppet');
  const [discoveredLayers, setDiscoveredLayers] = useState<string[]>([]);
  const [layerMap, setLayerMap] = useState<Record<string, string>>({});

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('SVG file exceeds 5MB limit.');
      e.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSvgRaw(content);

      // Extract IDs from SVG
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'image/svg+xml');
      const elementsWithId = Array.from(doc.querySelectorAll('[id]')).map((el) => el.id);
      setDiscoveredLayers(elementsWithId);

      // Auto-match layer IDs if elements with matching names or keywords exist
      const initialMap: Record<string, string> = {};
      RIGGING_LAYER_FIELDS.forEach((item) => {
        initialMap[item.key] = '';
      });

      RIGGING_LAYER_FIELDS.forEach((item) => {
        if (elementsWithId.includes(item.default)) {
          initialMap[item.key] = item.default;
        } else {
          const found = elementsWithId.find((id) =>
            id.toLowerCase().includes(item.key.toLowerCase()) ||
            id.toLowerCase().includes(item.default.toLowerCase())
          );
          if (found) initialMap[item.key] = found;
        }
      });

      setLayerMap(initialMap);
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleSavePuppet = () => {
    if (!svgRaw) return;

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgRaw, 'image/svg+xml');

      const parserError = doc.querySelector('parsererror');
      if (parserError) {
        alert('Invalid SVG file format.');
        return;
      }

      const svgEl = doc.querySelector('svg');
      if (svgEl) {
        svgEl.setAttribute('shape-rendering', 'geometricPrecision');
        svgEl.setAttribute('text-rendering', 'geometricPrecision');
        svgEl.setAttribute('color-interpolation-filters', 'sRGB');
        if (!svgEl.getAttribute('style')) {
          svgEl.setAttribute('style', 'width: 100%; height: 100%; overflow: visible;');
        }
      }

      // Re-assign selected layer IDs to engine default IDs
      RIGGING_LAYER_FIELDS.forEach((item) => {
        const selectedId = layerMap[item.key];
        const targetEngineId = item.default;

        if (selectedId && selectedId !== targetEngineId) {
          const el = doc.getElementById(selectedId);
          if (el) {
            const existingTarget = doc.getElementById(targetEngineId);
            if (existingTarget && existingTarget !== el) {
              existingTarget.removeAttribute('id');
            }
            el.setAttribute('id', targetEngineId);
          }
        }
      });

      const processedSvg = new XMLSerializer().serializeToString(doc);

      const newPuppet: SVGPuppetDefinition = {
        id: `custom_${Date.now()}`,
        name: puppetName.trim() || 'My Custom Puppet',
        author: 'User Created',
        defaultConfig: {
          hairSpringStiffness: 0.2,
          hairDamping: 0.85,
          earBounce: 0.5,
          bodySway: 0.3,
        },
        expressionLayers: {
          neutral: [],
          happy: ['expr_blush'],
          angry: ['expr_angry'],
          shocked: ['expr_shock'],
          blush: ['expr_blush'],
          tears: ['expr_tears'],
          star_eyes: ['expr_stars'],
          heart_eyes: ['expr_hearts'],
        },
        svgContent: processedSvg,
      };

      onAddCustomPuppet(newPuppet);
      onClose();
    } catch (err) {
      console.error('Error saving custom puppet:', err);
      alert('Error parsing or saving custom SVG puppet.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full max-w-4xl glass-panel rounded-2xl border border-indigo-500/30 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <h2 className="text-xl font-bold font-outfit text-white">Custom SVG Puppet Studio</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column: Upload & SVG Preview */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-medium text-slate-300">Puppet Name</label>
            <input
              type="text"
              value={puppetName}
              onChange={(e) => setPuppetName(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
            />

            <label className="text-sm font-medium text-slate-300">Upload Vector SVG File</label>
            <div className="relative border-2 border-dashed border-slate-700 hover:border-indigo-500 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition bg-slate-900/40">
              <input
                type="file"
                accept=".svg"
                onChange={handleFileUpload}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <Upload className="w-10 h-10 text-indigo-400 mb-2" />
              <p className="text-sm font-semibold text-slate-200">Click or drag SVG file here</p>
              <p className="text-xs text-slate-400 mt-1">Supports vector SVGs with grouped layers</p>
            </div>

            {svgRaw && (
              <div className="mt-4 p-4 glass-card rounded-xl border border-slate-700/60 max-h-[300px] flex items-center justify-center overflow-hidden">
                <div
                  className="w-full h-full max-h-[260px] flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: svgRaw }}
                />
              </div>
            )}
          </div>

          {/* Right Column: Layer Inspector & Mapping */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <Layers className="w-4 h-4" />
              <span>Layer Inspector ({discoveredLayers.length} nodes found)</span>
            </div>

            {discoveredLayers.length > 0 ? (
              <div className="flex flex-col gap-3 max-h-[350px] overflow-y-auto pr-2">
                {RIGGING_LAYER_FIELDS.map((item) => (
                  <div key={item.key} className="flex flex-col gap-1">
                    <label className="text-xs text-slate-400">{item.label}</label>
                    <select
                      value={layerMap[item.key] || ''}
                      onChange={(e) => setLayerMap({ ...layerMap, [item.key]: e.target.value })}
                      className="px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 focus:border-indigo-500"
                    >
                      <option value="">Auto-detect / Default ({item.default})</option>
                      {discoveredLayers.map((id) => (
                        <option key={id} value={id}>
                          #{id}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-500 glass-card rounded-xl">
                Upload an SVG file to inspect layer tags and configure rigging.
              </div>
            )}

            <div className="mt-auto pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                disabled={!svgRaw}
                onClick={handleSavePuppet}
                className="flex items-center gap-2 px-6 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition shadow-lg shadow-indigo-600/30"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save & Import Puppet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
