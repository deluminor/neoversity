import type { VoteType } from "../../types/votes";
import css from "./VoteOptions.module.css";

interface VoteOptionsProps {
  onVote: (type: VoteType) => void;
  onReset: () => void;
  canReset: boolean;
}

const VOTE_BUTTONS = [
  { type: "good", label: "Good", className: css.good },
  { type: "neutral", label: "Neutral", className: css.neutral },
  { type: "bad", label: "Bad", className: css.bad },
] as const satisfies ReadonlyArray<{
  type: VoteType;
  label: string;
  className: string;
}>;

export default function VoteOptions({
  onVote,
  onReset,
  canReset,
}: VoteOptionsProps) {
  const voteHandler = (type: VoteType) => () => {
    onVote(type);
  };

  return (
    <div className={css.container}>
      {VOTE_BUTTONS.map(({ type, label, className }) => (
        <button
          key={type}
          type="button"
          className={`${css.button} ${className}`}
          onClick={voteHandler(type)}
        >
          {label}
        </button>
      ))}
      {canReset && (
        <button
          type="button"
          className={`${css.button} ${css.reset}`}
          onClick={onReset}
        >
          Reset
        </button>
      )}
    </div>
  );
}
