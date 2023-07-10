import { useState } from "react";

type Props = {
  buttons: string[];
  defaultSelected?: string;
  onButtonChange: (a: any) => void;
};
const ButtonGroup = ({ buttons, defaultSelected, onButtonChange }: Props) => {
  const [selectedButton, setSelectedButton] = useState(defaultSelected);

  const handleButtonClick = (button: any) => {
    setSelectedButton(button);
    if (onButtonChange) {
      onButtonChange(button);
    }
  };

  return (
    <div>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(button)}
          className={selectedButton === button ? "active" : ""}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
