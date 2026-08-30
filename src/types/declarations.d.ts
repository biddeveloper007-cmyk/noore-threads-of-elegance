declare module "lucide-react" {
  import React from "react";
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    size?: string | number;
    strokeWidth?: string | number;
  }
  export type Icon = React.FC<IconProps>;

  export const ArrowLeft: Icon;
  export const ArrowRight: Icon;
  export const Check: Icon;
  export const CheckCircle2: Icon;
  export const ChevronDown: Icon;
  export const ChevronLeft: Icon;
  export const ChevronRight: Icon;
  export const ChevronUp: Icon;
  export const Clock: Icon;
  export const Feather: Icon;
  export const Filter: Icon;
  export const Headphones: Icon;
  export const Heart: Icon;
  export const HelpCircle: Icon;
  export const Instagram: Icon;
  export const Mail: Icon;
  export const MapPin: Icon;
  export const Menu: Icon;
  export const MessageCircle: Icon;
  export const Minus: Icon;
  export const Package: Icon;
  export const Phone: Icon;
  export const Plus: Icon;
  export const RotateCcw: Icon;
  export const Search: Icon;
  export const ShieldCheck: Icon;
  export const ShoppingBag: Icon;
  export const SlidersHorizontal: Icon;
  export const Sparkles: Icon;
  export const Star: Icon;
  export const Trash2: Icon;
  export const Truck: Icon;
  export const User: Icon;
  export const X: Icon;
  export const LogOut: Icon;
  export const MoreHorizontal: Icon;
  export const Circle: Icon;
  export const GripVertical: Icon;
  export const PanelLeft: Icon;
  export const ChevronDownIcon: Icon;
  export const ChevronLeftIcon: Icon;
  export const ChevronRightIcon: Icon;
}
