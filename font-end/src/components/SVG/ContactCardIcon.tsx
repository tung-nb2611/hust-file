import { SvgIcon, SvgIconProps } from "@material-ui/core";
import React from "react";

function ContactCardIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 58 46">
      <path
        d="M22.5257 22.9999C25.7869 22.9999 28.1924 20.5944 28.1924 17.3333C28.1924 14.0721 25.7869 11.6666 22.5257 11.6666C19.2646 11.6666 16.8591 14.0721 16.8591 17.3333C16.8591 20.5944 19.2617 22.9999 22.5257 22.9999Z"
        fill="currentColor"
      />
      <path d="M45.9998 14.4999H34.6665V20.1666H45.9998V14.4999Z" fill="currentColor" />
      <path d="M45.9998 25.8332H37.4998V31.4999H45.9998V25.8332Z" fill="currentColor" />
      <path
        d="M22.5257 25.1249C28.3028 25.1249 33.0515 30.4403 33.0515 34.3332H11.9998C11.9998 30.4403 16.7485 25.1249 22.5257 25.1249Z"
        fill="currentColor"
      />
      <path
        d="M51.6665 0.333252H6.33317C3.208 0.333252 0.666504 2.71608 0.666504 5.64575V40.3541C0.666504 43.2837 3.208 45.6666 6.33317 45.6666H51.6665C54.7917 45.6666 57.3332 43.2837 57.3332 40.3541V5.64575C57.3332 2.71608 54.7917 0.333252 51.6665 0.333252ZM51.6665 39.9999L6.33317 39.9688V5.99992L51.6665 6.03109V39.9999Z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}

export default ContactCardIcon;
