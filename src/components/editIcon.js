import React from "react";
import { isMobile } from "react-custom-scrollbars";
import { Icon, Popup } from "semantic-ui-react";

export const EditIcon = props => {
  return (
    <div>
      {!props.rearrange ? (
        <Popup
          trigger={
            <Icon name="edit" color="grey" onClick={() => props.onClick()} />
          }
          disabled={isMobile}
          size="tiny"
          content="Edit"
        />
      ) : null}
    </div>
  );
};
