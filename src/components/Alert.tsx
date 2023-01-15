import React, { useState } from "react";

interface Props {
  message: string;
}

const Alert = ({ message }: Props) => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => setVisible(false);
  // set timeout to close the alert after 3 seconds
  setTimeout(() => {
    setVisible(false);
  }, 5000);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`bg-blue-100 text-blue-700 p-4 mb-4 text-sm rounded-lg `}
      role="alert"
      onClick={handleClose}
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};
export default Alert;
