import React from 'react';

export function ModalBody({children}) {
  return children;
}
export function ModalFooter({children}) {
  return children;
}

export default function CustomModal({active, title, children}) {
  const bodyContent = React.Children.toArray(children).find(child => child.type === ModalBody);
  const footerContent = React.Children.toArray(children).find(child => child.type === ModalFooter);

  return (
    <div className={"modal th-modal show fade"} role={"dialog"} style={{display:active==true ? 'block':'none'}}>
      <div className={"modal-dialog"}>
        <div className={"modal-content"}>
          <div className={"modal-header"}>
            <h4 className={"modal-title"}>{title}</h4>
          </div>
          <div className={"modal-body"}>
            <div className={'form-body'}>
              {bodyContent}
            </div>
          </div>
          <div className={"modal-footer"}>
            {footerContent}
          </div>
        </div>
      </div>
    </div>
  )
}
