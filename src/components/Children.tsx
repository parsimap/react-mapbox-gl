import React from "react";
import IChildrenProps from "../interfaces/IChildrenProps";

const Children = ({
  children,
  ...rest
}: React.PropsWithChildren<IChildrenProps>) => (
  <React.Fragment>
    {React.Children.map(children, (child: any) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, { ...rest } as IChildrenProps);
      }

      return null;
    })}
  </React.Fragment>
);

export default Children;
