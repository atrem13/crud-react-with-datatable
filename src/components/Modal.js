import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import styled from "styled-components";

const Wrapper = styled("div")`
  position: fixed;
  inset: 0;
  min-width: 100vh;
  overflow-y: auto;
  z-index: 10;
  justify-content: center;
  transition: 0.4ms;
  display: flex;
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  background: ${({ show }) =>
    show ? "rgba(0, 0, 0, 0.2)" : "rgba(0, 0, 0, 0)"};
  transition: 0.2s;
`;

const Card = styled("div")`
  margin-top: 100px;
  background: #fff;
  padding: 40px;
  width: 545px;
  transition: 0.2s;
  opacity: 0;
  visibility: hidden;

  ${({ show }) =>
    show &&
    `
    opacity: 1;
    visibility: visible;
  `}
`;

const Modal = (props) => {
  const { show = false, title = "", onClose = undefined } = props;
  const [renderContent, setRenderContent] = useState(true);

  useEffect(() => {
    if (show) {
      setRenderContent(true);
    } else {
      setTimeout(() => {
        setRenderContent(false);
      }, 300);
    }
  }, [show]);

  return (
    <Wrapper show={show}>
      <div style={{ height: "fit-content", paddingBottom: "100px" }}>
        <Card show={show}>
          <div
            className="grid grid-cols-2 items-center"
            style={{ marginBottom: "20px" }}
          >
            {!!title && <h1>{title}</h1>}

            {onClose && (
              <button className="bg-red-500 p-1 rounded text-white ml-auto -mt-2" onClick={() => onClose()}>
                <IoClose size={22} />
              </button>
            )}
          </div>
          <div>{renderContent && props.children}</div>
        </Card>
      </div>
    </Wrapper>
  );
};

export default Modal;
