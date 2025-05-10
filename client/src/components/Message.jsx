import { useContext } from "react";
import { MessageContext } from "../contexts/MessageContext";

function Message() {
  const { message, setMessage } = useContext(MessageContext);

return (
  <>
    <div
      className="toast-container position-fixed"
      style={{ top: "64px", right: "15px" }}
    >
      {message.title && (
        <div
          className="toast show"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className={`toast-header bg-${message.type}`}>
            <strong className="me-auto">{message.title}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setMessage({})}
            ></button>
          </div>
          <div className="toast-body">{message.text}</div>
        </div>
      )}
    </div>
  </>
);
}
export default Message;