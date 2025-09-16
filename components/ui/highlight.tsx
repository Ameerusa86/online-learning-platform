import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/cjs/styles/prism";

interface HighlightProps {
  code: string;
  language: string;
}

const Highlight: React.FC<HighlightProps> = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={coy} showLineNumbers>
      {code}
    </SyntaxHighlighter>
  );
};

export default Highlight;
