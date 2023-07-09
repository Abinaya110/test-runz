import { Modal } from "antd";
import { ReactChild } from "react";
import Text from "../packages/Text/Text";
import SvgClose from "../icons/SvgClose";
import Flex from "../packages/Flex/Flex";
import styles from "./yesorno.module.css";
import Button from "../packages/Button/Button";

type Props = {
  open: boolean;
  yesClick: () => void;
  noClick: () => void;
  icon: ReactChild;
  description: string;
  title: string;
};
const YesOrNo = ({
  open,
  yesClick,
  noClick,
  icon,
  description,
  title,
}: Props) => {
  return (
    <Modal
      onCancel={noClick}
      title={<Text type="title">{title}</Text>}
      closeIcon={<SvgClose />}
      centered
      open={open}
      footer={
        <Flex row center middle className={styles.footer}>
          <Button onClick={noClick} className={styles.noBtn} types="tertiary">
            No
          </Button>
          <Button onClick={yesClick} className={styles.yesBtn}>
            Yes
          </Button>
        </Flex>
      }
    >
      <Flex center middle>
        {icon}
        <Text
          align="center"
          className={styles.desText}
          type="bodyBold"
          color="shade-2"
        >
          {description}
        </Text>
      </Flex>
    </Modal>
  );
};

export default YesOrNo;
