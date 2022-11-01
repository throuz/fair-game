import "./Footer.css";
import contractAddress from "../utils/contractAddress";

const Footer = () => {
  const onContractAddressClick = () => {
    window
      .open(`https://bscscan.com/address/${contractAddress}`, "_blank")
      .focus();
  };

  const onTelegramClick = () => {
    window.open("https://t.me/+En-AsBSMqeRlZmU1", "_blank").focus();
  };

  const onYoutubeClick = () => {
    window
      .open(
        "https://www.youtube.com/channel/UCb6hxQuHEWPaA6dlfRp7fhg",
        "_blank"
      )
      .focus();
  };

  return (
    <footer>
      <div className="footer-btn-group">
        <button className="external-link-btn" onClick={onContractAddressClick}>
          CONTRACT
        </button>
        <button className="external-link-btn" onClick={onTelegramClick}>
          TELEGRAM
        </button>
        <button className="external-link-btn" onClick={onYoutubeClick}>
          YOUTUBE
        </button>
      </div>
      <h4>Copyright © 2022 Throuz</h4>
    </footer>
  );
};

export default Footer;
