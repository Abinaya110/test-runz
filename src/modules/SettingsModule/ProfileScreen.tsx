import Flex from "../../packages/Flex/Flex";
import styles from "./settings.module.css";
import InputText from "../../packages/InputText/InputText";
import SvgDesignation from "../../icons/SvgDesignation";
import SvgOrganisation from "../../icons/SvgOrganisation";
import SvgUserInput from "../../icons/SvgUserInput";
import SvgProfileEdit from "../../icons/SvgProfileEdit";
import ScreenHeader from "./ScreenHeader";
import Accordion from "../../packages/Accordian/Accordian";
import { useVisibilityIcon } from "../../utils/helpers";

const ProfileScreen = () => {
  const { visibleIcon, isVisible } = useVisibilityIcon();

  return (
    <Flex>
      <ScreenHeader
        title={"Profile Settings"}
        description={"Edit your profile appearance / name / contact info etc."}
        isSearch={true}
        isBtn={false}
      />

      <Flex row className={styles.marginTopToggel}>
        <Flex column className={styles.PrfileleftOverall}>
          <Flex className={styles.rightHeadFlex}>
            <Flex center className={styles.marginTopDp}>
              <SvgProfileEdit height={200} width={200} />
            </Flex>
          </Flex>
        </Flex>

        <Flex className={styles.rightOverall}>
          <Flex className={styles.accordianParent}>
            <Accordion title="General Profile">
              <Flex className={styles.profileOverall}>
                <Flex row start>
                  <Flex column className={styles.inputFlexMarginRight}>
                    <InputText
                      disabled
                      label="First name"
                      required
                      placeholder="First name"
                    />
                  </Flex>
                  <Flex column className={styles.inputFlexMarginLeft}>
                    <InputText
                      placeholder="Last name"
                      label="Last name"
                      required
                    />
                  </Flex>
                </Flex>
                <Flex row className={styles.marginVer}>
                  <Flex className={styles.inputFlexMarginRight}>
                    <InputText
                      placeholder="username@gmail.com"
                      label="Email"
                      required
                    />
                  </Flex>
                  <Flex className={styles.inputFlexMarginLeft}>
                    <InputText
                      label="Mobile"
                      required
                      placeholder="000000023"
                    />
                  </Flex>
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    label="Organisation"
                    required
                    placeholder="Organisation name"
                    actionLeft={() => <SvgOrganisation />}
                  />
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    label="Department"
                    required
                    placeholder="Department name"
                    actionLeft={() => <SvgOrganisation />}
                  />
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    label="Organisation"
                    required
                    placeholder="Organisation name"
                    actionLeft={() => <SvgOrganisation />}
                  />
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    label="Labs assigned"
                    required
                    placeholder="Organisation name"
                    actionLeft={() => <SvgOrganisation />}
                  />
                </Flex>

                <Flex row>
                  <Flex className={styles.inputFlexMarginRight}>
                    <InputText
                      actionLeft={() => <SvgDesignation />}
                      label="Designation"
                      required
                      placeholder="Designation"
                    />
                  </Flex>
                  <Flex className={styles.inputFlexMarginLeft}>
                    <InputText
                      label="Requestor ID/Tester ID"
                      required
                      placeholder="Requestor ID/Tester ID"
                      actionLeft={() => <SvgUserInput />}
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Accordion>

            <Accordion title="Change Password">
              <Flex className={styles.profileOverall}>
                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    autoComplete="new-password"
                    white
                    label={"Enter old password"}
                    keyboardType={isVisible ? "text" : "password"}
                    actionRight={visibleIcon}
                  />
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    autoComplete="new-password"
                    white
                    label={"Enter new password"}
                    keyboardType={isVisible ? "text" : "password"}
                    actionRight={visibleIcon}
                  />
                </Flex>

                <Flex className={styles.mainFieldWidth}>
                  <InputText
                    autoComplete="new-password"
                    white
                    label={"Confirm new password"}
                    keyboardType={isVisible ? "text" : "password"}
                    actionRight={visibleIcon}
                  />
                </Flex>
              </Flex>
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileScreen;