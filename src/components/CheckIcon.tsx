type CheckIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

export default function CheckIcon({
  color = "currentColor",
  ...props
}: CheckIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.3327 4L5.99935 11.3333L2.66602 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
