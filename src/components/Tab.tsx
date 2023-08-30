import { HTMLProps, ReactNode } from "react";

interface BaseTabProps extends HTMLProps<HTMLDivElement> {
  children: ReactNode;
}

interface TabProps extends BaseTabProps {
  clickable: boolean;
  onClick?: () => void;
  active?: boolean;
}

export const Tab = (props: TabProps) => {
    const { children, clickable, active, ...otherProps} = props;

    const tabClasses = `
      inline-block 
      rounded-full px-3 py-1
      text-sm font-semibold text-gray-700
      mr-2 cursor-pointer 
      ${active ? "bg-gray-400" : "bg-gray-200 hover:bg-gray-400"} 
      hover:shadow-md transition duration-300
    `

    if(clickable) return (
      <div className={tabClasses}
          onClick={props.onClick}
           {...otherProps}>
        {
          children
        }
      </div>
    )

    return (
        <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2" {...otherProps}>
          {
            children
          }
        </div>
    );
};
