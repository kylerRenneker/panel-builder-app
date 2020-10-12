import * as React from "react";
import "./_WelcomeModal.scss";
import PanelContext from "../../contexts/PanelContext";

const WelcomeModal = (props) => {
  const { setShowSizeForm } = React.useContext(PanelContext);

  React.useEffect(() => {
    // setShowSizeForm(false);
  });

  console.log("setShowSizeForm: ", setShowSizeForm);

  return <div></div>;
};

export default WelcomeModal;
