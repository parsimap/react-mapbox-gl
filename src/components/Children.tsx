import React from "react";
import IChildrenProps from "../interfaces/IChildrenProps";

const Children = ({
  map,
  queue,
  children,
}: React.PropsWithChildren<IChildrenProps>) => (
  <React.Fragment>
    {React.Children.map(children, (child: any) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          map,
          queue,
        } as IChildrenProps);
      }

      return null;
    })}
  </React.Fragment>
);

export default Children;
