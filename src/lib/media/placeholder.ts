export interface PlaceholderConfig {
  title: string;
  category: string;
}

export function generateProjectPlaceholderSVG(title: string, category: string): string {
  const codeSnippet = `// RIITHIS_ENGINE // MODULE: ${category.toUpperCase().replace(/\s+/g, "_")}\nclass ${title.replace(/[^a-zA-Z0-9]/g, "")}Service {\n  private readonly status = "OPERATIONAL";\n  public async execute() { return true; }\n}`;
  
  const encodedText = encodeURIComponent(codeSnippet);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#05140d" />
        <stop offset="50%" stop-color="#0b291a" />
        <stop offset="100%" stop-color="#020905" />
      </linearGradient>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#0b5d3b" stroke-width="0.5" opacity="0.15" />
      </pattern>
    </defs>
    <rect width="1200" height="675" fill="url(#bg)" />
    <rect width="1200" height="675" fill="url(#grid)" />
    <rect x="80" y="80" width="1040" height="515" rx="8" fill="#020905" stroke="#0b5d3b" stroke-width="1" opacity="0.6" />
    <circle cx="110" cy="110" r="6" fill="#e11d48" />
    <circle cx="130" cy="110" r="6" fill="#eab308" />
    <circle cx="150" cy="110" r="6" fill="#22c55e" />
    <text x="180" y="115" font-family="monospace" font-size="14" fill="#0b5d3b">${category} :: SYSTEM_PLACEHOLDER</text>
    <line x1="80" y1="135" x2="1120" y2="135" stroke="#0b5d3b" stroke-width="1" opacity="0.3" />
    <text x="110" y="200" font-family="monospace" font-size="28" font-weight="bold" fill="#f3f4f6">${title}</text>
    <text x="110" y="280" font-family="monospace" font-size="14" fill="#10b981" xml:space="preserve">${encodedText}</text>
  </svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}