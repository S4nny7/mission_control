import { Navigate, useNavigate } from "react-router-dom";
import "./GoBackButton.css";

interface GoBackButtonProps {
  label?: string;
  fallbackPath?: string;
}

function GoBackButton({
  label = "Go Back",
  fallbackPath = "/",
}: GoBackButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate(fallbackPath);
    }
  }

  return (
    <button type="button" className="go-back-btn" onClick={handleClick}>
      {label}
    </button>
  );
}

export default GoBackButton;
