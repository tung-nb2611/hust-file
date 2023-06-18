import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function PaperIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 30.34 30.34">
      <path d="M22.562 12.491s1.227-.933.293-1.866c-.934-.933-1.842.271-1.842.271l-9.389 9.391s-2.199 2.838-3.871 1.122c-1.67-1.718 1.121-3.872 1.121-3.872l12.311-12.31s2.873-3.165 5.574-.466c2.697 2.7-.477 5.579-.477 5.579L12.449 24.173s-4.426 5.113-8.523 1.015 1.066-8.474 1.066-8.474L15.494 6.209s1.176-.982.295-1.866c-.885-.883-1.865.295-1.865.295L1.873 16.689s-4.549 4.989.531 10.068c5.08 5.082 10.072.533 10.072.533l16.563-16.565s3.314-3.655-.637-7.608-7.607-.639-7.607-.639L6.543 16.728s-3.65 2.969-.338 6.279c3.312 3.314 6.227-.39 6.227-.39l10.13-10.126z"></path>
    </SvgIcon>
  );
}

export default PaperIcon;