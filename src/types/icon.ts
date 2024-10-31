export interface IconProps {
  // 基础属性
  size?: number | string;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  
  // 变换属性
  rotate?: number;
  spin?: boolean;
  flip?: 'horizontal' | 'vertical' | 'both';
  
  // 事件处理
  onClick?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
} 