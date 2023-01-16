import { useMemo, useState } from "react";
import { useApp } from "../context/Appcontext";

interface Props {
  message: string;
}

enum AlertType {
  SLOW = "bg-blue-100 text-blue-700",
  ERROR = "bg-red-100 text-red-700",
}

const Alert = ({ message }: Props) => {
  const [visible, setVisible] = useState(false);
  const { slowStatus, errorStatus } = useApp();
  const handleClose = () => setVisible(false);

  useMemo(() => {
    if (slowStatus || errorStatus) {
      setVisible(true);
    }
  }, [slowStatus, errorStatus]);

  let alertCSS = "";
  if (slowStatus) {
    alertCSS = AlertType.SLOW;
  } else if (errorStatus) {
    alertCSS = AlertType.ERROR;
  }

  // set timeout to close the alert after 5 seconds
  setTimeout(() => {
    setVisible(false);
  }, 5000);

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`${alertCSS} p-4 mb-4 text-sm rounded-lg `}
      role="alert"
      onClick={handleClose}
    >
      <span className="font-medium">{message}</span>
    </div>
  );
};
export default Alert;
