import { useEffect, useRef } from "react";
import type { Votes } from "../../types/votes";
import css from "./VoteStats.module.css";

interface VoteStatsProps {
  votes: Votes;
  totalVotes: number;
  positiveRate: number;
}

export default function VoteStats({
  votes,
  totalVotes,
  positiveRate,
}: VoteStatsProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const previousRateRef = useRef(0);

  useEffect(() => {
    const fill = fillRef.current;

    if (!fill) return;

    const previousRate = previousRateRef.current;
    previousRateRef.current = positiveRate;

    const nextWidth = `${positiveRate}%`;

    if (typeof fill.animate !== "function") {
      fill.style.width = nextWidth;
      return;
    }

    const animation = fill.animate(
      [{ width: `${previousRate}%` }, { width: nextWidth }],
      {
        duration: 350,
        easing: "ease",
        fill: "forwards",
      },
    );

    return () => {
      if (fill.isConnected) animation.commitStyles();
      animation.cancel();
    };
  }, [positiveRate]);

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h2 className={css.heading}>Live stats</h2>
        <p className={css.subtitle}>Updated with every vote</p>
      </div>

      <div className={css.grid}>
        <p className={`${css.stat} ${css.good}`}>
          Good: <strong>{votes.good}</strong>
        </p>
        <p className={`${css.stat} ${css.neutral}`}>
          Neutral: <strong>{votes.neutral}</strong>
        </p>
        <p className={`${css.stat} ${css.bad}`}>
          Bad: <strong>{votes.bad}</strong>
        </p>
        <p className={`${css.stat} ${css.total}`}>
          Total: <strong>{totalVotes}</strong>
        </p>
      </div>

      <div className={css.positive}>
        <div className={css.positiveMeta}>
          <p className={css.stat}>
            Positive: <strong>{positiveRate}%</strong>
          </p>
          <span className={css.positiveHint}>share of good votes</span>
        </div>
        <div
          className={css.progressTrack}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={positiveRate}
          aria-label="Positive feedback rate"
        >
          <div className={css.progressFill} ref={fillRef} />
        </div>
      </div>
    </div>
  );
}
