import { create } from "zustand";

interface UseOnboardingStateProps {
  notNew: boolean;
  forRegistration: (value: boolean) => void;
}

const useOnboarding = create<UseOnboardingStateProps>((set) => ({
  notNew: false,
  forRegistration: (value: boolean) => {
    console.log(value);
    set({ notNew: !value });
  },
}));

export default useOnboarding;
