import {TabLabels} from 'Screens.tsx';

export type AppBottomNavBtnProps = {
  label: TabLabels;
  icon: string;
  handleClick: (label: TabLabels) => void;
  isActive: boolean;
  isBig?: boolean;
};
