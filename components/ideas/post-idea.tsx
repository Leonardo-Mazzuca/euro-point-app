import React, { useState } from "react";
import ProgramSelectModal from "./program-select-modal";
import ProgramConfirmModal from "./program-confirm-modal";
import ProgramRedirectModal from "./program-redirect-modal";
import Toast from "react-native-toast-message";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  onFinalize: () => void;
};

export type IdeaPostProps = {
  onNextStep?: (step: string) => void;
  onPrevStep?: (step: string) => void;
  close: () => void;
};
const PostIdea = ({ open, setOpen, onFinalize}: Props) => {
  const steps = ["select-program", "confirm", "redirect"];
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const [selectedProgram, setSelectedProgram] = useState("");

  const onNextStep = (step: string) => {
    setCurrentStep(step);
  };

  const onPrevStep = (step: string) => {
    setCurrentStep(step);
  };

  const close = () => {
    setOpen(false);
  };

  //simulates post function, cuz this is just a demo
  const submit = () => {
    Toast.show({
      type: "success",
      text1: `Ideia criada com sucesso no program ${selectedProgram}`,
    })
    onFinalize();
    setCurrentStep(steps[0]);
    close();
  }

  return open ? (
    <>
      {currentStep === steps[0] && (
        <ProgramSelectModal
          close={close}
          onNextStep={onNextStep}
          setSelectedProgram={setSelectedProgram}
        />
      )}
      {currentStep === steps[1] && (
        <ProgramConfirmModal
          close={close}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
          selectedProgram={selectedProgram}
        />
      )}
      {currentStep === steps[2] && (
        <ProgramRedirectModal
          close={close}
          onPrevStep={onPrevStep}
          submit={submit}
        />
      )}
    </>
  ) : null;
};

export default PostIdea;
