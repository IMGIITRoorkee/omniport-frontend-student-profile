import React from "react";
import { Icon } from "semantic-ui-react";

export const EditIcon = props => {
  return (
    <div>
      {!props.rearrange ? (
        <Icon name="edit" color="grey" onClick={() => props.onClick()} />
      ) : null}
    </div>
  );
};
