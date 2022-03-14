import React from "react";
import "./style.scss";
import {
  FacebookShareButton,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton
} from "react-share";
import Modal from "react-modal";

export default function ShareModel(props) {
  const shareUrl = `https://wuzzuf.net/${props.value}`;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      transform: " translate(-50%, -50%)",
      width: "339px",
      height: "fit-content"
    }
  };

  return (
    <div className="modal">
      <Modal
        isOpen={props.isOpen}
        contentLabel="share"
        overlayClassName="Overlay"
        onRequestClose={props.closeModal}
        style={customStyles}
      >
        <div className=" ">
          <div className="">
            <FacebookShareButton
              url={shareUrl}
              quote={props.quote}
              hashtag={"#jobs..."}
            >
              <FacebookIcon size={40} round={true} />
            </FacebookShareButton>
            <TwitterShareButton
              url={shareUrl}
              quote={props.quote}
              hashtag={"#jobs..."}
            >
              <TwitterIcon size={40} round={true} />
            </TwitterShareButton>
            <WhatsappShareButton
              url={shareUrl}
              quote={props.quote}
              hashtag={"#jobs..."}
            >
              <WhatsappIcon size={40} round={true} />
            </WhatsappShareButton>

            <EmailShareButton
              url={shareUrl}
              quote={props.quote}
              hashtag={"#jobs..."}
            >
              <EmailIcon size={40} round={true} />
            </EmailShareButton>
            <LinkedinShareButton
              url={shareUrl}
              quote={props.quote}
              hashtag={"#jobs..."}
            >
              <LinkedinIcon size={40} round={true} />
            </LinkedinShareButton>
          </div>
          <div className="mt-3 d-flex">
            <input readonly="" class="form-control" value={props.value} />
            <button class="btn btn-sm btn-primary" onClick={props.toggle}>
              Copy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
