type HighlightTextProps = {
  text: string;
  search: string;
};

const HighlightText = ({ text, search }: HighlightTextProps) => {
  if (!search.trim()) {
    return <span>{text}</span>;
  }

  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapedSearch})`, "gi");

  return (
    <span className="min-w-0 wrap-break-word">
      {text.split(regex).map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span
            key={index}
            className="bg-blue-400 text-foreground rounded px-0.5"
          >
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </span>
  );
};

export default HighlightText;
