interface Props {
  className?: string;
}

export const Services: React.FC<Props> = ({ className }) => (
  <svg
    clipRule="evenodd"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
    className={className}
  >
    <path
      d="m6 18v3c0 .621.52 1 1 1h14c.478 0 1-.379 1-1v-14c0-.478-.379-1-1-1h-3v-3c0-.478-.379-1-1-1h-14c-.62 0-1 .519-1 1v14c0 .621.52 1 1 1zm10.5-12h-9.5c-.62 0-1 .519-1 1v9.5h-2.5v-13h13z"
      fillRule="nonzero"
    ></path>
  </svg>
);
