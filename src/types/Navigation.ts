export type NavItem = {
    to: string;
    label: string;
    icon: React.ReactNode; 
    action?: () => void;
  };
  
  
  export type MenuSection = {
    title: string;
    items: NavItem[];
  };
  