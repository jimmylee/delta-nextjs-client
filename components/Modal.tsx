import * as React from 'react';

import styles from './Modal.module.scss';

// The `onClose` function will pass the provided `id` back to the caller so it
// can be compared to avoid the case of one modal closing causing another one to
// close.
export default function Modal(props: {
  modalID?: any,
  anchor: React.RefObject<any>,
  children: React.ReactNode,
  onClose: (modalID?: any) => void,
}) {
  const fadeSeconds = 0.15;
  
  const ref = React.useRef(null);

  const [modalPos, setModalPos] = React.useState(null);
  const [hidden, setHidden] = React.useState(true);

  function updateModalPos(node) {
    let anchorRect = node.getBoundingClientRect();
    let anchorOffsetParentRect = node.offsetParent.getBoundingClientRect();
    let left = anchorRect.left - anchorOffsetParentRect.left + anchorRect.width;
    let top = anchorRect.top - anchorOffsetParentRect.top + anchorRect.height * 0.5;
    setModalPos({ x: left, y: top });
  }
  
  React.useEffect(() => {    
    function handleClickOutside(event) {
      console.log('handle click');
      
      if (ref.current && !ref.current.contains(event.target)) {
        event.stopPropagation();

        setHidden(true);

        setTimeout(() => {
          props.onClose(props.modalID);
        }, fadeSeconds * 1000);
      }
    }

    updateModalPos(props.anchor.current);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  React.useEffect(() => {
    setTimeout(e => setHidden(false), 10);
  }, []);

  if (modalPos == null) {
    return null;
  }
  
  return (
    <div 
      className={hidden ? styles.bodyHidden : styles.body} 
      style={{
        left: `${modalPos.x}px`,
        top: `${modalPos.y}px`,
      }}
      ref={ref}
    >
      {props.children}
    </div>
  );
}