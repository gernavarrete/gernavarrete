import s from "./ArrowIcon.module.css";

const BACK_PATH = "M17.77 3.77 16 2 6 12l10 10 1.77-1.77L9.54 12z";
const FORWARD_PATH = "M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z";

function ArrowIcon({ direction, className, onClick }) {
  const path = direction === "back" ? BACK_PATH : FORWARD_PATH;
  const classes = className ? `${s.arrowIcon} ${className}` : s.arrowIcon;

  return (
    <svg
      className={classes}
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      onClick={onClick}
    >
      <path d={path} />
    </svg>
  );
}

export function ArrowBackIcon({ className, onClick }) {
  return (
    <ArrowIcon direction="back" className={className} onClick={onClick} />
  );
}

export function ArrowForwardIcon({ className, onClick }) {
  return (
    <ArrowIcon direction="forward" className={className} onClick={onClick} />
  );
}

export default ArrowIcon;
