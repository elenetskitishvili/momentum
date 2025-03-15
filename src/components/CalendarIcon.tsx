type CheckIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

export default function CalendarIcon({
  color = "currentColor",
  ...props
}: CheckIconProps) {
  return (
    <svg
      width={props.width || 16}
      height={props.height || 17}
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.00065 1.16406V2.4974H10.0007V1.16406H11.334V2.4974H14.0007C14.3689 2.4974 14.6673 2.79588 14.6673 3.16406V13.8307C14.6673 14.1989 14.3689 14.4974 14.0007 14.4974H2.00065C1.63246 14.4974 1.33398 14.1989 1.33398 13.8307V3.16406C1.33398 2.79588 1.63246 2.4974 2.00065 2.4974H4.66732V1.16406H6.00065ZM13.334 7.83073H2.66732V13.1641H13.334V7.83073ZM4.66732 3.83073H2.66732V6.4974H13.334V3.83073H11.334V5.16406H10.0007V3.83073H6.00065V5.16406H4.66732V3.83073Z"
        fill={color}
      />
    </svg>
  );
}
