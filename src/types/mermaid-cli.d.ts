declare module '@mermaid-js/mermaid-cli' {
  export interface RunOptions {
    outputFormat?: 'svg' | 'png' | 'pdf';
    quiet?: boolean;
    parseMMDOptions?: {
      mermaidConfig?: Record<string, unknown>;
      puppeteerConfig?: Record<string, unknown>;
    };
  }

  export function run(
    input: string,
    output: string,
    options?: RunOptions
  ): Promise<void>;
}
