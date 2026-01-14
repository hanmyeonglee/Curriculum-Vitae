declare module 'markdown-it-bracketed-spans' {
    import MarkdownIt = require('markdown-it');
    function bracketed_spans_plugin(md: MarkdownIt): void;
    export = bracketed_spans_plugin;
}
