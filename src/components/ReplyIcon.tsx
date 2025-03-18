import React from "react";

interface ReplyIconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
}

export default function ReplyIcon({
  color = "currentColor",
  ...props
}: ReplyIconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_9129_1684)">
        <path
          d="M16.0007 13.9993H14.6673V11.9993C14.6673 8.66602 12.0007 5.99935 8.66732 5.99935H5.33398V4.66602H8.66732C12.734 4.66602 16.0007 7.93268 16.0007 11.9993V13.9993Z"
          fill={color}
        />
        <path d="M2 5.33333L5.33333 8.66667V2L2 5.33333Z" fill={color} />
      </g>
      <defs>
        <clipPath id="clip0_9129_1684">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
